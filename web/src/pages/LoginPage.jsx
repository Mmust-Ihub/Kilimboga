import React, { useState } from 'react';
import { useAuth, useNav, useToast } from '../context';
import { Btn, Card, Input } from '../components/ui';
import { Leaf, Mail, Eye, EyeOff, Lock, ArrowRight, Check, RefreshCw } from 'lucide-react';

import Database from '../js/db.js';

const db = new Database();

const LoginPage = () => {
  const { login } = useAuth();
  const { navigate } = useNav();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleLogin = async () => {
    setErr(""); setLoading(true);
    const res = await db.login({ email, password: pass });
    if (res.status) {
      const u = res.user;
      login(u);
      toast("Welcome back, " + (u.firstName || u.name?.split(" ")[0] || "User") + "! 🌿", "success");
      navigate(u.role === "admin" ? "/admin/dashboard" : "/vendor/dashboard");
    } else {
      setErr(res.message || "Invalid email or password.");
      toast(res.message || "Login failed.", "error");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      background: "linear-gradient(160deg, #052E16 0%, #14532D 40%, #166534 70%, #052E16 100%)"
    }}>
      {/* Atmospheric blobs */}
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: 999, left: -120, top: -100,
        background: "radial-gradient(circle,#16A34A,transparent)", opacity: 0.2, filter: "blur(80px)"
      }} />
      <div style={{
        position: "absolute", width: 400, height: 400, borderRadius: 999, right: -80, bottom: -80,
        background: "radial-gradient(circle,#84CC16,transparent)", opacity: 0.15, filter: "blur(80px)"
      }} />
      <div style={{
        position: "absolute", width: 200, height: 200, borderRadius: 999, left: "40%", top: "20%",
        background: "radial-gradient(circle,#4ADE80,transparent)", opacity: 0.12, filter: "blur(60px)"
      }} />

      {/* Floating leaves */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: "absolute", color: "rgba(74,222,128,0.15)", fontSize: 24,
          top: `${15 + i * 13}%`, left: `${5 + i * 16}%`, transform: `rotate(${i * 47}deg)`, userSelect: "none"
        }}>🌿</div>
      ))}

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 420, padding: 20 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18, background: "linear-gradient(135deg,#16A34A,#84CC16)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
            boxShadow: "0 0 40px rgba(74,222,128,0.4)"
          }}>
            <Leaf size={28} color="#fff" />
          </div>
          <h1 style={{ margin: 0, color: "#F0FDF4", fontWeight: 800, fontSize: 28, letterSpacing: "-0.04em" }}>FarmLink</h1>
          <p style={{ margin: "6px 0 0", color: "rgba(134,239,172,0.8)", fontSize: 14 }}>Connecting the agricultural supply chain</p>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.07)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderRadius: 24, border: "1px solid rgba(74,222,128,0.2)", padding: 36,
          boxShadow: "0 32px 80px rgba(0,0,0,0.4)"
        }}>
          <h2 style={{ margin: "0 0 24px", color: "#F0FDF4", fontWeight: 700, fontSize: 20 }}>Sign In</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(240,253,244,0.8)", marginBottom: 6 }}>Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail size={16} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "rgba(134,239,172,0.6)" }} />
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com"
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  style={{
                    width: "100%", padding: "12px 14px 12px 40px", background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(74,222,128,0.2)", borderRadius: 12, fontSize: 14,
                    color: "#F0FDF4", outline: "none", fontFamily: "'DM Sans',sans-serif", boxSizing: "border-box"
                  }}
                  className="focus-ring" />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(240,253,244,0.8)", marginBottom: 6 }}>Password</label>
              <div style={{ position: "relative" }}>
                <input value={pass} onChange={e => setPass(e.target.value)} type={showPass ? "text" : "password"} placeholder="••••••••"
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  style={{
                    width: "100%", padding: "12px 40px 12px 14px", background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(74,222,128,0.2)", borderRadius: 12, fontSize: 14,
                    color: "#F0FDF4", outline: "none", fontFamily: "'DM Sans',sans-serif", boxSizing: "border-box"
                  }}
                  className="focus-ring" />
                <button onClick={() => setShowPass(s => !s)} style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "transparent", border: "none", cursor: "pointer", color: "rgba(134,239,172,0.6)", padding: 0
                }}>
                  {showPass ? <Eye size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {err && <div style={{
              background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)",
              borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#FCA5A5"
            }}>{err}</div>}

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 16, height: 16, borderRadius: 4, border: "1px solid rgba(74,222,128,0.4)",
                background: "rgba(22,163,74,0.2)", display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <Check size={10} color="#4ADE80" />
              </div>
              <span style={{ fontSize: 13, color: "rgba(240,253,244,0.6)" }}>Remember me</span>
            </div>

            <button onClick={handleLogin} disabled={loading} className="btn-press"
              style={{
                width: "100%", padding: "13px", background: loading ? "rgba(22,163,74,0.5)" : "linear-gradient(135deg,#16A34A,#84CC16)",
                border: "none", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 15,
                cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans',sans-serif",
                boxShadow: "0 4px 20px rgba(22,163,74,0.4)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8
              }}>
              {loading ? <><RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} /> Signing In...</> : "Sign In →"}
            </button>

            <p style={{ textAlign: "center", margin: 0, fontSize: 13, color: "rgba(240,253,244,0.5)" }}>
              New vendor?{" "}
              <button onClick={() => navigate("/register")} style={{ background: "transparent", border: "none", color: "#4ADE80", cursor: "pointer", fontWeight: 600, fontSize: 13, fontFamily: "'DM Sans',sans-serif" }}>
                Register here
              </button>
            </p>
          </div>
        </div>

      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}`}</style>
    </div>
  );
};

export default LoginPage;
