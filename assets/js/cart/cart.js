import setUpNavCartNotification from "../header/setUpNavCartNotification.js";

const cartList = document.getElementById("cartList");
const subtotalAmount = document.getElementById("subtotalAmount");
const totalAmount = document.getElementById("totalAmount");
const checkoutBtn = document.querySelector(".checkout-btn");
const discountAmount = document.getElementById("discountAmount");
const couponInput = document.getElementById("couponInput");
const applyCouponBtn = document.getElementById("applyCouponBtn");
const couponMessage = document.getElementById("couponMessage");

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

  const discount = Number(localStorage.getItem("discount")) || 0;
  const finalDiscount = subtotal > 0 ? discount : 0;
  const total = subtotal - finalDiscount;

  subtotalAmount.textContent = formatMoney(subtotal);

  if (discountAmount) {
    discountAmount.textContent = formatMoney(finalDiscount);
  }

  totalAmount.textContent = formatMoney(total > 0 ? total : 0);

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
        <div class="cart-variant">
          <span>Màu: ${item.colorChosen}</span>
          <span> | </span>
          <span>Size: ${item.sizeChosen}</span>
          <div><b><span>Thành Tiền: ${formatMoney(item.price * item.quantity)}</span></b></div>
            </div>
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
      setUpNavCartNotification();
    });

    btnMinus.addEventListener("click", () => {
      const newCart = getCart();
      if (newCart[index].quantity > 1) {
        newCart[index].quantity -= 1;
        saveCart(newCart);
        renderCart();
        setUpNavCartNotification();
      }
    });

    btnRemove.addEventListener("click", () => {
      const newCart = getCart();
      newCart.splice(index, 1);
      saveCart(newCart);
      renderCart();
      setUpNavCartNotification();
    });

    cartList.appendChild(cartItem);
  });

  updateSummary();
}

function initSelectedState() {
  const cart = getCart().map((item) => ({
    ...item,
    selected: item.selected ?? true,
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
if (applyCouponBtn) {
  applyCouponBtn.addEventListener("click", () => {
    const code = couponInput.value.trim().toLowerCase();
    let discount = 0;

    if (code === "giam10k") {
      discount = 10000;
      if (couponMessage) {
        couponMessage.textContent = "Áp dụng mã thành công: giảm 10.000đ";
        couponMessage.style.color = "green";
      }
    } else if (code === "giam20k") {
      discount = 20000;
      if (couponMessage) {
        couponMessage.textContent = "Áp dụng mã thành công: giảm 20.000đ";
        couponMessage.style.color = "green";
      }
    } else {
      discount = 0;
      if (couponMessage) {
        couponMessage.textContent = "Mã giảm giá không hợp lệ!";
        couponMessage.style.color = "red";
      }
    }

    localStorage.setItem("discount", discount);
    updateSummary();
  });
}
initSelectedState();
renderCart();
