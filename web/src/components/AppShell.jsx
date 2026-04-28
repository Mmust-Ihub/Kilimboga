export const AppShell = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { route } = useNav();
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar collapsed={collapsed} setCollapsed={setCollapsed} pageTitle={PAGE_TITLES[route] || "Kilimboga"} />
        <main style={{ flex: 1, padding: 28, overflow: "auto" }}>
          <div className="page-enter">{children}</div>
        </main>
      </div>
    </div>
  );
};