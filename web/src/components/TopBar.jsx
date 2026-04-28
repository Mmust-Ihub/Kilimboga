export const Topbar = ({ collapsed, setCollapsed, pageTitle }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [userOpen, setUserOpen] = useState(false);

  return (
    <header style={{ height:64, background:"var(--surface)", borderBottom:"1px solid var(--border)",
      display:"flex", alignItems:"center", padding:"0 24px", gap:16, position:"sticky", top:0, zIndex:40 }}>
      <button onClick={() => setCollapsed(c=>!c)} className="focus-ring"
        style={{ background:"transparent", border:"1px solid var(--border)", borderRadius:10,
          padding:8, cursor:"pointer", color:"var(--text)", display:"flex" }}>
        {collapsed ? <ChevronRight size={18}/> : <Menu size={18}/>}
      </button>

      <div style={{ flex:1 }}>
        <h1 style={{ margin:0, fontSize:18, fontWeight:800, color:"var(--text)", letterSpacing:"-0.02em" }}>{pageTitle}</h1>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        {/* Theme toggle */}
        <button onClick={toggleTheme} className="focus-ring"
          style={{ position:"relative", width:56, height:28, borderRadius:99,
            background: theme==="dark" ? "linear-gradient(135deg,#16A34A,#4ADE80)" : "rgba(22,163,74,0.12)",
            border:"1px solid var(--border)", cursor:"pointer", transition:"all 0.3s", padding:0 }}>
          <div style={{ position:"absolute", top:3, left: theme==="dark" ? 29 : 3, width:20, height:20, borderRadius:999,
            background: theme==="dark" ? "#052E16" : "#16A34A", transition:"left 0.3s",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            {theme==="dark" ? <Moon size={11} color="#4ADE80"/> : <Sun size={11} color="#fff"/>}
          </div>
        </button>

        {/* Bell */}
        <button className="focus-ring" style={{ background:"transparent", border:"1px solid var(--border)",
          borderRadius:10, padding:8, cursor:"pointer", color:"var(--muted)", position:"relative" }}>
          <Bell size={18}/>
          <div style={{ position:"absolute", top:6, right:6, width:7, height:7, borderRadius:99,
            background:"var(--accent)", border:"2px solid var(--surface)" }} className="pulse-dot"/>
        </button>

        {/* User */}
        <div style={{ position:"relative" }}>
          <button onClick={()=>setUserOpen(o=>!o)} className="focus-ring"
            style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(22,163,74,0.08)",
              border:"1px solid var(--border)", borderRadius:10, padding:"6px 12px", cursor:"pointer" }}>
            <div style={{ width:26, height:26, borderRadius:8, background:"linear-gradient(135deg,#16A34A,#84CC16)",
              display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:11 }}>
              {user?.initials}
            </div>
            <span style={{ fontSize:13, fontWeight:600, color:"var(--text)" }}>{user?.name?.split(" ")[0]}</span>
            <ChevronDown size={14} style={{ color:"var(--muted)" }}/>
          </button>
          {userOpen && (
            <div onClick={()=>setUserOpen(false)} style={{ position:"fixed", inset:0, zIndex:100 }}>
              <div onClick={e=>e.stopPropagation()} style={{ position:"absolute", top:48, right:0, background:"var(--surface)",
                border:"1px solid var(--border)", borderRadius:12, width:180, boxShadow:"0 12px 40px rgba(0,0,0,0.15)", padding:8 }}>
                <button onClick={logout} style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"10px 12px",
                  background:"transparent", border:"none", cursor:"pointer", color:"var(--danger)",
                  borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:14 }}>
                  <LogOut size={15}/> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};