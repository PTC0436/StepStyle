const cartList = document.getElementById("cartList");
const subtotalAmount = document.getElementById("subtotalAmount");
const totalAmount = document.getElementById("totalAmount");
const checkoutBtn = document.querySelector(".checkout-btn");

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function formatMoney(number) {
  return Number(number).toLocaleString("vi-VN") + "đ";
}

function updateSummary() {
  const cart = getCart();

  let subtotal = 0;

  cart.forEach((item) => {
    if (item.selected) {
      subtotal += Number(item.price) * Number(item.quantity);
    }
  });

  subtotalAmount.textContent = formatMoney(subtotal);
  totalAmount.textContent = formatMoney(subtotal);

  if (checkoutBtn) {
    checkoutBtn.disabled = subtotal === 0;
    checkoutBtn.style.opacity = subtotal === 0 ? "0.6" : "1";
    checkoutBtn.style.cursor = subtotal === 0 ? "not-allowed" : "pointer";
  }
}

function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = `<p class="empty-cart">Giỏ hàng đang trống.</p>`;
    updateSummary();
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <label class="item-check">
        <input type="checkbox" class="item-checkbox" ${
          item.selected ? "checked" : ""
        }>
        <span class="checkmark"></span>
      </label>

      <img class="cart-image" src="${item.thumbnail}" alt="${item.name}" />

      <div class="cart-info">
        <div class="cart-label">Sản phẩm</div>
        <h3>${item.name}</h3>
        <p>${item.category || "Giày nam"}</p>
      </div>

      <div class="qty-wrap">
        <div class="cart-label">Số lượng</div>
        <div class="qty-box">
          <button class="qty-btn btn-minus">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="qty-btn btn-plus">+</button>
        </div>
      </div>

      <div class="price-wrap">
        <div class="cart-label">Giá</div>
        <div class="price-text">${formatMoney(item.price)}</div>
      </div>

      <div class="remove-wrap">
        <button class="remove-btn btn-remove">×</button>
      </div>
    `;

    const btnPlus = cartItem.querySelector(".btn-plus");
    const btnMinus = cartItem.querySelector(".btn-minus");
    const btnRemove = cartItem.querySelector(".btn-remove");
    const itemCheckbox = cartItem.querySelector(".item-checkbox");

    itemCheckbox.addEventListener("change", () => {
      const newCart = getCart();
      newCart[index].selected = itemCheckbox.checked;
      saveCart(newCart);
      updateSummary();
    });

    btnPlus.addEventListener("click", () => {
      const newCart = getCart();
      newCart[index].quantity += 1;
      saveCart(newCart);
      renderCart();
    });

    btnMinus.addEventListener("click", () => {
      const newCart = getCart();
      if (newCart[index].quantity > 1) {
        newCart[index].quantity -= 1;
        saveCart(newCart);
        renderCart();
      }
    });

    btnRemove.addEventListener("click", () => {
      const newCart = getCart();
      newCart.splice(index, 1);
      saveCart(newCart);
      renderCart();
    });

    cartList.appendChild(cartItem);
  });

  updateSummary();
}

function initSelectedState() {
  const cart = getCart().map((item) => ({
    ...item,
    selected: item.selected ?? false,
  }));
  saveCart(cart);
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    const cart = getCart();
    const selectedItems = cart.filter((item) => item.selected);

    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất 1 sản phẩm để thanh toán.");
      return;
    }

    console.log("Sản phẩm được thanh toán:", selectedItems);
    alert(`Bạn đang thanh toán ${selectedItems.length} sản phẩm.`);
  });
}

initSelectedState();
renderCart();
