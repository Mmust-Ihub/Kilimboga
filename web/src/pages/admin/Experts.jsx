export const AdminExperts = () => {
  const [experts, setExperts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [delInProgress, setDelInProgress] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const toast = useToast();

  const fetchExperts = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const res = await db.getAdminUsers(token, "expert", true);
      if (res.status) {
        setExperts(res.users || []);
      }
    } catch (err) {
      toast("Failed to fetch experts", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchExperts(); }, []);

  const filtered = experts.filter(x => {
    const status = x.status || (x.isVerified ? "Active" : "Inactive");
    return (filter === "All" || status === filter) &&
      `${x.firstName} ${x.lastName} ${x.email} ${x.specialization || ""}`.toLowerCase().includes(search.toLowerCase());
  });

  const SPEC_BADGE = { "Crop Science": "success", "Soil Science": "lime", "Pest Management": "warning", "Irrigation": "info", "General Agronomy": "default" };

  const updateStatus = async (id, status) => {
    setActionLoading(true);
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const action = status === "Active" ? "approve" : "reject";
      const res = await db.manageUser(token, id, action);
      if (res.status) {
        toast(`Expert status updated`, "success");
        fetchExperts();
      } else {
        toast(res.message, "error");
      }
    } catch (err) {
      toast("Action failed", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const deleteExpert = async (id) => {
    setActionLoading(true);
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const res = await db.manageUser(token, id, "deactivate");
      if (res.status) {
        toast("Expert deactivated", "success");
        fetchExperts();
      } else {
        toast(res.message, "error");
      }
    } catch (err) {
      toast("Deactivation failed", "error");
    } finally {
      setActionLoading(false);
      setDelInProgress(null);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Search and Filters */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search experts..."
            style={{
              width: "100%", paddingLeft: 36, paddingRight: 14, paddingTop: 10, paddingBottom: 10,
              background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 14, color: "var(--text)",
              outline: "none", fontFamily: "'DM Sans',sans-serif", boxSizing: "border-box"
            }} />
        </div>
        {["All", "Active", "Inactive"].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{
              padding: "10px 16px", borderRadius: 10, border: `1px solid ${filter === s ? "var(--primary)" : "var(--border)"}`,
              background: filter === s ? "rgba(22,163,74,0.1)" : "var(--surface)", color: filter === s ? "var(--primary)" : "var(--muted)",
              cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans',sans-serif"
            }}>
            {s}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
        {loading ? [...Array(4)].map((_, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
            <Skeleton h={48} w={48} r={12} style={{ marginBottom: 12 }} /><Skeleton w="70%" h={14} style={{ marginBottom: 8 }} /><Skeleton w="50%" h={12} />
          </div>
        )) : filtered.length === 0 ? (
          <div style={{ gridColumn: "1/-1" }}><Card><EmptyState icon={GraduationCap} title="No experts found" subtitle="Agricultural experts will appear here" /></Card></div>
        ) : filtered.map(e => (
          <Card key={e._id || e.id} style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#16A34A,#84CC16)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15, flexShrink: 0
              }}>
                {(e.firstName || "E")[0]}{(e.lastName || "X")[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{e.firstName} {e.lastName}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{e.email}</div>
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                {!e.isVerified && (
                  <button onClick={() => updateStatus(e._id || e.id, "Active")}
                    style={{ background: "rgba(22,163,74,0.1)", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--primary)" }} disabled={actionLoading}><CheckCircle size={13} /></button>
                )}
                <button onClick={() => setDelInProgress(e)}
                  style={{ background: "rgba(220,38,38,0.1)", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--danger)" }} disabled={actionLoading}><Trash2 size={13} /></button>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
              <Badge variant={SPEC_BADGE[e.specialization] || "default"}>{e.specialization || "General Agronomy"}</Badge>
              <StatusBadge status={e.status || (e.isVerified ? "Active" : "Inactive")} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)" }}>
              <Award size={14} style={{ color: "var(--primary)" }} />
              <span className="font-mono" style={{ color: "var(--primary)", fontWeight: 600 }}>{e.experience || 0}</span>
              <span>years of experience</span>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={!!delInProgress} onClose={() => setDelInProgress(null)} title="Deactivate Expert" width={400}>
        {delInProgress && <>
          <p style={{ marginTop: 0, color: "var(--muted)" }}>Deactivate expert <strong>{delInProgress.firstName} {delInProgress.lastName}</strong>? This user will no longer be able to log in.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setDelInProgress(null)}>Cancel</Btn>
            <Btn variant="danger" onClick={() => deleteExpert(delInProgress._id || delInProgress.id)} disabled={actionLoading}>Deactivate</Btn>
          </div>
        </>}
      </Modal>
    </div>
  );
};