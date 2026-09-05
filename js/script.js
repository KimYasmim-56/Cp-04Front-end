
const products = [
    { id: 1, name: "Camiseta Organic Essential", category: "Roupas", price: 89.90, old: 109.90, material: "Algodão orgânico", sizes: ["PP", "P", "M", "G", "GG"], image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80", desc: "Camiseta confortável produzida com algodão orgânico, perfeita para looks básicos e conscientes." },
    { id: 2, name: "Cropped Eco Basic", category: "Roupas", price: 69.90, old: 79.90, material: "Algodão orgânico", sizes: ["PP", "P", "M", "G"], image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=80", desc: "Cropped minimalista para composições modernas e versáteis." },
    { id: 3, name: "Moletom Reuse", category: "Roupas", price: 179.90, old: 219.90, material: "Fibra reciclada", sizes: ["P", "M", "G", "GG"], image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80", desc: "Moletom macio e quentinho feito com fibras recicladas." },
    { id: 4, name: "Calça Wide Leg Natural", category: "Roupas", price: 159.90, old: 189.90, material: "Linho", sizes: ["36", "38", "40", "42"], image: "https://images.unsplash.com/photo-1506629905607-d9c297d4b3e1?auto=format&fit=crop&w=900&q=80", desc: "Modelagem wide leg confortável, com visual elegante e natural." },
    { id: 5, name: "Camisa Linho Verde", category: "Roupas", price: 129.90, old: 149.90, material: "Linho", sizes: ["P", "M", "G", "GG"], image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80", desc: "Camisa leve de linho para dias quentes e produções sofisticadas." },
    { id: 6, name: "EcoBag Premium", category: "Acessórios", price: 79.90, old: 99.90, material: "Algodão reciclado", sizes: [], image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80", desc: "Bolsa reutilizável resistente para substituir sacolas descartáveis com estilo." },
    { id: 7, name: "Boné Recycled", category: "Acessórios", price: 59.90, old: 69.90, material: "PET reciclado", sizes: ["Único"], image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80", desc: "Boné casual produzido com tecido reciclado." },
    { id: 8, name: "Carteira Eco Leather", category: "Acessórios", price: 69.90, old: 89.90, material: "Material vegetal", sizes: ["Único"], image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80", desc: "Carteira compacta com acabamento elegante e material de origem vegetal." },
    { id: 9, name: "Colar Minimal Nature", category: "Acessórios", price: 49.90, old: 59.90, material: "Aço reciclado", sizes: ["Único"], image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80", desc: "Colar delicado para completar looks minimalistas." },
    { id: 10, name: "Óculos Recycled Wood", category: "Acessórios", price: 119.90, old: 149.90, material: "Madeira reaproveitada", sizes: ["Único"], image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80", desc: "Óculos com design contemporâneo e materiais reaproveitados." }
];

const money = v => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const getCart = () => JSON.parse(localStorage.getItem("ecotrend-cart") || "[]");
const saveCart = c => { localStorage.setItem("ecotrend-cart", JSON.stringify(c)); updateCartCount() };
function updateCartCount() {
    const n = getCart().reduce((s, i) => s + i.qty, 0);
    document.querySelectorAll(".cart-count").forEach(e => e.textContent = n);
}
function addToCart(id, qty = 1) {
    const p = products.find(x => x.id == id); if (!p) return;
    const c = getCart(), item = c.find(x => x.id == id);
    item ? item.qty += qty : c.push({ id: p.id, qty });
    saveCart(c); showToast(`${p.name} foi adicionado ao carrinho!`);
}
function removeFromCart(id) { saveCart(getCart().filter(x => x.id != id)); renderCart() }
function changeQty(id, d) {
    const c = getCart(), item = c.find(x => x.id == id);
    if (!item) return;
    item.qty += d; if (item.qty <= 0) return removeFromCart(id);
    saveCart(c); renderCart();
}
function showToast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.querySelector(".toast-body").textContent = msg;
    bootstrap.Toast.getOrCreateInstance(el).show();
}
function productCard(p) {
    return `<div class="col-12 col-sm-6 col-lg-4">
 <div class="product-card">
 <div class="position-relative"><img src="${p.image}" class="product-img" alt="${p.name}">
 <span class="badge badge-eco position-absolute top-0 start-0 m-3">ECO</span>
 <button class="icon-btn position-absolute top-0 end-0 m-3" onclick="toggleFavorite(${p.id},this)" aria-label="Favoritar"><i class="fa-regular fa-heart"></i></button></div>
 <div class="product-body"><small class="text-secondary">${p.category}</small>
 <a href="produto.html?id=${p.id}" class="product-name d-block mt-1">${p.name}</a>
 <div class="mt-2"><span class="old-price">${money(p.old)}</span><span class="price">${money(p.price)}</span></div>
 <button class="btn btn-eco w-100 mt-3" onclick="addToCart(${p.id})"><i class="fa-solid fa-cart-plus me-2"></i>Adicionar ao carrinho</button>
 </div></div></div>`;
}
function toggleFavorite(id, btn) {
    let f = JSON.parse(localStorage.getItem("ecotrend-fav") || "[]");
    f.includes(id) ? f = f.filter(x => x != id) : f.push(id);
    localStorage.setItem("ecotrend-fav", JSON.stringify(f));
    btn.querySelector("i").className = f.includes(id) ? "fa-solid fa-heart" : "fa-regular fa-heart";
}
function renderProducts(list = products, target = "product-list") { const el = document.getElementById(target); if (el) el.innerHTML = list.map(productCard).join("") }
function initFilters() {
    const target = document.getElementById("product-list"); if (!target) return;
    const apply = () => {
        let list = [...products];
        const search = (document.getElementById("searchProduct")?.value || "").toLowerCase();
        const cat = document.getElementById("categoryFilter")?.value || "Todas";
        const mat = document.getElementById("materialFilter")?.value || "Todos";
        const max = Number(document.getElementById("priceFilter")?.value || 9999);
        list = list.filter(p => (p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search)) && (cat === "Todas" || p.category === cat) && (mat === "Todos" || p.material === mat) && p.price <= max);
        renderProducts(list);
        const c = document.getElementById("resultCount"); if (c) c.textContent = `${list.length} produto(s) encontrado(s)`;
    };
    ["searchProduct", "categoryFilter", "materialFilter", "priceFilter"].forEach(id => document.getElementById(id)?.addEventListener("input", apply));
    apply();
}
function renderCart() {
    const el = document.getElementById("cart-items"); if (!el) return;
    const c = getCart();
    if (!c.length) { el.innerHTML = `<div class="empty"><i class="bi bi-bag fs-1 text-success"></i><h3 class="mt-3">Seu carrinho está vazio</h3><p class="text-secondary">Que tal conhecer nossos produtos sustentáveis?</p><a href="produtos.html" class="btn btn-eco">Ver produtos</a></div>`; document.getElementById("cart-summary").innerHTML = ""; return }
    let subtotal = 0;
    el.innerHTML = c.map(i => {
        const p = products.find(x => x.id == i.id); const total = p.price * i.qty; subtotal += total;
        return `<div class="cart-item mb-3 d-flex gap-3 align-items-center">
   <img src="${p.image}" class="cart-img" alt="${p.name}">
   <div class="flex-grow-1"><a href="produto.html?id=${p.id}" class="fw-bold">${p.name}</a><div class="text-secondary small">${p.material}</div><div class="price mt-2">${money(p.price)}</div></div>
   <div class="text-center"><div class="quantity"><button onclick="changeQty(${p.id},-1)">−</button><span>${i.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div><button class="btn btn-sm text-danger mt-2" onclick="removeFromCart(${p.id})">Remover</button></div>
  </div>`;
    }).join("");
    const frete = subtotal >= 200 ? 0 : 15, total = subtotal + frete;
    document.getElementById("cart-summary").innerHTML = `<div class="feature"><h5 class="fw-bold">Resumo do pedido</h5><div class="d-flex justify-content-between mt-3"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><div class="d-flex justify-content-between mt-2"><span>Frete</span><strong>${frete ? money(frete) : "Grátis"}</strong></div><hr><div class="d-flex justify-content-between fs-5"><strong>Total</strong><strong class="price">${money(total)}</strong></div><button class="btn btn-eco w-100 mt-3" onclick="finishPurchase()">Finalizar compra</button><small class="text-secondary d-block mt-2">*Protótipo acadêmico: pagamento simulado.</small></div>`;
}
function finishPurchase() {
    if (!getCart().length) return;
    localStorage.removeItem("ecotrend-cart"); updateCartCount(); renderCart(); showToast("Pedido simulado realizado com sucesso! 🌱");
}
function initProduct() {
    const el = document.getElementById("product-detail"); if (!el) return;
    const id = new URLSearchParams(location.search).get("id") || 1, p = products.find(x => x.id == id) || products[0];
    el.innerHTML = `<div class="row g-5 align-items-center">
 <div class="col-lg-6"><img src="${p.image}" class="product-detail-img" alt="${p.name}"></div>
 <div class="col-lg-6"><span class="badge badge-eco mb-3">PRODUTO SUSTENTÁVEL</span><h1 class="fw-bold">${p.name}</h1>
 <div class="text-warning mb-3">★★★★★ <span class="text-secondary ms-2">4,8/5</span></div>
 <div class="mb-3"><span class="old-price">${money(p.old)}</span><span class="price fs-3">${money(p.price)}</span></div>
 <p class="text-secondary">${p.desc}</p><hr>
 <strong>Tamanho</strong><div class="d-flex gap-2 my-3 flex-wrap">${(p.sizes.length ? p.sizes : ["Único"]).map(s => `<button class="btn btn-outline-secondary size-btn">${s}</button>`).join("")}</div>
 <strong>Material</strong><p class="mt-2 text-secondary">${p.material}</p>
 <div class="d-flex gap-3 align-items-center mt-4"><div class="quantity"><button id="minus">−</button><span id="qty">1</span><button id="plus">+</button></div><button class="btn btn-eco flex-grow-1" id="addDetail"><i class="fa-solid fa-cart-plus me-2"></i>Adicionar ao carrinho</button></div>
 <div class="mt-4 small text-secondary"><div><i class="bi bi-box-seam me-2"></i>Embalagem reciclável</div><div><i class="bi bi-truck me-2"></i>Envio para todo o Brasil</div><div><i class="bi bi-arrow-repeat me-2"></i>Troca em até 30 dias</div></div>
 </div></div>`;
    let q = 1; document.getElementById("plus").onclick = () => { q++; document.getElementById("qty").textContent = q }; document.getElementById("minus").onclick = () => { if (q > 1) q--; document.getElementById("qty").textContent = q }; document.getElementById("addDetail").onclick = () => addToCart(p.id, q);
}
function initTheme() {
    const saved = localStorage.getItem("ecotrend-theme"); if (saved === "dark") document.body.classList.add("dark");
    document.querySelectorAll(".theme-toggle").forEach(b => b.onclick = () => { document.body.classList.toggle("dark"); localStorage.setItem("ecotrend-theme", document.body.classList.contains("dark") ? "dark" : "light") });
}
document.addEventListener("DOMContentLoaded", () => { updateCartCount(); initTheme(); initFilters(); renderCart(); initProduct(); renderProducts(products.slice(0, 6), "featured-list"); });
function showToast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.querySelector(".toast-body").textContent = msg;
    bootstrap.Toast.getOrCreateInstance(el).show();
}