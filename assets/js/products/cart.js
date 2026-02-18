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