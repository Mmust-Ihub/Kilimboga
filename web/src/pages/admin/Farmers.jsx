export const AdminFarmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [delInProgress, setDelInProgress] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const toast = useToast();

  const fetchFarmers = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const res = await db.getAdminUsers(token, "farmer", true);
      if (res.status) {
        setFarmers(res.users || []);
      }
    } catch (err) {
      toast("Failed to fetch farmers", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFarmers(); }, []);

  const filtered = farmers.filter(x => {
    const status = x.status || (x.isVerified ? "Active" : "Inactive");
    return (filter === "All" || status === filter) &&
      `${x.firstName} ${x.lastName} ${x.email}`.toLowerCase().includes(search.toLowerCase());
  });

  const updateStatus = async (id, status) => {
    setActionLoading(true);
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const action = status === "Active" ? "approve" : "reject";
      const res = await db.manageUser(token, id, action);
      if (res.status) {
        toast(`Farmer status updated`, "success");
        fetchFarmers();
      } else {
        toast(res.message, "error");
      }
    } catch (err) {
      toast("Action failed", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const deleteFarmer = async (id) => {
    setActionLoading(true);
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const res = await db.manageUser(token, id, "deactivate");
      if (res.status) {
        toast("Farmer deactivated", "success");
        fetchFarmers();
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
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search farmers..."
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

      <Card style={{ padding: 0, overflow: "hidden" }}>
        {loading ? <div style={{ padding: 24 }}>{[...Array(4)].map((_, i) => <Skeleton key={i} h={52} r={10} style={{ marginBottom: 10 }} />)}</div> :
          filtered.length === 0 ? <EmptyState icon={Sprout} title="No farmers found" subtitle="Registered farmers will appear here" /> : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(22,163,74,0.04)" }}>
                    {["Name", "Email", "Phone", "Status", "Joined", "Actions"].map(h => (
                      <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((v, i) => (
                    <tr key={v._id || v.id} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "rgba(22,163,74,0.02)" }}>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#15803D,#16A34A)",
                            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 11, flexShrink: 0
                          }}>
                            {(v.firstName || "F")[0]}{(v.lastName || "X")[0]}
                          </div>
                          <span style={{ fontWeight: 600, fontSize: 14 }}>{v.firstName} {v.lastName}</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--muted)" }}>{v.email}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, fontFamily: "'DM Mono',monospace" }}>{v.phoneNumber || v.phone}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <StatusBadge status={v.status || (v.isVerified ? "Active" : "Inactive")} />
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--muted)" }}>
                        {v.createdAt ? new Date(v.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          {!v.isVerified && (
                            <button onClick={() => updateStatus(v._id || v.id, "Active")}
                              style={{ background: "rgba(22,163,74,0.1)", border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", color: "var(--primary)", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }} disabled={actionLoading}>
                              Approve
                            </button>
                          )}
                          <button onClick={() => setDelInProgress(v)}
                            style={{ background: "rgba(220,38,38,0.1)", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--danger)" }} disabled={actionLoading}><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </Card>

      <Modal open={!!delInProgress} onClose={() => setDelInProgress(null)} title="Deactivate Farmer" width={400}>
        {delInProgress && <>
          <p style={{ marginTop: 0, color: "var(--muted)" }}>Deactivate <strong>{delInProgress.firstName} {delInProgress.lastName}</strong>? This user will no longer be able to log in.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setDelInProgress(null)}>Cancel</Btn>
            <Btn variant="danger" onClick={() => deleteFarmer(delInProgress._id || delInProgress.id)} disabled={actionLoading}>Deactivate</Btn>
          </div>
        </>}
      </Modal>
    </div>
  );
};