import React, { useState, useEffect } from 'react';
import { Card, Skeleton, EmptyState } from '../components/ui';
import { TrendingUp, ShoppingBag, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Clock, CheckCircle, BarChart2 } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const StatCard = ({ label, value, icon: Icon, sub, trend, loading, gradient, mono, className }) => (
  <Card style={{ minHeight: 120 }} gradient={gradient} className={className}>
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

import Database from '../js/db.js';

const db = new Database();

const VendorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [d, setD] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenStr = sessionStorage.getItem("token");
        const token = tokenStr ? JSON.parse(tokenStr) : null;
        if (token) {
          const res = await db.vendorStats(token);
          if (res.status && res.data) {
            setD(res.data);
          }
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className='flex flex-col gap-6 w-full'>
      {/* Hero stat + grid */}
      <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
        <StatCard className='md:col-span-1' label="Total Revenue (KES)" value={loading ? "" : d?.totalRevenue.toLocaleString()} icon={DollarSign}
          sub="All-time earnings" loading={loading} gradient mono />
        <StatCard label="Pending Orders" value={loading ? "" : d?.pendingOrders} icon={Clock}
          sub="Awaiting fulfillment" loading={loading} />
        <StatCard label="Delivered Orders" value={loading ? "" : d?.deliveredOrders} icon={CheckCircle}
          sub="Successfully completed" loading={loading} />
        <StatCard label="This Month's Orders" value={loading ? "" : d.currentMonthOrders} icon={Activity}
          sub={`${d?.percentageChange}% vs last month`} loading={loading} />
        <StatCard label="Previous Month" value={loading ? "" : d.previousMonthOrders} icon={BarChart2}
          sub="Comparative baseline" loading={loading} />
      </div>

      {/* Charts row */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card>
          <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700 }}>Monthly Revenue</h3>
          {d?.monthlyRevenue.length === 0 ? (
            <EmptyState icon={TrendingUp} title="No revenue data yet" subtitle="Revenue trends will appear once you start receiving orders this month" />
          ) : (
            <ResponsiveContainer width="100%" height={420}>
              <AreaChart data={d?.monthlyRevenue}>
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
          {d?.bestSellingProducts.length === 0 ? (
            <EmptyState icon={ShoppingBag} title="No sales data yet" subtitle="Your top performing products will be ranked here as orders come in" />
          ) : (
            <ResponsiveContainer width="100%" height={420}>
              <BarChart data={d?.bestSellingProducts}>
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

export default VendorDashboard;
