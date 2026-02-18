// =======================
// BASE PATH (quan trọng)
// Bạn đang chạy: http://127.0.0.1:5500/test/index.html
// => base path = "/test"
// =======================
const BASE_PATH = "/test";

// =======================
// Fake DB
// =======================
const PRODUCTS = [
  { id: 1, name: "Táo đỏ", price: 12000, category: "Fruit", desc: "Táo đỏ giòn ngon" },
  { id: 2, name: "Cam sành", price: 18000, category: "Fruit", desc: "Cam ngọt tự nhiên" },
  { id: 3, name: "Chuối", price: 9000, category: "Fruit", desc: "Chuối chín thơm" },
  { id: 4, name: "Cà rốt", price: 15000, category: "Vegetable", desc: "Cà rốt tươi" },
  { id: 5, name: "Khoai tây", price: 22000, category: "Vegetable", desc: "Khoai tây bùi" },
  { id: 6, name: "Hạnh nhân", price: 55000, category: "Nut", desc: "Hạt dinh dưỡng" },
];

// =======================
// Helpers: LocalStorage Cart
// =======================
const CART_KEY = "cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId) {
  const cart = getCart();
  const found = cart.find(item => item.productId == productId);

  if (found) found.qty += 1;
  else cart.push({ productId: Number(productId), qty: 1 });

  setCart(cart);
  alert("Đã thêm vào giỏ hàng!");
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.productId != productId);
  setCart(cart);
}

function updateQty(productId, qty) {
  const cart = getCart();
  const found = cart.find(item => item.productId == productId);
  if (!found) return;

  found.qty = qty;

  if (found.qty <= 0) {
    removeFromCart(productId);
    return;
  }

  setCart(cart);
}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);

  const cartCountEl = document.querySelector("#cartCount");
  if (cartCountEl) cartCountEl.textContent = total;
}

// =======================
// Fake API
// =======================
function apiGetProducts() {
  return new Promise(resolve => setTimeout(() => resolve(PRODUCTS), 150));
}

function apiGetProductById(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve(PRODUCTS.find(p => p.id == id)), 150);
  });
}

// =======================
// Router core
// =======================
const app = document.querySelector("#app");

const routes = [
  { path: "/", render: HomePage },
  { path: "/product/:id", render: ProductDetailPage },
  { path: "/cart", render: CartPage },
];

function pathToRegex(path) {
  return new RegExp("^" + path.replace(/:\w+/g, "([^/]+)") + "$");
}

function getParams(match) {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(m => m[ 1 ]);

  const params = {};
  keys.forEach((key, i) => (params[ key ] = values[ i ]));
  return params;
}

// chuẩn hóa path để match route
function normalizePathname(pathname) {
  // 1) bỏ base path: /test/product/2 -> /product/2
  if (pathname.startsWith(BASE_PATH)) {
    pathname = pathname.slice(BASE_PATH.length);
  }

  // 2) nếu còn rỗng => "/"
  if (pathname === "") pathname = "/";

  // 3) /index.html coi như /
  if (pathname === "/index.html") pathname = "/";

  return pathname;
}

// điều hướng nội bộ
function navigateTo(url) {
  // url có thể là full link hoặc path
  const u = new URL(url, window.location.origin);

  // u.pathname = "/product/2" hoặc "/cart" hoặc "/"
  // push thành "/test/product/2"
  const finalPath = BASE_PATH + u.pathname;

  history.pushState(null, null, finalPath);
  router();
}

async function router() {
  let pathname = normalizePathname(window.location.pathname);

  const potentialMatches = routes.map(route => ({
    route,
    result: pathname.match(pathToRegex(route.path)),
  }));

  let match = potentialMatches.find(m => m.result !== null);

  if (!match) {
    app.innerHTML = `
      <h1>404 - Không tìm thấy trang</h1>
      <p>Path hiện tại: <b>${pathname}</b></p>
      <a class="btn btn-primary" href="/" data-link>⬅ Về Home</a>
    `;
    return;
  }

  const params = getParams(match);

  app.innerHTML = `<h2>Loading...</h2>`;
  const html = await match.route.render(params);
  app.innerHTML = html;

  bindEventsAfterRender();
}

// =======================
// Pages
// =======================
async function HomePage() {
  const products = await apiGetProducts();
  const categories = [ "All", ...new Set(products.map(p => p.category)) ];

  return `
    <h1>Danh sách sản phẩm</h1>

    <div class="row">
      <input id="searchInput" placeholder="Tìm sản phẩm..." />
      <select id="categorySelect">
        ${categories.map(c => `<option value="${c}">${c}</option>`).join("")}
      </select>
    </div>

    <div id="productsGrid" class="grid">
      ${products.map(renderProductCard).join("")}
    </div>
  `;
}

function renderProductCard(p) {
  return `
    <div class="card">
      <h3>${p.name}</h3>
      <p><b>${p.price.toLocaleString()}đ</b></p>
      <p>Category: ${p.category}</p>

      <div class="row">
        <a class="btn btn-primary" href="/product/${p.id}" data-link>Chi tiết</a>
        <button class="btn" data-add-cart="${p.id}">Add</button>
      </div>
    </div>
  `;
}

async function ProductDetailPage(params) {
  const product = await apiGetProductById(params.id);

  if (!product) {
    return `
      <h1>Không tìm thấy sản phẩm</h1>
      <div class="row">
        <button class="btn" id="backBtn">⬅ Quay lại</button>
        <a class="btn btn-primary" href="/" data-link>Về Home</a>
      </div>
    `;
  }

  return `
    <h1>${product.name}</h1>
    <p><b>Giá:</b> ${product.price.toLocaleString()}đ</p>
    <p><b>Loại:</b> ${product.category}</p>
    <p><b>Mô tả:</b> ${product.desc}</p>

    <div class="row">
      <button class="btn btn-primary" data-add-cart="${product.id}">Add to cart</button>
      <button class="btn" id="backBtn">⬅ Quay lại</button>
      <a class="btn" href="/cart" data-link>🛒 Xem giỏ</a>
    </div>
  `;
}

async function CartPage() {
  const cart = getCart();

  if (cart.length === 0) {
    return `
      <h1>Giỏ hàng</h1>
      <p>Giỏ hàng đang trống 😅</p>
      <a class="btn btn-primary" href="/" data-link>⬅ Mua sắm</a>
    `;
  }

  let total = 0;

  const rows = cart.map(item => {
    const p = PRODUCTS.find(x => x.id == item.productId);
    if (!p) return "";

    const lineTotal = p.price * item.qty;
    total += lineTotal;

    return `
      <div class="card">
        <h3>${p.name}</h3>
        <p>Giá: <b>${p.price.toLocaleString()}đ</b></p>

        <div class="row">
          <button class="btn" data-qty-dec="${p.id}">-</button>
          <b>${item.qty}</b>
          <button class="btn" data-qty-inc="${p.id}">+</button>
        </div>

        <p>Tạm tính: <b>${lineTotal.toLocaleString()}đ</b></p>

        <button class="btn btn-danger" data-remove-cart="${p.id}">Xóa</button>
      </div>
    `;
  }).join("");

  return `
    <h1>Giỏ hàng</h1>
    <div class="grid">${rows}</div>

    <h2>Tổng tiền: ${total.toLocaleString()}đ</h2>

    <div class="row">
      <a class="btn btn-primary" href="/" data-link>⬅ Tiếp tục mua</a>
      <button class="btn btn-danger" id="clearCartBtn">Xóa hết</button>
    </div>
  `;
}

// =======================
// Event binding after render
// =======================
function bindEventsAfterRender() {
  // add cart
  document.querySelectorAll("[data-add-cart]").forEach(btn => {
    btn.onclick = () => addToCart(btn.dataset.addCart);
  });

  // remove cart
  document.querySelectorAll("[data-remove-cart]").forEach(btn => {
    btn.onclick = () => {
      removeFromCart(btn.dataset.removeCart);
      router();
    };
  });

  // qty inc/dec
  document.querySelectorAll("[data-qty-inc]").forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.qtyInc;
      const cart = getCart();
      const found = cart.find(i => i.productId == id);
      if (!found) return;
      updateQty(id, found.qty + 1);
      router();
    };
  });

  document.querySelectorAll("[data-qty-dec]").forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.qtyDec;
      const cart = getCart();
      const found = cart.find(i => i.productId == id);
      if (!found) return;
      updateQty(id, found.qty - 1);
      router();
    };
  });

  // back button (KHÔNG BAO GIỜ 404)
  const backBtn = document.querySelector("#backBtn");
  if (backBtn) {
    backBtn.onclick = () => history.back();
  }

  // clear cart
  const clearCartBtn = document.querySelector("#clearCartBtn");
  if (clearCartBtn) {
    clearCartBtn.onclick = () => {
      setCart([]);
      router();
    };
  }

  // Search + filter (chỉ có ở Home)
  const searchInput = document.querySelector("#searchInput");
  const categorySelect = document.querySelector("#categorySelect");
  const productsGrid = document.querySelector("#productsGrid");

  if (searchInput && categorySelect && productsGrid) {
    const applyFilter = async () => {
      const products = await apiGetProducts();

      const q = searchInput.value.trim().toLowerCase();
      const cat = categorySelect.value;

      const filtered = products.filter(p => {
        const matchName = p.name.toLowerCase().includes(q);
        const matchCat = (cat === "All") ? true : p.category === cat;
        return matchName && matchCat;
      });

      productsGrid.innerHTML = filtered.map(renderProductCard).join("");
      bindEventsAfterRender(); // gắn lại event cho nút Add
    };

    searchInput.oninput = applyFilter;
    categorySelect.onchange = applyFilter;
  }
}

// =======================
// Global listeners
// =======================
window.addEventListener("popstate", router);

// chặn click link nội bộ
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-link]");
  if (!link) return;

  // bỏ qua link ngoài domain
  const url = new URL(link.href, window.location.origin);
  if (url.origin !== window.location.origin) return;

  e.preventDefault();
  navigateTo(link.href);
});

// init
updateCartCount();
router();
