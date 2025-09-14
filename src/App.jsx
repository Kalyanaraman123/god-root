// src/App.jsx
import React, { useState } from "react";

/* sample products */
const PRODUCTS = [
  { id:1, title:"Teddy bear print pant", price:29900, oldPrice:49900, sizes:["S","M","L","XL"], img:"https://images.unsplash.com/photo-1603575449903-8d8a3f6f4aaf?q=80&w=1200&auto=format&fit=crop" },
  { id:2, title:"Tropical bloom pant", price:33900, oldPrice:59900, sizes:["S","M","L","XL"], img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop" },
  { id:3, title:"Doodle home pant", price:33900, oldPrice:59900, sizes:["S","M","L","XL"], img:"https://images.unsplash.com/photo-1534951009808-7b8a1f55d7b9?q=80&w=1200&auto=format&fit=crop" },
  { id:4, title:"Blue & green pant", price:29900, oldPrice:49900, sizes:["M","L","XL"], img:"https://images.unsplash.com/photo-1520975911163-8a1f4bf7c6f8?q=80&w=1200&auto=format&fit=crop" },
  { id:5, title:"Berry bold pant", price:33900, oldPrice:59900, sizes:["S","M","L","XL"], img:"https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1200&auto=format&fit=crop" },
  { id:6, title:"Black pant", price:29900, oldPrice:49900, sizes:["S","M","L","XL"], img:"https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop" }
];

function Price({ paise }) { return <span className="font-semibold">₹{(paise/100).toFixed(2)}</span>; }

/* Top thin bar: left email, center free shipping */
function TopBar(){
  return (
    <div className="topbar">
      <div className="container inner">
        <div style={{flex:1, textAlign:"left"}}>care@god_root.in</div>
        <div style={{flex:1, textAlign:"center"}}>Free shipping on orders over ₹999</div>
        <div style={{flex:1, textAlign:"right"}}></div>
      </div>
    </div>
  );
}

/* Main header row */
function MainHeader({ cartCount, onOpenCart }){
  return (
    <div className="main-header">
      <div className="container header-grid">
        {/* LEFT: hamburger/menu */}
        <div className="header-left">
          <button className="icon-btn" aria-label="menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
        </div>

        {/* CENTER: brand */}
        <div className="header-center">
          <div className="brand">God Root</div>
        </div>

        {/* RIGHT: search/login/fav/cart */}
        <div className="header-right">
          <button className="icon-btn" aria-label="search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>
          </button>

          <button className="px-3 py-2 text-sm rounded-md" aria-label="login">Login</button>

          <button className="icon-btn" aria-label="favorites" title="Favorites">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M20.8 8.6a5.5 5.5 0 00-7.8-7.8L12 2.6l-1 1-1-1A5.5 5.5 0 002.2 8.6c0 6.8 9.8 11.6 9.8 11.6s9.8-4.8 9.8-11.6z" /></svg>
          </button>

          <button onClick={onOpenCart} className="icon-btn" aria-label="cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4"/><circle cx="9" cy="20" r="1"/><circle cx="20" cy="20" r="1"/></svg>
            {cartCount>0 && <span style={{position:"absolute", top:-8, right:-8, background:"#ef4444", color:"#fff", padding:"2px 6px", borderRadius:999, fontSize:11}}>{cartCount}</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Product card */
function ProductCard({ p, onQuick, onAdd }){
  return (
    <article className="card">
      <div className="ratio-1-1">
        <img src={p.img} alt={p.title} loading="lazy" />
      </div>

      <div className="p">
        <h3 className="text-sm font-semibold">{p.title}</h3>
        <div className="text-xs text-gray-500 mt-1">Sizes: {p.sizes.join(" ")}</div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="old-price text-sm">₹{(p.oldPrice/100).toFixed(2)}</div>
            <div className="text-lg font-bold mt-1"><Price paise={p.price} /></div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
              <span className="swatch" style={{background:"#111827"}} />
              <span className="swatch" style={{background:"#f3f4f6"}} />
              <span className="swatch" style={{background:"#f43f5e"}} />
            </div>
            <div className="flex gap-2 mt-2">
              <button onClick={() => onAdd(p)} className="px-3 py-1 bg-black text-white rounded-md text-sm">Add</button>
              <button onClick={() => onQuick(p)} className="px-3 py-1 border rounded-md text-sm">View</button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* Quick view modal */
function QuickView({ product, onClose, onAdd }){
  const [size, setSize] = useState(product?.sizes?.[0] ?? null);
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 z-10 shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-4">
            <img src={product.img} alt={product.title} className="w-full h-80 object-cover rounded" />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <div className="mt-3">
              <div className="old-price text-sm">₹{(product.oldPrice/100).toFixed(2)}</div>
              <div className="text-2xl font-extrabold">₹{(product.price/100).toFixed(2)}</div>
            </div>

            <div className="mt-5">
              <div className="text-sm text-gray-600 mb-2">Choose size</div>
              <div className="flex gap-2">
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSize(s)} className={`px-3 py-1 border rounded ${size===s ? 'bg-black text-white' : ''}`}>{s}</button>
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

/* Cart drawer (simple) */
function Cart({ open, items, onClose, onRemove }){
  const total = items.reduce((s,it) => s + it.price * it.qty, 0);
  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl transform transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">Your cart</h3>
          <button onClick={onClose}>Close</button>
        </div>

        <div className="p-4 space-y-4 overflow-auto h-[calc(100%-180px)]">
          {items.length===0 ? <div className="text-sm text-gray-500">Cart is empty</div> : items.map((it,i)=>(
            <div key={i} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">{it.title}</div>
                <div className="text-xs text-gray-500">Size: {it.size}</div>
                <div className="text-sm">₹{((it.price * it.qty)/100).toFixed(2)}</div>
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
            <div>₹{(total/100).toFixed(2)}</div>
          </div>
          <div className="mt-4">
            <button className="w-full px-4 py-2 bg-black text-white rounded-md">Checkout</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* MAIN APP */
export default function App(){
  const [products] = useState(PRODUCTS);
  const [quick, setQuick] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  function addToCart(product, size = product.sizes[0]) {
    setCart(prev => {
      const idx = prev.findIndex(x => x.id===product.id && x.size===size);
      if (idx>=0) { const copy=[...prev]; copy[idx].qty += 1; return copy; }
      return [...prev, { id:product.id, title:product.title, price:product.price, size, qty:1 }];
    });
    setCartOpen(true);
  }

  function removeFromCart(item) {
    setCart(prev => prev.filter(x => !(x.id===item.id && x.size===item.size)));
  }

  const cartCount = cart.reduce((s,i)=>s+i.qty,0);

  return (
    <div className="min-h-screen">
      <TopBar />
      <MainHeader cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

      <main className="container py-8">
        <section className="panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Our Products</h2>
            <div className="text-sm text-gray-500">Showing {products.length} items</div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 product-grid">
            {products.map(p => (
              <ProductCard key={p.id} p={p} onQuick={(pr)=>setQuick(pr)} onAdd={(pr)=>addToCart(pr)} />
            ))}
          </div>
        </section>

        <footer className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} God Root • Tiruppur • care@god_root.in
        </footer>
      </main>

      <QuickView product={quick} onClose={() => setQuick(null)} onAdd={addToCart} />
      <Cart open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />
    </div>
  );
}
