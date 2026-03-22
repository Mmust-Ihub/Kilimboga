import React, { useState } from 'react';
import { Menu, ChevronRight, Moon, Sun, Bell, ChevronDown, LogOut, Leaf, LayoutDashboard, Package, ShoppingCart, Briefcase, Sprout, GraduationCap } from 'lucide-react';
import { useAuth, useTheme, useNav } from '../context';
import { Badge } from '../components/ui';

const VENDOR_NAV = [
  { label: "Dashboard", icon: LayoutDashboard, route: "/vendor/dashboard" },
  { label: "Products", icon: Package, route: "/vendor/products" },
  { label: "Orders", icon: ShoppingCart, route: "/vendor/orders" },
];
const ADMIN_NAV = [
  { label: "Dashboard", icon: LayoutDashboard, route: "/admin/dashboard" },
  { label: "Vendors", icon: Briefcase, route: "/admin/vendors" },
  { label: "Farmers", icon: Sprout, route: "/admin/farmers" },
  { label: "Experts", icon: GraduationCap, route: "/admin/experts" },
];

const Sidebar = ({ collapsed, setCollapsed, isMobile }) => {
  const { user, logout } = useAuth();
  const { route, navigate } = useNav();
  const nav = user?.role === "admin" ? ADMIN_NAV : VENDOR_NAV;
  const w = isMobile ? 260 : (collapsed ? 68 : 260);

  return (
    <aside style={{
      width: w, height: isMobile ? "calc(100vh - 64px)" : "100vh",
      position: isMobile ? "fixed" : "sticky", top: isMobile ? 64 : 0,
      left: isMobile ? (collapsed ? -w : 0) : 0,
      background: "var(--surface)", borderRight: "1px solid var(--border)",
      display: "flex", flexDirection: "column", transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
      overflow: "hidden", flexShrink: 0, zIndex: 50,
      boxShadow: isMobile && !collapsed ? "20px 0 50px rgba(0,0,0,0.1)" : "none"
    }}>
      {/* Decorative blobs */}
      <div className="blob" style={{ width: 120, height: 120, background: "#16A34A", top: -20, left: -20 }} />
      <div className="blob" style={{ width: 80, height: 80, background: "#84CC16", top: 60, right: -30 }} />

      {/* Header */}
      <div style={{ padding: collapsed ? "20px 16px" : "24px 20px", borderBottom: "1px solid var(--border)", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#16A34A,#84CC16)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "var(--shadow-btn)"
          }}>
            <Leaf size={18} color="#fff" />
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)", letterSpacing: "-0.03em" }}>Kilimboga</div>
              <div style={{ fontSize: 10, color: "var(--muted)", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                {user?.role === "admin" ? "Admin Portal" : "Vendor Portal"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
        {!collapsed && (
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px 10px" }}>
            Navigation
          </div>
        )}
        {nav.map(item => {
          const active = route === item.route;
          return (
            <button key={item.route} onClick={() => { navigate(item.route); if (isMobile) setCollapsed(true); }}
              className={`sidebar-item ${active ? "active" : ""}`}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12, padding: (collapsed && !isMobile) ? "12px 16px" : "11px 14px",
                borderRadius: 12, border: "none", cursor: "pointer", background: "transparent",
                color: active ? "var(--primary)" : "var(--text)", fontFamily: "'DM Sans',sans-serif",
                fontWeight: active ? 700 : 500, fontSize: 14, textAlign: "left",
                justifyContent: (collapsed && !isMobile) ? "center" : "flex-start"
              }}>
              <item.icon size={18} style={{ flexShrink: 0, color: active ? "var(--primary)" : "var(--muted)" }} />
              {(!collapsed || isMobile) && item.label}
              {(!collapsed || isMobile) && active && <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: 999, background: "var(--primary)" }} />}
            </button>
          );
        })}
      </nav>

      {/* Role chip */}
      {!collapsed && (
        <div style={{
          margin: "0 10px 8px", padding: "10px 14px", background: "rgba(22,163,74,0.08)",
          borderRadius: 10, border: "1px solid var(--border)"
        }}>
          <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Role</div>
          <Badge variant={user?.role === "admin" ? "info" : "lime"}>{user?.role === "admin" ? "Administrator" : "Vendor"}</Badge>
        </div>
      )}

      {/* User card */}
      <div style={{ padding: "12px 10px", borderTop: "1px solid var(--border)" }}>
        {!collapsed ? (
          <div style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
            borderRadius: 12, background: "rgba(22,163,74,0.06)"
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#16A34A,#84CC16)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0
            }}>
              {user?.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.name}</div>
              <div style={{ fontSize: 11, color: "var(--muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.email}</div>
            </div>
            <button onClick={logout} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--muted)", padding: 4 }}>
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button onClick={logout} style={{
            width: "100%", display: "flex", justifyContent: "center", padding: 12,
            background: "transparent", border: "none", cursor: "pointer", color: "var(--muted)"
          }}>
            <LogOut size={18} />
          </button>
        )}
      </div>
    </aside>
  );
};

const Topbar = ({ collapsed, setCollapsed, isMobile, pageTitle }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [userOpen, setUserOpen] = useState(false);

  return (
    <header style={{
      height: 64, background: "var(--surface)", borderBottom: "1px solid var(--border)",
      display: "flex", alignItems: "center", padding: isMobile ? "0 16px" : "0 24px", gap: 16, position: "sticky", top: 0, zIndex: 60
    }}>
      <button onClick={() => setCollapsed(c => !c)} className="focus-ring"
        style={{
          background: "transparent", border: "1px solid var(--border)", borderRadius: 10,
          padding: 8, cursor: "pointer", color: "var(--text)", display: "flex"
        }}>
        {collapsed ? <Menu size={18} /> : (isMobile ? <Menu size={18} /> : <ChevronRight size={18} />)}
      </button>

      {!isMobile && (
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>{pageTitle}</h1>
        </div>
      )}
      {isMobile && <div style={{ flex: 1 }} />}

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {!isMobile && (
          <>
            <button onClick={toggleTheme} className="focus-ring"
              style={{
                position: "relative", width: 56, height: 28, borderRadius: 99,
                background: theme === "dark" ? "linear-gradient(135deg,#16A34A,#4ADE80)" : "rgba(22,163,74,0.12)",
                border: "1px solid var(--border)", cursor: "pointer", transition: "all 0.3s", padding: 0
              }}>
              <div style={{
                position: "absolute", top: 3, left: theme === "dark" ? 29 : 3, width: 20, height: 20, borderRadius: 999,
                background: theme === "dark" ? "#052E16" : "#16A34A", transition: "left 0.3s",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                {theme === "dark" ? <Moon size={11} color="#4ADE80" /> : <Sun size={11} color="#fff" />}
              </div>
            </button>

            <button className="focus-ring" style={{
              background: "transparent", border: "1px solid var(--border)",
              borderRadius: 10, padding: 8, cursor: "pointer", color: "var(--muted)", position: "relative"
            }}>
              <Bell size={18} />
              <div style={{
                position: "absolute", top: 6, right: 6, width: 7, height: 7, borderRadius: 99,
                background: "var(--accent)", border: "2px solid var(--surface)"
              }} className="pulse-dot" />
            </button>
          </>
        )}

        <div style={{ position: "relative" }}>
          <button onClick={() => setUserOpen(o => !o)} className="focus-ring"
            style={{
              display: "flex", alignItems: "center", gap: 8, background: "rgba(22,163,74,0.08)",
              border: "1px solid var(--border)", borderRadius: 10, padding: "6px 12px", cursor: "pointer"
            }}>
            <div style={{
              width: 26, height: 26, borderRadius: 8, background: "linear-gradient(135deg,#16A34A,#84CC16)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 11
            }}>
              {user?.initials}
            </div>
            {!isMobile && <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{user?.name?.split(" ")[0]}</span>}
            <ChevronDown size={14} style={{ color: "var(--muted)" }} />
          </button>
          {userOpen && (
            <div onClick={() => setUserOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 100 }}>
              <div onClick={e => e.stopPropagation()} style={{
                position: "absolute", top: 48, right: 0, background: "var(--surface)",
                border: "1px solid var(--border)", borderRadius: 12, width: 220, boxShadow: "0 12px 40px rgba(0,0,0,0.15)", padding: 8
              }}>
                {isMobile && (
                  <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--border)", marginBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{pageTitle}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>Theme</span>
                      <button onClick={toggleTheme} style={{
                        background: theme === "dark" ? "rgba(22,163,74,0.2)" : "rgba(0,0,0,0.05)",
                        border: "none", padding: "4px 8px", borderRadius: 6, cursor: "pointer", fontSize: 12
                      }}>
                        {theme === "dark" ? "Dark Mode" : "Light Mode"}
                      </button>
                    </div>
                    {/* <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>Notifications</span>
                      <Badge variant="accent">3 New</Badge>
                    </div> */}
                  </div>
                )}
                <button onClick={logout} style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
                  background: "transparent", border: "none", cursor: "pointer", color: "var(--danger)",
                  borderRadius: 8, fontFamily: "'DM Sans',sans-serif", fontSize: 14
                }}>
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const PAGE_TITLES = {
  "/vendor/dashboard": "Dashboard", "/vendor/products": "My Products", "/vendor/orders": "Orders",
  "/admin/dashboard": "Dashboard", "/admin/vendors": "Vendors", "/admin/farmers": "Farmers", "/admin/experts": "Experts",
};

const AppShell = ({ children }) => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { route } = useNav();

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      {isMobile && !collapsed && (
        <div
          onClick={() => setCollapsed(true)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)", zIndex: 45, transition: "opacity 0.3s"
          }}
        />
      )}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} isMobile={isMobile} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar collapsed={collapsed} setCollapsed={setCollapsed} isMobile={isMobile} pageTitle={PAGE_TITLES[route] || "Kilimboga"} />
        <main style={{ flex: 1, padding: isMobile ? 16 : 28, overflow: "auto" }}>
          <div className="page-enter">{children}</div>
        </main>
      </div>
    </div>
  );
};

export { Sidebar, Topbar, AppShell };
