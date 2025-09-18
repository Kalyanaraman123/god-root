// src/App.jsx
import React, { useEffect, useState } from "react";

/* ---------- sample products (keep files in public/products/) ---------- */
const SAMPLE_PRODUCTS = [
  { id: 1, title: "Teddy bear print pant", price: 29900, oldPrice: 49900, sizes: ["S", "M", "L", "XL"], img: "/products/design1.jpeg" },
  { id: 2, title: "Tropical bloom pant", price: 33900, oldPrice: 59900, sizes: ["S", "M", "L", "XL"], img: "/products/design2.jpeg" },
  { id: 3, title: "Doodle home pant", price: 33900, oldPrice: 59900, sizes: ["S", "M", "L", "XL"], img: "/products/design3.jpeg" },
  { id: 4, title: "Blue & green pant", price: 29900, oldPrice: 49900, sizes: ["M", "L", "XL"], img: "/products/design1.jpeg" },
  { id: 5, title: "Berry bold pant", price: 33900, oldPrice: 59900, sizes: ["S", "M", "L", "XL"], img: "/products/design2.jpeg" },
  { id: 6, title: "Black pant", price: 29900, oldPrice: 49900, sizes: ["S", "M", "L", "XL"], img: "/products/design3.jpeg" },
];

function currency(paise) { return `₹${(paise / 100).toFixed(2)}`; }

/* ---------- TopBar ---------- */
function TopBar() {
  // removed "Free shipping..." per your request
  const messages = [
    "Hot deals this week — limited stock!"
  ];

  return (
    <div className="topbar-outer">
      <div className="topbar container-inner">
        <div className="topbar-left">Best Deals</div>
        <div className="topbar-marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...messages, ...messages].map((m, i) => (
              <div key={i} className="marquee-item">{m}</div>
            ))}
          </div>
        </div>
        <div className="topbar-right">Mon–Sat: 9am–6pm</div>
      </div>
    </div>
  );
}

/* ---------- Header: left nav, centered logo, right actions ---------- */
function MainHeader({ logoUrl, onOpenCart, cartCount, onOpenAdmin }) {
  return (
    <header className="main-header">
      <div className="container-inner header-row-grid">
        <div className="header-left">
          <div className="left-group">
            <button className="icon-btn small" aria-label="menu">
              <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" /></svg>
            </button>

            <nav className="left-nav">
              <a className="nav-link">Shop</a>
              <a className="nav-link">Collections</a>
              <a className="nav-link">About</a>
            </nav>
          </div>
        </div>

        <div className="header-center">
          <img
            className="site-logo"
            src={logoUrl}
            alt="God Root logo"
            onError={(e) => { e.currentTarget.src = "/logo.png"; }}
          />
        </div>

        <div className="header-right">
          <div className="right-group">
            <button className="icon-btn small" aria-label="search">
              <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/></svg>
            </button>

            <button className="text-btn compact">Login</button>

            <button className="icon-btn small" aria-label="favorites" title="Favorites">
              <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M20.8 8.6a5.5 5.5 0 00-7.8-7.8L12 2.6l-1 1-1-1A5.5 5.5 0 002.2 8.6c0 6.8 9.8 11.6 9.8 11.6s9.8-4.8 9.8-11.6z"/></svg>
            </button>

            <button onClick={onOpenCart} className="icon-btn small relative" aria-label="cart">
              <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4"/><circle cx="9" cy="20" r="1"/><circle cx="20" cy="20" r="1"/></svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            <button onClick={onOpenAdmin} className="text-btn compact admin-btn">Admin</button>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------- Showcase (large single product) ---------- */
function Showcase({ product, onAdd, onQuick }) {
  if (!product) return null;

  return (
    <section className="showcase-outer">
      <div className="container-inner showcase">
        <div className="showcase-left">
          <div className="showcase-img-wrap">
            <img src={product.img} alt={product.title} loading="lazy"
                 onError={(e)=>{ e.currentTarget.src='/placeholder.svg'; }} />
          </div>
        </div>

        <div className="showcase-right">
          <div className="eyebrow">Spotlight</div>
          <h2 className="showcase-title">{product.title}</h2>
          <div className="showcase-prices">
            <div className="old-price">{currency(product.oldPrice)}</div>
            <div className="price">{currency(product.price)}</div>
          </div>

          <p className="showcase-desc">
            A premium, soft-feel pant with signature prints. Comfortable for everyday wear — available in multiple sizes.
          </p>

          <div className="showcase-actions">
            <button className="btn-primary" onClick={() => onAdd(product)}>Add to cart</button>
            <button className="btn-ghost" onClick={() => onQuick(product)}>Quick view</button>
          </div>

          <div className="showcase-meta">
            <div><strong>Sizes:</strong> {product.sizes.join(", ")}</div>
            <div className="mt-2 text-sm text-gray-400">Free returns • COD available</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- ProductCard ---------- */
function ProductCard({ p, onQuick, onAdd, onEdit }) {
  return (
    <article className="card overflow-hidden">
      <div className="product-img-wrap">
        <img
          src={p.img}
          alt={p.title}
          loading="lazy"
          decoding="async"
          onLoad={(e) => e.currentTarget.classList.add("loaded")}
          onError={(e) => {
            const el = e.currentTarget;
            if (!el.dataset.fallbacked) {
              el.dataset.fallbacked = "1";
              el.src = "/placeholder.svg";
            } else {
              el.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='1200'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='52%25' font-family='Arial' font-size='48' text-anchor='middle' fill='%239ca3af'%3EImage not available%3C/text%3E%3C/svg%3E";
            }
          }}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-semibold truncate">{p.title}</h3>
          <div className="text-xs text-gray-500">Sizes: {p.sizes.join(" ")}</div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="old-price text-sm">{currency(p.oldPrice)}</div>
            <div className="text-lg font-bold mt-1">{currency(p.price)}</div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
              <span className="swatch" style={{ background: "#111827" }} />
              <span className="swatch" style={{ background: "#f3f4f6" }} />
              <span className="swatch" style={{ background: "#f43f5e" }} />
            </div>

            <div className="flex gap-2 mt-2">
              <button onClick={() => onAdd(p)} className="px-3 py-1 bg-black text-white rounded-md text-sm">Add</button>
              <button onClick={() => onQuick(p)} className="px-3 py-1 border rounded-md text-sm">View</button>
            </div>

            <button onClick={() => onEdit(p)} className="mt-2 text-xs text-indigo-600">Edit</button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- QuickView modal ---------- */
function QuickView({ product, onClose, onAdd }) {
  const [size, setSize] = useState(product?.sizes?.[0] ?? null);
  useEffect(() => { setSize(product?.sizes?.[0] ?? null); }, [product]);
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 z-10 shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-4">
            <img src={product.img} alt={product.title} className="w-full h-80 object-cover rounded" />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <div className="mt-3">
              <div className="old-price text-sm">{currency(product.oldPrice)}</div>
              <div className="text-2xl font-extrabold">{currency(product.price)}</div>
            </div>

            <div className="mt-5">
              <div className="text-sm text-gray-600 mb-2">Choose size</div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSize(s)} className={`px-3 py-1 border rounded ${size === s ? 'bg-black text-white' : ''}`}>{s}</button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => { onAdd(product, size); onClose(); }} className="px-5 py-3 bg-black text-white rounded-md">Add to cart</button>
              <button onClick={onClose} className="px-5 py-3 border rounded-md">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Edit modal (product + logo) ---------- */
function EditModal({ open, item, type, onClose, onSave }) {
  const [form, setForm] = useState({});
  useEffect(() => {
    if (!open) return;
    if (type === "product") setForm(item ? { ...item } : {});
    else if (type === "logo") setForm({ logoUrl: item || "/logo.png" });
  }, [open, item, type]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded-2xl shadow-2xl z-10 p-6 max-w-lg w-full">
        <h3 className="text-lg font-semibold mb-4">{type === "logo" ? "Edit Logo" : "Edit Product"}</h3>

        {type === "logo" ? (
          <>
            <label className="block text-sm text-gray-600">Logo URL (or keep /logo.png)</label>
            <input className="w-full border rounded px-3 py-2 mt-2" value={form.logoUrl || ""} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} />
            <div className="mt-4 flex gap-2 items-center">
              <img src={form.logoUrl || "/logo.png"} alt="preview" style={{ height: 40, objectFit: "contain" }} onError={(e) => { e.currentTarget.src = "/logo.png"; }} />
              <div className="text-sm text-gray-500">Preview</div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={() => onSave(form)} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
            </div>
          </>
        ) : (
          <>
            <label className="block text-sm text-gray-600">Title</label>
            <input className="w-full border rounded px-3 py-2 mt-2" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600">Price (INR)</label>
                <input type="number" className="w-full border rounded px-3 py-2 mt-2" value={form.price ? form.price / 100 : ""} onChange={(e) => setForm({ ...form, price: Math.round(Number(e.target.value || 0) * 100) })} />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Old price (INR)</label>
                <input type="number" className="w-full border rounded px-3 py-2 mt-2" value={form.oldPrice ? form.oldPrice / 100 : ""} onChange={(e) => setForm({ ...form, oldPrice: Math.round(Number(e.target.value || 0) * 100) })} />
              </div>
            </div>

            <label className="block text-sm text-gray-600 mt-3">Sizes (comma separated)</label>
            <input className="w-full border rounded px-3 py-2 mt-2" value={(form.sizes || []).join(",")} onChange={(e) => setForm({ ...form, sizes: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} />

            <label className="block text-sm text-gray-600 mt-3">Image URL</label>
            <input className="w-full border rounded px-3 py-2 mt-2" value={form.img || ""} onChange={(e) => setForm({ ...form, img: e.target.value })} />
            <div className="mt-4">
              <img src={form.img || "/placeholder.svg"} alt="preview" style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 8 }} onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }} />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={() => onSave(form)} className="px-4 py-2 bg-indigo-600 text-white rounded">Save product</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- Cart ---------- */
function Cart({ open, items, onClose, onRemove }) {
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl transform transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">Your cart</h3>
          <button onClick={onClose}>Close</button>
        </div>

        <div className="p-4 space-y-4 overflow-auto h-[calc(100%-180px)]">
          {items.length === 0 ? <div className="text-sm text-gray-500">Cart is empty</div> : items.map((it, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">{it.title}</div>
                <div className="text-xs text-gray-500">Size: {it.size}</div>
                <div className="text-sm">{currency(it.price * it.qty)}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-sm">Qty: {it.qty}</div>
                <button onClick={() => onRemove(it)} className="text-xs text-red-600">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between font-semibold">
            <div>Total</div>
            <div>{currency(total)}</div>
          </div>
          <div className="mt-4">
            <button className="w-full px-4 py-2 bg-black text-white rounded-md">Checkout</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ---------- Footer: 5-column smart layout ---------- */
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-inner footer-grid">
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li>Mens</li>
            <li>T-Shirt</li>
            <li>Hoodies</li>
            <li>Shirt</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Informations</h4>
          <ul>
            <li>Track Order</li>
            <li>Returns Policy</li>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Account</h4>
          <ul>
            <li>Cart</li>
            <li>My account</li>
            <li>My orders</li>
            <li>Wishlist</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Follow us</h4>
          <ul>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>YouTube</li>
          </ul>
        </div>

        <div className="footer-col footer-contact">
          <img src="/logo.png" alt="God Root" className="footer-logo" onError={(e)=>{ e.currentTarget.src='/logo.png'; }} />
          <address>
            No 7, Jothi Nagar, KS Theatre Main Road, Mannari Post, Tirupur - 641607
          </address>
          <div className="mt-2">+91 70101 94286</div>
          <div>godroot77@gmail.com</div>
        </div>
      </div>

      <div className="footer-bottom container-inner">
        <div>© {new Date().getFullYear()} God Root • All rights reserved</div>
        <div>Designed with ❤</div>
      </div>
    </footer>
  );
}

/* ---------- MAIN APP ---------- */
export default function App() {
  const [products, setProducts] = useState(() => {
    try { const raw = localStorage.getItem("godroot_products"); if (raw) return JSON.parse(raw); } catch (e) {}
    return SAMPLE_PRODUCTS;
  });

  const [logoUrl, setLogoUrl] = useState(() => {
    try { return localStorage.getItem("godroot_logo") || "/logo.png"; } catch (e) { return "/logo.png"; }
  });

  const [quick, setQuick] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editType, setEditType] = useState("product");

  useEffect(() => { try { localStorage.setItem("godroot_products", JSON.stringify(products)); } catch (e) {} }, [products]);
  useEffect(() => { try { localStorage.setItem("godroot_logo", logoUrl); } catch (e) {} }, [logoUrl]);

  function addToCart(product, size = product.sizes[0]) {
    setCart(prev => {
      const idx = prev.findIndex(x => x.id === product.id && x.size === size);
      if (idx >= 0) { const copy = [...prev]; copy[idx].qty += 1; return copy; }
      return [...prev, { id: product.id, title: product.title, price: product.price, size, qty: 1 }];
    });
    setCartOpen(true);
  }

  function removeFromCart(item) { setCart(prev => prev.filter(x => !(x.id === item.id && x.size === item.size))); }

  function openEditProduct(product) { setEditType("product"); setEditItem(product); setEditOpen(true); }
  function openEditLogo() { setEditType("logo"); setEditItem(logoUrl); setEditOpen(true); }

  function saveEdit(form) {
    if (editType === "logo") { setLogoUrl(form.logoUrl || "/logo.png"); setAdminOpen(false); setEditOpen(false); return; }
    setProducts(prev => {
      if (!form.id) { const newId = prev.reduce((m, x) => Math.max(m, x.id), 0) + 1; return [...prev, { ...form, id: newId }]; }
      else { return prev.map(p => p.id === form.id ? { ...p, ...form } : p); }
    });
    setEditOpen(false);
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen">
      <TopBar />
      <MainHeader logoUrl={logoUrl} onOpenCart={() => setCartOpen(true)} cartCount={cartCount} onOpenAdmin={() => setAdminOpen(v=>!v)} />

      {/* Showcase uses first product */}
      <Showcase product={products[0]} onAdd={addToCart} onQuick={(p)=>setQuick(p)} />

      <main className="container-inner site-main">
        <section className="panel p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Our Products</h2>
            <div className="text-sm text-gray-500">Showing {Math.max(0, products.length - 1)} items</div>
          </div>

          <div className="grid product-grid-3">
            {products.slice(1).map(p => (
              <ProductCard key={p.id} p={p} onQuick={(pr) => setQuick(pr)} onAdd={(pr) => addToCart(pr)} onEdit={(pr)=>openEditProduct(pr)} />
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <QuickView product={quick} onClose={() => setQuick(null)} onAdd={addToCart} />
      <Cart open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />

      {adminOpen && (
        <div className="fixed bottom-6 right-6 z-60">
          <div className="card p-4 shadow-lg w-72">
            <h4 className="font-semibold mb-2">Admin</h4>
            <div className="text-sm text-gray-600 mb-3">Quick actions</div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => { setEditType("product"); setEditItem(null); setEditOpen(true); }} className="px-3 py-2 border rounded text-sm">Add product</button>
              <button onClick={() => openEditLogo()} className="px-3 py-2 border rounded text-sm">Edit logo</button>
              <button onClick={() => { localStorage.removeItem("godroot_products"); setProducts(SAMPLE_PRODUCTS); }} className="px-3 py-2 border rounded text-sm">Reset products</button>
              <button onClick={() => setAdminOpen(false)} className="px-3 py-2 bg-gray-100 rounded text-sm">Close</button>
            </div>
          </div>
        </div>
      )}

      <EditModal open={editOpen} item={editItem} type={editType} onClose={()=>setEditOpen(false)} onSave={saveEdit} />
    </div>
  );
}
