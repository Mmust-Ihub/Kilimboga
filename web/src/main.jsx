import { StrictMode, useState, useCallback, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'

import { AuthCtx, ThemeCtx, ToastCtx, NavCtx, ToastProvider, useAuth, useTheme, useNav } from './context';
import { AppShell } from './layouts';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VendorDashboard from './pages/VendorDashboard';
import VendorProducts from './pages/VendorProducts';
import VendorOrders from './pages/VendorOrders';
import AdminDashboard from './pages/AdminDashboard';
import AdminVendors from './pages/AdminVendors';
import AdminFarmers from './pages/AdminFarmers';
import AdminExperts from './pages/AdminExperts';

const GlobalStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&family=DM+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; }
      :root {
        --bg: #F0FDF4; --surface: #FFFFFF; --primary: #16A34A;
        --secondary: #15803D; --accent: #84CC16; --text: #052E16;
        --muted: #6B7280; --border: #D1FAE5; --warning: #D97706; --danger: #DC2626;
        --shadow-card: 0 4px 20px -2px rgba(22,163,74,0.12);
        --shadow-hover: 0 12px 28px -4px rgba(22,163,74,0.20);
        --shadow-btn: 0 4px 14px 0 rgba(22,163,74,0.35);
      }
      .dark {
        --bg: #052E16; --surface: #14532D; --primary: #4ADE80;
        --secondary: #86EFAC; --accent: #A3E635; --text: #F0FDF4;
        --muted: #86EFAC; --border: #166534;
        --shadow-card: 0 4px 20px -2px rgba(74,222,128,0.10);
        --shadow-hover: 0 12px 28px -4px rgba(74,222,128,0.18);
        --shadow-btn: 0 4px 14px 0 rgba(74,222,128,0.30);
      }
      body, #root { background: var(--bg); font-family: 'DM Sans', sans-serif; color: var(--text); margin:0; }
      .font-mono { font-family: 'DM Mono', monospace; }
      .page-enter { animation: pageIn 0.28s ease forwards; }
      @keyframes pageIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      .stat-glow { box-shadow: 0 0 32px rgba(74,222,128,0.22); }
      .blob { filter: blur(80px); opacity: 0.18; border-radius: 999px; position:absolute; pointer-events:none; }
      .grain::after { content:''; position:absolute; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events:none; border-radius:inherit; }
      .sidebar-item { transition: all 0.18s ease; }
      .sidebar-item:hover { background: rgba(22,163,74,0.12); transform:translateX(2px); }
      .sidebar-item.active { background: linear-gradient(135deg, rgba(22,163,74,0.22), rgba(132,204,22,0.12)); }
      .btn-press:active { transform: scale(0.97); }
      .card-hover { transition: box-shadow 0.22s ease, transform 0.22s ease; }
      .card-hover:hover { box-shadow: var(--shadow-hover); transform: translateY(-2px); }
      .pulse-dot { animation: pulse 2s infinite; }
      @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
      .count-up { animation: countUp 0.8s ease; }
      @keyframes countUp { from{opacity:0;transform:scale(0.8);} to{opacity:1;transform:scale(1);} }
      .skeleton { background: linear-gradient(90deg, rgba(22,163,74,0.08) 25%, rgba(22,163,74,0.16) 50%, rgba(22,163,74,0.08) 75%); background-size:200% 100%; animation: shimmer 1.5s infinite; }
      .dark .skeleton { background: linear-gradient(90deg, rgba(74,222,128,0.06) 25%, rgba(74,222,128,0.12) 50%, rgba(74,222,128,0.06) 75%); background-size:200% 100%; animation: shimmer 1.5s infinite; }
      @keyframes shimmer { 0%{background-position:200% 0;} 100%{background-position:-200% 0;} }
      ::-webkit-scrollbar { width:6px; height:6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(22,163,74,0.3); border-radius:3px; }
      input, select, textarea { font-family: 'DM Sans', sans-serif; }
      .toast-enter { animation: toastIn 0.3s ease; }
      @keyframes toastIn { from{opacity:0;transform:translateX(40px);} to{opacity:1;transform:translateX(0);} }
      .modal-bg { animation: modalBgIn 0.2s ease; }
      @keyframes modalBgIn { from{opacity:0;} to{opacity:1;} }
      .modal-content { animation: modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1); }
      @keyframes modalIn { from{opacity:0;transform:scale(0.93) translateY(16px);} to{opacity:1;transform:scale(1) translateY(0);} }
      .focus-ring:focus { outline: 2px solid var(--primary); outline-offset: 2px; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(link); document.head.removeChild(style); };
  }, []);
  return null;
};

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const u = sessionStorage.getItem("user");
      return u ? JSON.parse(u) : null;
    } catch { return null; }
  });
  const [theme, setTheme] = useState("light");
  const [route, setRoute] = useState(() => {
    try {
      const u = sessionStorage.getItem("user");
      if (u) {
        const pd = JSON.parse(u);
        return pd.role === "admin" ? "/admin/dashboard" : "/vendor/dashboard";
      }
    } catch {}
    return "/login";
  });

  const login = useCallback((u) => { setUser(u); }, []);
  const logout = useCallback(() => { 
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null); 
    setRoute("/login"); 
  }, []);
  const toggleTheme = useCallback(() => {
    setTheme(t => {
      const next = t === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }, []);

  const navigate = useCallback((path) => {
    if (!user && path !== "/login" && path !== "/register") { setRoute("/login"); return; }
    if (user && path.startsWith("/vendor") && user.role !== "vendor") { setRoute("/admin/dashboard"); return; }
    if (user && path.startsWith("/admin") && user.role !== "admin") { setRoute("/vendor/dashboard"); return; }
    setRoute(path);
  }, [user]);

  const renderPage = () => {
    if (!user) {
      if (route === "/register") return <RegisterPage />;
      return <LoginPage />;
    }
    const pages = {
      "/vendor/dashboard": <VendorDashboard />,
      "/vendor/products": <VendorProducts />,
      "/vendor/orders": <VendorOrders />,
      "/admin/dashboard": <AdminDashboard />,
      "/admin/vendors": <AdminVendors />,
      "/admin/farmers": <AdminFarmers />,
      "/admin/experts": <AdminExperts />,
    };
    const content = pages[route] || pages[user.role === "admin" ? "/admin/dashboard" : "/vendor/dashboard"];
    return <AppShell>{content}</AppShell>;
  };

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      <ThemeCtx.Provider value={{ theme, toggleTheme }}>
        <NavCtx.Provider value={{ route, navigate }}>
          <ToastProvider>
            <GlobalStyles />
            {renderPage()}
          </ToastProvider>
        </NavCtx.Provider>
      </ThemeCtx.Provider>
    </AuthCtx.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <App />
)
