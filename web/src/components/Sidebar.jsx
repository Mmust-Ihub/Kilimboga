export const Sidebar = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();
  const { route } = useNav();
  const { navigate } = useNav();
  const nav = user?.role === "admin" ? ADMIN_NAV : VENDOR_NAV;
  const w = collapsed ? 68 : 260;

  return (
    <aside style={{ width:w, minHeight:"100vh", background:"var(--surface)", borderRight:"1px solid var(--border)",
      display:"flex", flexDirection:"column", transition:"width 0.28s cubic-bezier(0.4,0,0.2,1)",
      position:"relative", overflow:"hidden", flexShrink:0, zIndex:50 }}>
      {/* Decorative blobs */}
      <div className="blob" style={{ width:120, height:120, background:"#16A34A", top:-20, left:-20 }}/>
      <div className="blob" style={{ width:80, height:80, background:"#84CC16", top:60, right:-30 }}/>

      {/* Header */}
      <div style={{ padding: collapsed ? "20px 16px" : "24px 20px", borderBottom:"1px solid var(--border)", position:"relative" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#16A34A,#84CC16)",
            display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"var(--shadow-btn)" }}>
            <Leaf size={18} color="#fff"/>
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontWeight:800, fontSize:17, color:"var(--text)", letterSpacing:"-0.03em" }}>FarmLink</div>
              <div style={{ fontSize:10, color:"var(--muted)", fontWeight:500, letterSpacing:"0.04em", textTransform:"uppercase" }}>
                {user?.role === "admin" ? "Admin Portal" : "Vendor Portal"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:"16px 10px", display:"flex", flexDirection:"column", gap:4 }}>
        {!collapsed && (
          <div style={{ fontSize:11, fontWeight:700, color:"var(--muted)", letterSpacing:"0.08em", textTransform:"uppercase", padding:"4px 10px 10px" }}>
            Navigation
          </div>
        )}
        {nav.map(item => {
          const active = route === item.route;
          return (
            <button key={item.route} onClick={() => navigate(item.route)}
              className={`sidebar-item ${active?"active":""}`}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding: collapsed ? "12px 16px" : "11px 14px",
                borderRadius:12, border:"none", cursor:"pointer", background:"transparent",
                color: active ? "var(--primary)" : "var(--text)", fontFamily:"'DM Sans',sans-serif",
                fontWeight: active ? 700 : 500, fontSize:14, textAlign:"left",
                justifyContent: collapsed ? "center" : "flex-start" }}>
              <item.icon size={18} style={{ flexShrink:0, color: active ? "var(--primary)" : "var(--muted)" }}/>
              {!collapsed && item.label}
              {!collapsed && active && <div style={{ marginLeft:"auto", width:6, height:6, borderRadius:999, background:"var(--primary)" }}/>}
            </button>
          );
        })}
      </nav>

      {/* Role chip */}
      {!collapsed && (
        <div style={{ margin:"0 10px 8px", padding:"10px 14px", background:"rgba(22,163,74,0.08)",
          borderRadius:10, border:"1px solid var(--border)" }}>
          <div style={{ fontSize:11, color:"var(--muted)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>Role</div>
          <Badge variant={user?.role==="admin"?"info":"lime"}>{user?.role === "admin" ? "Administrator" : "Vendor"}</Badge>
        </div>
      )}

      {/* User card */}
      <div style={{ padding:"12px 10px", borderTop:"1px solid var(--border)" }}>
        {!collapsed ? (
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px",
            borderRadius:12, background:"rgba(22,163,74,0.06)" }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#16A34A,#84CC16)",
              display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:13, flexShrink:0 }}>
              {user?.initials}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight:700, color:"var(--text)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{user?.name}</div>
              <div style={{ fontSize:11, color:"var(--muted)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{user?.email}</div>
            </div>
            <button onClick={logout} style={{ background:"transparent", border:"none", cursor:"pointer", color:"var(--muted)", padding:4 }}>
              <LogOut size={16}/>
            </button>
          </div>
        ) : (
          <button onClick={logout} style={{ width:"100%", display:"flex", justifyContent:"center", padding:12,
            background:"transparent", border:"none", cursor:"pointer", color:"var(--muted)" }}>
            <LogOut size={18}/>
          </button>
        )}
      </div>
    </aside>
  );
};