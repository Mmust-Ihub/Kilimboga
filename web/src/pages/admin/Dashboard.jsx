export const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const token = JSON.parse(sessionStorage.getItem("token"));
        const res = await db.getAdminStats(token);
        if (res.status === "success" || res.status === 200 || res.status === true) {
          setData(res.data);
        }
      } catch (err) {
        toast("Failed to fetch admin stats", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchAdminStats();
  }, []);

  if (loading && !data) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
        {[...Array(6)].map((_, i) => <Skeleton key={i} h={100} r={16} />)}
      </div>
    );
  }

  const ud = data?.userData[0] || ADMIN_DASH.userData[0];
  const od = data?.orderData[0] || ADMIN_DASH.orderData[0];
  const sd = data?.salesData[0] || ADMIN_DASH.salesData[0];

  const roleData = ud.roleDistribution.map(r => ({ name: r._id, value: r.count, color: PIE_COLORS[r._id] || "#6B7280" }));
  const growthData = ud.userGrowth.map(g => ({ month: MONTH_NAMES[g._id - 1] || `M${g._id}`, users: g.count }));
  const orderMonthly = od.monthlyOrders.map(o => ({ month: MONTH_NAMES[o._id - 1] || `M${o._id}`, orders: o.count, revenue: o.revenue }));

  const stats = [
    { label: "Total Users", value: ud.totalUsers[0]?.count || 0, icon: Users, sub: "Registered accounts" },
    { label: "Verified Users", value: ud.verifiedUsers[0]?.count || 0, icon: UserCheck, sub: "Email verified" },
    { label: "Total Orders", value: od.totalOrders[0]?.count || 0, icon: ShoppingCart, sub: "All-time orders" },
    { label: "Total Revenue", value: "KES " + ((sd.totalRevenue[0]?.totalSales || 0) * 1000).toLocaleString(), icon: DollarSign, sub: "Platform revenue" },
    { label: "Pending Orders", value: od.pendingOrders[0]?.count || 0, icon: Clock, sub: "Awaiting processing" },
    { label: "Delivered", value: od.deliveredOrders[0]?.count || 0, icon: CheckCircle, sub: "Fulfilled orders" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
        {stats.map((s, i) => (
          <StatCard key={i} label={s.label} value={loading ? "" : s.value} icon={s.icon} sub={s.sub} loading={loading} gradient={i === 0} mono={i === 3} />
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {/* Role distribution */}
        <Card>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>User Role Distribution</h3>
          {loading ? <Skeleton h={180} /> : (
            <>
              <ResponsiveContainer width="100%" height={170}>
                <PieChart>
                  <Pie data={roleData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                    {roleData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v, n) => [v, n.charAt(0).toUpperCase() + n.slice(1)]} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {roleData.map(r => (
                  <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 99, background: r.color }} />
                    <span style={{ textTransform: "capitalize", color: "var(--muted)" }}>{r.name}: {r.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>

        {/* User growth */}
        <Card>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>User Growth</h3>
          {loading ? <Skeleton h={200} /> : growthData.length === 0 ? (
            <EmptyState icon={TrendingUp} title="No growth data" subtitle="User registration trends will appear here" />
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="users" fill="#16A34A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Orders */}
        <Card>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Monthly Orders</h3>
          {loading ? <Skeleton h={200} /> : orderMonthly.length === 0 ? (
            <EmptyState icon={ShoppingCart} title="No order data" subtitle="Monthly order trends will appear here" />
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={orderMonthly}>
                <defs>
                  <linearGradient id="oGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#84CC16" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#84CC16" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="orders" stroke="#84CC16" fill="url(#oGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      {/* Pending approvals notice */}
      {ud.pendingApprovals.length === 0 && (
        <Card style={{ background: "linear-gradient(135deg,rgba(22,163,74,0.08),rgba(132,204,22,0.04))", border: "1px solid rgba(22,163,74,0.2)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(22,163,74,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckCircle size={20} style={{ color: "var(--primary)" }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>All Clear — No Pending Approvals</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>All vendor and user approvals are up to date.</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};