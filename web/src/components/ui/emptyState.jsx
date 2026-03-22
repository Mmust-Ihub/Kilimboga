export const EmptyState = ({ icon: Icon, title, subtitle }) => (
  <div style={{ textAlign:"center", padding:"60px 20px", display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
    <div style={{ width:72, height:72, borderRadius:20, background:"rgba(22,163,74,0.1)", display:"flex", alignItems:"center", justifyContent:"center", border:"2px dashed rgba(22,163,74,0.25)" }}>
      <Icon size={32} style={{ color:"var(--primary)", opacity:0.7 }}/>
    </div>
    <div>
      <p style={{ margin:0, fontWeight:700, fontSize:17, color:"var(--text)" }}>{title}</p>
      <p style={{ margin:"6px 0 0", fontSize:14, color:"var(--muted)", maxWidth:280 }}>{subtitle}</p>
    </div>
  </div>
);