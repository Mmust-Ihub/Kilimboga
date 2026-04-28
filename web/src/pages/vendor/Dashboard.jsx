export const VendorDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    currentMonthOrders: 0,
    previousMonthOrders: 0,
    percentageChange: "0.00",
    bestSellingProducts: [],
    monthlyRevenue: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = JSON.parse(sessionStorage.getItem("token"));
        const res = await db.vendorStats(token);
        if (res.status === "success" || res.status === 200 || res.status === true) {
          setData(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch vendor stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const d = data;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Hero stat + grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 20 }}>
        <StatCard label="Total Revenue (KES)" value={loading ? "" : "62,000"} icon={DollarSign}
          sub="All-time earnings" loading={loading} gradient mono />
        <StatCard label="Pending Orders" value={loading ? "" : d.pendingOrders} icon={Clock}
          sub="Awaiting fulfillment" loading={loading} />
        <StatCard label="Delivered Orders" value={loading ? "" : d.deliveredOrders} icon={CheckCircle}
          sub="Successfully completed" loading={loading} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <StatCard label="This Month's Orders" value={loading ? "" : d.currentMonthOrders} icon={Activity}
          sub={`${d.percentageChange}% vs last month`} loading={loading} />
        <StatCard label="Previous Month" value={loading ? "" : d.previousMonthOrders} icon={BarChart2}
          sub="Comparative baseline" loading={loading} />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20 }}>
        <Card>
          <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700 }}>Monthly Revenue</h3>
          {d.monthlyRevenue.length === 0 ? (
            <EmptyState icon={TrendingUp} title="No revenue data yet" subtitle="Revenue trends will appear once you start receiving orders this month" />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={d.monthlyRevenue}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="totalSales" stroke="#16A34A" fill="url(#revGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card>
          <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700 }}>Best Selling Products</h3>
          {d.bestSellingProducts.length === 0 ? (
            <EmptyState icon={ShoppingBag} title="No sales data yet" subtitle="Your top-performing products will be ranked here as orders come in" />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={d.bestSellingProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="sales" fill="#16A34A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>
    </div>
  );
};