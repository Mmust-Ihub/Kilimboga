import React, { useState, useEffect } from 'react';
import { useToast } from '../context';
import { Btn, Badge, Card, Skeleton, Modal, Input, Select, EmptyState, StatusBadge } from '../components/ui';
import { Plus, Search, Edit2, Trash2, Image as ImgIcon, Package, AlertCircle } from 'lucide-react';

const CATEGORIES = ["Seeds","Fertilizers","Pesticides","Equipment","Produce","Other"];
const CAT_COLORS = { Seeds:"lime", Fertilizers:"success", Pesticides:"warning", Equipment:"info", Produce:"success", Other:"default" };

import Database from '../js/db.js';

const db = new Database();

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name:"", description:"", category:"Seeds", quantity:0, price:0 });
  const [loading, setLoading] = useState(true);
  const [del, setDel] = useState(null);
  const toast = useToast();

  const fetchProducts = async () => {
    setLoading(true);
    const tokenStr = sessionStorage.getItem("token");
    if (tokenStr) {
      const res = await db.getProducts(JSON.parse(tokenStr));
      if (res.status) setProducts(res.products || res.data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const f = k => e => setForm(p=>({...p,[k]:e.target.value}));
  const openAdd = () => { setForm({ name:"", description:"", category:"Seeds", quantity:"", price:"" }); setModal({mode:"add"}); };
  const openEdit = (p) => { setForm({...p}); setModal({mode:"edit",data:p}); };

  const save = async () => {
    if (!form.name || !form.price) return toast("Name and price are required","error");
    const token = JSON.parse(sessionStorage.getItem("token"));
    if (modal.mode === "add") {
      const res = await db.addProduct(token, {...form, quantity:+form.quantity, price:+form.price});
      if (res.status) { toast("Product added","success"); fetchProducts(); }
      else toast(res.message || "Error adding product", "error");
    } else {
      const payload = {...modal.data, ...form, id: modal.data._id || modal.data.id, quantity:+form.quantity, price:+form.price};
      const res = await db.editProduct(token, payload);
      if (res.status) { toast("Product updated","success"); fetchProducts(); }
      else toast(res.message || "Error updating product", "error");
    }
    setModal(null);
  };

  const doDelete = async (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const res = await db.deleteProduct(token, id);
    if (res.status) {
      toast("Product deleted","success");
      setProducts(p=>p.filter(x=>(x._id||x.id)!==id));
    } else toast(res.message || "Error deleting", "error");
    setDel(null);
  };

  const filtered = products.filter(p =>
    (catFilter==="All"||p.category===catFilter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      {/* Toolbar */}
      <div style={{ display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
        <div style={{ position:"relative", flex:1, minWidth:180 }}>
          <Search size={15} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--muted)" }}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..."
            style={{ width:"100%", paddingLeft:36, paddingRight:14, paddingTop:10, paddingBottom:10,
              background:"var(--surface)", border:"1px solid var(--border)", borderRadius:10, fontSize:14, color:"var(--text)",
              outline:"none", fontFamily:"'DM Sans',sans-serif", boxSizing:"border-box" }}/>
        </div>
        <select value={catFilter} onChange={e=>setCatFilter(e.target.value)}
          style={{ padding:"10px 14px", background:"var(--surface)", border:"1px solid var(--border)",
            borderRadius:10, fontSize:14, color:"var(--text)", outline:"none", fontFamily:"'DM Sans',sans-serif" }}>
          {["All",...CATEGORIES].map(c=><option key={c}>{c}</option>)}
        </select>
        <Btn onClick={openAdd} icon={<Plus size={15}/>}>Add Product</Btn>
      </div>

      {loading ? (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16 }}>
          {[...Array(4)].map((_,i)=><div key={i} style={{ borderRadius:16, overflow:"hidden", background:"var(--surface)", border:"1px solid var(--border)", padding:20 }}><Skeleton h={120} style={{ marginBottom:12 }}/><Skeleton w="70%" h={16} style={{ marginBottom:8 }}/><Skeleton w="40%" h={12}/></div>)}
        </div>
      ) : filtered.length === 0 ? (
        <Card><EmptyState icon={Package} title="No products found" subtitle="Add your first product or adjust your search filters"/></Card>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:16 }}>
          {filtered.map(p => (
            <Card key={p.id} style={{ padding:0, overflow:"hidden" }}>
              {/* Image placeholder */}
              <div style={{ height:120, background:"linear-gradient(135deg,rgba(22,163,74,0.08),rgba(132,204,22,0.08))",
                display:"flex", alignItems:"center", justifyContent:"center", borderBottom:"1px solid var(--border)" }}>
                <ImgIcon size={36} style={{ color:"rgba(22,163,74,0.3)" }}/>
              </div>
              <div style={{ padding:"16px 18px" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:8 }}>
                  <div>
                    <div style={{ fontWeight:700, fontSize:15, marginBottom:4 }}>{p.name}</div>
                    <Badge variant={CAT_COLORS[p.category]||"default"}>{p.category}</Badge>
                  </div>
                  <div style={{ display:"flex", gap:6 }}>
                    <button onClick={()=>openEdit(p)} style={{ background:"rgba(22,163,74,0.1)", border:"none", borderRadius:8,
                      padding:7, cursor:"pointer", color:"var(--primary)" }}><Edit2 size={14}/></button>
                    <button onClick={()=>setDel(p.id)} style={{ background:"rgba(220,38,38,0.1)", border:"none", borderRadius:8,
                      padding:7, cursor:"pointer", color:"var(--danger)" }}><Trash2 size={14}/></button>
                  </div>
                </div>
                <p style={{ margin:"8px 0 12px", fontSize:13, color:"var(--muted)", lineHeight:1.5,
                  display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{p.description}</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontWeight:500, fontSize:16, color:"var(--primary)" }}>
                    KES {p.price.toLocaleString()}
                  </div>
                  <div style={{ fontSize:12, color:"var(--muted)" }}>Stock: <strong>{p.quantity}</strong></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal open={!!modal} onClose={()=>setModal(null)} title={modal?.mode==="add"?"Add New Product":"Edit Product"}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Input label="Product Name" value={form.name} onChange={f("name")} placeholder="e.g. Maize Seeds Premium" required/>
          <div>
            <label style={{ fontSize:13, fontWeight:600, color:"var(--text)", opacity:0.85, display:"block", marginBottom:6 }}>Description</label>
            <textarea value={form.description} onChange={f("description")} rows={3} placeholder="Describe your product..."
              style={{ width:"100%", padding:"11px 14px", background:"var(--bg)", border:"1px solid var(--border)",
                borderRadius:10, fontSize:14, color:"var(--text)", outline:"none", resize:"vertical",
                fontFamily:"'DM Sans',sans-serif", boxSizing:"border-box" }}/>
          </div>
          <Select label="Category" value={form.category} onChange={f("category")} options={CATEGORIES.map(c=>({value:c,label:c}))} required/>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <Input label="Quantity" type="number" value={form.quantity} onChange={f("quantity")} placeholder="0" required/>
            <Input label="Price (KES)" type="number" value={form.price} onChange={f("price")} placeholder="0" required/>
          </div>
          {/* Multi-image upload placeholder */}
          <div style={{ border:"2px dashed var(--border)", borderRadius:12, padding:"20px", textAlign:"center",
            cursor:"pointer", background:"var(--bg)" }}>
            <Upload size={20} style={{ color:"var(--primary)", margin:"0 auto 6px", display:"block" }}/>
            <p style={{ margin:0, fontSize:13, color:"var(--muted)" }}>Upload product images (optional)</p>
          </div>
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
            <Btn variant="ghost" onClick={()=>setModal(null)}>Cancel</Btn>
            <Btn onClick={save}>{modal?.mode==="add"?"Add Product":"Save Changes"}</Btn>
          </div>
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal open={!!del} onClose={()=>setDel(null)} title="Delete Product" width={400}>
        <p style={{ color:"var(--muted)", marginTop:0 }}>Are you sure you want to delete this product? This action cannot be undone.</p>
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
          <Btn variant="ghost" onClick={()=>setDel(null)}>Cancel</Btn>
          <Btn variant="danger" onClick={()=>doDelete(del)}>Delete Product</Btn>
        </div>
      </Modal>
    </div>
  );
};

export default VendorProducts;
