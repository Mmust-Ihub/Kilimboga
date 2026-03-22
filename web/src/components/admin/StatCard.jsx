export const StatCard = ({ label, value, icon: Icon, sub, trend, loading, gradient, mono }) => (
  <Card style={{ minHeight:120 }} gradient={gradient}>
    {loading ? (
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        <Skeleton w={60} h={12}/><Skeleton w={80} h={28}/><Skeleton w={100} h={12}/>
      </div>
    ) : (
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontSize:13, fontWeight:600, color: gradient ? "rgba(255,255,255,0.75)" : "var(--muted)", letterSpacing:"0.01em" }}>{label}</span>
          <div style={{ width:36, height:36, borderRadius:10, background: gradient ? "rgba(255,255,255,0.15)" : "rgba(22,163,74,0.1)",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Icon size={16} style={{ color: gradient ? "#fff" : "var(--primary)" }}/>
          </div>
        </div>
        <div className={`count-up ${mono?"font-mono":""}`}
          style={{ fontSize:28, fontWeight:800, color: gradient ? "#fff" : "var(--text)", letterSpacing:"-0.03em", lineHeight:1 }}>
          {value}
        </div>
        {sub && <div style={{ fontSize:12, color: gradient ? "rgba(255,255,255,0.65)" : "var(--muted)", display:"flex", alignItems:"center", gap:4 }}>
          {trend && (trend > 0 ? <ArrowUpRight size={12} style={{ color:"#4ADE80" }}/> : <ArrowDownRight size={12} style={{ color:"#F87171" }}/>)}
          {sub}
        </div>}
      </div>
    )}
  </Card>
);