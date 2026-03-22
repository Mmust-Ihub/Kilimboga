const StatusBadge = ({ status }) => {
  const s = status?.toLowerCase() || "";
  const config = {
    pending: { bg: "rgba(217,119,6,0.1)", color: "#D97706" },
    delivered: { bg: "rgba(22,163,74,0.1)", color: "#16A34A" },
    completed: { bg: "rgba(22,163,74,0.1)", color: "#16A34A" },
    shipped: { bg: "rgba(2,132,199,0.1)", color: "#0284C7" },
    failed: { bg: "rgba(220,38,38,0.1)", color: "#DC2626" },
  };
  const theme = config[s] || { bg: "rgba(107,114,128,0.1)", color: "#6B7280" };
  return (
    <span style={{
      padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
      background: theme.bg, color: theme.color, textTransform: "uppercase", letterSpacing: "0.02em"
    }}>
      {status}
    </span>
  );
};

export const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const res = await db.getOrders(token, filter !== "all" ? filter : undefined);
      if (res.status === "success" || res.status === 200 || res.status === true) {
        setOrders(res.data || []);
      }
    } catch (err) {
      toast("Failed to fetch orders", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, [filter]);

  const filtered = orders.filter(o =>
    (o._id || o.id || "").toLowerCase().includes(search.toLowerCase()) ||
    (o.orderAddress || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by ID or address..."
            style={{
              width: "100%", paddingLeft: 36, paddingRight: 14, paddingTop: 10, paddingBottom: 10,
              background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 14, color: "var(--text)",
              outline: "none", fontFamily: "'DM Sans',sans-serif", boxSizing: "border-box"
            }} />
        </div>
        {["all", "pending", "delivered", "completed"].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{
              padding: "10px 16px", borderRadius: 10, border: `1px solid ${filter === s ? "var(--primary)" : "var(--border)"}`,
              background: filter === s ? "rgba(22,163,74,0.1)" : "var(--surface)", color: filter === s ? "var(--primary)" : "var(--muted)",
              cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", textTransform: "capitalize"
            }}>
            {s}
          </button>
        ))}
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            {[...Array(4)].map((_, i) => <Skeleton key={i} h={52} r={10} />)}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={ShoppingCart} title="No orders found" subtitle="Orders matching your filter will appear here" />
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(22,163,74,0.04)" }}>
                  {["Order ID", "Products", "Amount", "Payment", "Delivery", "Address", "Action"].map(h => (
                    <th key={h} style={{
                      padding: "14px 16px", textAlign: "left", fontSize: 12, fontWeight: 700,
                      color: "var(--muted)", letterSpacing: "0.05em", whiteSpace: "nowrap"
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, i) => (
                  <tr key={o.id} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "rgba(22,163,74,0.02)" }}>
                    <td style={{ padding: "14px 16px", fontSize: 13, fontFamily: "'DM Mono',monospace", fontWeight: 500 }}>{o.id}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13 }}>{o.products.map(p => p.product.title).join(", ").slice(0, 30)}...</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, fontFamily: "'DM Mono',monospace", color: "var(--primary)", fontWeight: 600 }}>
                      KES {o.totalAmount.toLocaleString()}
                    </td>
                    <td style={{ padding: "14px 16px" }}><StatusBadge status={o.paymentStatus} /></td>
                    <td style={{ padding: "14px 16px" }}><StatusBadge status={o.deliveryStatus} /></td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--muted)" }}>{o.orderAddress}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <button onClick={() => setDetail(o)} style={{
                        background: "rgba(22,163,74,0.1)", border: "none",
                        borderRadius: 8, padding: "6px 12px", cursor: "pointer", color: "var(--primary)", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans',sans-serif"
                      }}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Detail modal */}
      <Modal open={!!detail} onClose={() => setDetail(null)} title={`Order ${detail?.id}`} width={580}>
        {detail && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ padding: "12px 14px", background: "var(--bg)", borderRadius: 10, border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, marginBottom: 4 }}>PAYMENT STATUS</div>
                <StatusBadge status={detail.paymentStatus} />
              </div>
              <div style={{ padding: "12px 14px", background: "var(--bg)", borderRadius: 10, border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, marginBottom: 4 }}>DELIVERY STATUS</div>
                <StatusBadge status={detail.deliveryStatus} />
              </div>
            </div>

            <div style={{ background: "var(--bg)", borderRadius: 10, border: "1px solid var(--border)", padding: "14px 16px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", marginBottom: 12, letterSpacing: "0.05em" }}>ORDER DETAILS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--muted)" }}>Checkout Request ID</span>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11 }}>{detail.checkoutRequestId}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--muted)" }}>Payment Method</span>
                  <Badge variant="lime">{detail.paymentMethod.toUpperCase()}</Badge>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--muted)" }}>Delivery Address</span>
                  <span style={{ fontWeight: 600 }}>{detail.orderAddress}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--muted)" }}>Farmer Phone</span>
                  <span style={{ fontFamily: "'DM Mono',monospace" }}>{detail.farmerPhoneNumber}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--muted)" }}>Order Date</span>
                  <span>{detail.createdAt}</span>
                </div>
              </div>
            </div>

            <div style={{ background: "var(--bg)", borderRadius: 10, border: "1px solid var(--border)", padding: "14px 16px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", marginBottom: 12, letterSpacing: "0.05em" }}>PRODUCTS</div>
              {detail.products.map((item, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 0", borderBottom: i < detail.products.length - 1 ? "1px solid var(--border)" : "none"
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.product.title}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>Qty: {item.quantity}</div>
                  </div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontWeight: 600, color: "var(--primary)" }}>
                    KES {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "2px solid var(--border)", marginTop: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>Total Amount</span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontWeight: 800, fontSize: 18, color: "var(--primary)" }}>
                  KES {detail.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};