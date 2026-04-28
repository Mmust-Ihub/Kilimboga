import React, { useState, useEffect } from 'react';
import { Card, Skeleton, EmptyState } from '../components/ui';
import { Users, UserCheck, ShoppingCart, DollarSign, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MONTH_NAMES } from '../data/mockData';

const PIE_COLORS = { admin: "#16A34A", expert: "#84CC16", vendor: "#15803D", farmer: "#4ADE80" };

import Database from '../js/db.js';

const db = new Database();

const StatCard = ({ label, value, icon: Icon, sub, trend, loading, gradient, mono }) => (
  <Card style={{ minHeight: 120 }} gradient={gradient}>
    {loading ? (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Skeleton w={60} h={12} /><Skeleton w={80} h={28} /><Skeleton w={100} h={12} />
      </div>
    ) : (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: gradient ? "rgba(255,255,255,0.75)" : "var(--muted)", letterSpacing: "0.01em" }}>{label}</span>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: gradient ? "rgba(255,255,255,0.15)" : "rgba(22,163,74,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Icon size={16} style={{ color: gradient ? "#fff" : "var(--primary)" }} />
          </div>
        </div>
        <div className={`count-up ${mono ? "font-mono" : ""}`}
          style={{ fontSize: 28, fontWeight: 800, color: gradient ? "#fff" : "var(--text)", letterSpacing: "-0.03em", lineHeight: 1 }}>
          {value}
        </div>
        {sub && <div style={{ fontSize: 12, color: gradient ? "rgba(255,255,255,0.65)" : "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}>
          {trend && (trend > 0 ? <ArrowUpRight size={12} style={{ color: "#4ADE80" }} /> : <ArrowDownRight size={12} style={{ color: "#F87171" }} />)}
          {sub}
        </div>}
      </div>
    )}
  </Card>
);

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const tokenStr = sessionStorage.getItem("token");
    if (tokenStr) {
      const res = await db.getAdminStats(JSON.parse(tokenStr));
      if (res.status) {
        setData(res.data);
      }
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const ud = data?.userData?.[0] || {};
  const od = data?.orderData?.[0] || {};
  const sd = data?.salesData?.[0] || {};

  const roleData = ud.roleDistribution?.map(r => ({ name: r._id, value: r.count, color: PIE_COLORS[r._id] || "#6B7280" })) || [];
  const growthData = ud.userGrowth?.map(g => ({ month: MONTH_NAMES[g._id - 1] || `M${g._id}`, users: g.count })) || [];
  const orderMonthly = od.monthlyOrders?.map(o => ({ month: MONTH_NAMES[o._id - 1] || `M${o._id}`, orders: o.count, revenue: o.revenue })) || [];

  const stats = [
    { label: "Total Users", value: ud.totalUsers?.[0]?.count || 0, icon: Users, sub: "Registered accounts" },
    { label: "Verified Users", value: ud.verifiedUsers?.[0]?.count || 0, icon: UserCheck, sub: "Email verified" },
    { label: "Total Orders", value: od.totalOrders?.[0]?.count || 0, icon: ShoppingCart, sub: "All-time orders" },
    { label: "Total Revenue", value: "KES " + ((sd.totalRevenue?.[0]?.totalSales || 0)).toLocaleString(), icon: DollarSign, sub: "Platform revenue" },
    { label: "Pending Orders", value: od.pendingOrders?.[0]?.count || 0, icon: Clock, sub: "Awaiting processing" },
    { label: "Delivered", value: od.deliveredOrders?.[0]?.count || 0, icon: CheckCircle, sub: "Fulfilled orders" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Stats grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {stats.map((s, i) => (
          <StatCard key={i} label={s.label} value={loading ? "" : s.value} icon={s.icon} sub={s.sub} loading={loading} gradient={i === 0} mono={i === 3} />
        ))}
      </div>

      {/* Charts */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
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
      {(ud.pendingApprovals?.length || 0) === 0 && (
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

export default AdminDashboard;
