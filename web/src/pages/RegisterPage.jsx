import React, { useState, useRef, useEffect } from 'react';
import { useNav, useToast } from '../context';
import { Btn, Card, Input, Select } from '../components/ui';
import { Leaf, Mail, Phone, Upload, X, FileText, CheckCircle, Sprout, DollarSign, Award } from 'lucide-react';

import Database from '../js/db.js';

const db = new Database();

const RegisterPage = () => {
  const { navigate } = useNav();
  const toast = useToast();
  const [form, setForm] = useState({ fname: "", lname: "", email: "", phone: "", password: "", confirm: "" });
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
  const strength = form.password.length < 4 ? 0 : form.password.length < 7 ? 1 : form.password.length < 10 ? 2 : 3;
  const sColors = ["#DC2626", "#D97706", "#16A34A", "#15803D"];
  const sLabels = ["Too short", "Weak", "Good", "Strong"];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setForm(p => ({ ...p, lat: pos.coords.latitude, lng: pos.coords.longitude })),
        (err) => console.error("Location error:", err)
      );
    }
  });

  const addFiles = (incoming) => {
    const arr = Array.from(incoming).filter(f => ["application/pdf", "image/jpeg", "image/png"].includes(f.type));
    setFiles(p => [...p, ...arr]);
  };

  const handleDrop = (e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); };

  const handleSubmit = async () => {
    if (!form.fname || !form.email || !form.password) return toast("Please fill all required fields", "error");
    if (form.password !== form.confirm) return toast("Passwords do not match", "error");

    setLoading(true);
    const payload = {
      firstName: form.fname,
      lastName: form.lname,
      email: form.email,
      password: form.password,
      phoneNumber: form.phone,
      longitude: form.lng,
      latitude: form.lat,
      isSpecial: false,
      documents: files.length > 0 ? files : [new File([""], "")],
      role: 'vendor'
    };

    const res = await db.register(payload);
    setLoading(false);

    if (res.status) {
      toast("Registration submitted! Awaiting approval.", "success");
      navigate("/login");
    } else {
      toast(res.message || "Registration failed.", "error");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "stretch" }}>
      {/* Left panel */}
      <div className="hidden md:flex border border-4 flex-col justify-center px-10 py-20 relative overflow-hidden" style={{
        width: 340, background: "linear-gradient(160deg,#052E16,#166534)"
      }}>
        <div className="blob" style={{ width: 200, height: 200, background: "#16A34A", top: -40, right: -40 }} />
        <div className="blob" style={{ width: 160, height: 160, background: "#84CC16", bottom: 40, left: -40 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg,#16A34A,#84CC16)",
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24
          }}>
            <Leaf size={22} color="#fff" />
          </div>
          <h2 style={{ color: "#F0FDF4", fontWeight: 800, fontSize: 26, letterSpacing: "-0.04em", margin: "0 0 12px" }}>Join Kilimboga</h2>
          <p style={{ color: "rgba(134,239,172,0.8)", fontSize: 14, lineHeight: 1.7, margin: "0 0 32px" }}>
            Connect with farmers across Kenya. List your agricultural products and grow your business.
          </p>
          {[["Reach 5,000+ farmers", "Sprout"], ["Instant M-Pesa payments", "DollarSign"], ["Expert support 24/7", "Award"]].map(([t], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(74,222,128,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle size={14} color="#4ADE80" />
              </div>
              <span style={{ color: "rgba(240,253,244,0.8)", fontSize: 14 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: 520 }}>
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ margin: 0, fontWeight: 800, fontSize: 26, letterSpacing: "-0.04em" }}>Create Vendor Account</h1>
            <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 14 }}>Fill in your details to get started</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Input label="First Name" value={form.fname} onChange={f("fname")} placeholder="John" required />
              <Input label="Last Name" value={form.lname} onChange={f("lname")} placeholder="Doe" required />
            </div>
            <Input label="Email Address" type="email" value={form.email} onChange={f("email")} placeholder="you@example.com" required icon={<Mail size={14} />} />
            <Input label="Phone Number" value={form.phone} onChange={f("phone")} placeholder="0712 345 678" icon={<Phone size={14} />} />
            <Input label="Password" type="password" value={form.password} onChange={f("password")} placeholder="••••••••" required />
            {form.password && (
              <div>
                <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      flex: 1, height: 4, borderRadius: 99,
                      background: strength > i ? sColors[strength] : "var(--border)", transition: "background 0.3s"
                    }} />
                  ))}
                </div>
                <span style={{ fontSize: 12, color: sColors[strength], fontWeight: 600 }}>{sLabels[strength]}</span>
              </div>
            )}
            <Input label="Confirm Password" type="password" value={form.confirm} onChange={f("confirm")} placeholder="••••••••" required
              error={form.confirm && form.password !== form.confirm ? "Passwords do not match" : ""} />

            {/* File upload */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", opacity: 0.85, display: "block", marginBottom: 6 }}>
                Verification Documents <span style={{ color: "var(--muted)", fontWeight: 400 }}>(PDF, JPG, PNG)</span>
              </label>
              <div onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop}
                onClick={() => fileRef.current.click()}
                style={{
                  border: `2px dashed ${dragging ? "var(--primary)" : "var(--border)"}`, borderRadius: 14,
                  padding: "28px 20px", textAlign: "center", cursor: "pointer", transition: "all 0.2s",
                  background: dragging ? "rgba(22,163,74,0.06)" : "var(--bg)"
                }}>
                <Upload size={24} style={{ color: "var(--primary)", margin: "0 auto 8px", display: "block" }} />
                <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>Drop files here or <span style={{ color: "var(--primary)", fontWeight: 600 }}>browse</span></p>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--muted)" }}>Business permit, ID copy, KRA PIN</p>
              </div>
              <input ref={fileRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }}
                onChange={e => addFiles(e.target.files)} />
              {files.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                  {files.map((file, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 6, padding: "5px 10px 5px 8px",
                      background: "rgba(22,163,74,0.08)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12
                    }}>
                      <FileText size={12} style={{ color: "var(--primary)" }} />
                      <span style={{ maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</span>
                      <button onClick={e => { e.stopPropagation(); setFiles(p => p.filter((_, j) => j !== i)); }}
                        style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--muted)", padding: 0, lineHeight: 1 }}>
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Btn onClick={handleSubmit} size="lg" disabled={loading} full>
              {loading ? "Registering..." : "Register as Vendor"}
            </Btn>
            <p style={{ textAlign: "center", margin: 0, fontSize: 13, color: "var(--muted)" }}>
              Already have an account?{" "}
              <button onClick={() => navigate("/login")} style={{ background: "transparent", border: "none", color: "var(--primary)", cursor: "pointer", fontWeight: 600, fontSize: 13, fontFamily: "'DM Sans',sans-serif" }}>
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
