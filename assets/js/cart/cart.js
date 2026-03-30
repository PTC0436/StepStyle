import setUpNavCartNotification from "../header/setUpNavCartNotification.js";

//Lấy các phần từ HTML cần thiết để thao tác
const cartList = document.getElementById("cartList");
const subtotalAmount = document.getElementById("subtotalAmount");
const totalAmount = document.getElementById("totalAmount");
const checkoutBtn = document.querySelector(".checkout-btn");
const discountAmount = document.getElementById("discountAmount");
const couponInput = document.getElementById("couponInput");
const applyCouponBtn = document.getElementById("applyCouponBtn");
const couponMessage = document.getElementById("couponMessage");
const modal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");

//Lấy và lưu giỏ hàng
//Hàm lấy dữ liệu từ localStorage, nếu không có sẽ trả về mảng rỗng
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

//Lưu dữ liệu vào localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

//Hàm Định dạng tiền
function formatMoney(number) {
  return Number(number).toLocaleString("vi-VN") + "đ";
}

//Hàm cập nhật tổng tiền
function updateSummary() {
  const cart = getCart();

  let subtotal = 0;
  //Chỉ tính tiền các sản phẩm đã được tick chọn
  cart.forEach((item) => {
    if (item.selected) {
      subtotal += Number(item.price) * Number(item.quantity);
    }
  });
  //Lấy mã giảm giá từ localStorage, nếu không có sẽ là 0
  const discount = Number(localStorage.getItem("discount")) || 0;
  const finalDiscount = subtotal > 0 ? discount : 0;
  const total = subtotal - finalDiscount;
  //Hiển thị lên giao diện
  subtotalAmount.textContent = formatMoney(subtotal);

  if (discountAmount) {
    discountAmount.textContent = formatMoney(finalDiscount);
  }

  totalAmount.textContent = formatMoney(total > 0 ? total : 0);
  //Tắt nút thanh toán nếu không có sản phẩm nào được chọn hoặc tổng tiền bằng 0
  if (checkoutBtn) {
    checkoutBtn.disabled = subtotal === 0;
    checkoutBtn.style.opacity = subtotal === 0 ? "0.6" : "1";
    checkoutBtn.style.cursor = subtotal === 0 ? "not-allowed" : "pointer";
  }
}
//Hiển thị giỏ hàng lên giao diện
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = ""; //Xóa nội dung cũ trước khi hiển thị lại
  //Nếu giỏ hàng trống, hiển thị thông báo và cập nhật tổng tiền
  if (cart.length === 0) {
    cartList.innerHTML = `<p class="empty-cart">Giỏ hàng đang trống.</p>`;
    updateSummary();
    return;
  }
  //Duyệt qua từng sản phẩm trong giỏ hàng và tạo phần tử HTML tương ứng
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
    //lấy các nút và checkbox trong phần tử cartItem để thêm sự kiện
    const btnPlus = cartItem.querySelector(".btn-plus");
    const btnMinus = cartItem.querySelector(".btn-minus");
    const btnRemove = cartItem.querySelector(".btn-remove");
    const itemCheckbox = cartItem.querySelector(".item-checkbox");
    //Tick chọn sản phẩm
    itemCheckbox.addEventListener("change", () => {
      const newCart = getCart();
      newCart[index].selected = itemCheckbox.checked; //Cập nhật trạng thái selected của sản phẩm trong giỏ hàng
      saveCart(newCart);
      updateSummary();
    });
    //tăng số lượng sản phẩm
    btnPlus.addEventListener("click", () => {
      const newCart = getCart();
      newCart[index].quantity += 1;
      saveCart(newCart);
      renderCart();
      setUpNavCartNotification();
    });
    //giảm số lượng sản phẩm, nếu số lượng > 1 mới cho giảm
    btnMinus.addEventListener("click", () => {
      const newCart = getCart();
      if (newCart[index].quantity > 1) {
        newCart[index].quantity -= 1;
        saveCart(newCart);
        renderCart();
        setUpNavCartNotification();
      }
    });
    //xóa sản phẩm khỏi giỏ hàng
    btnRemove.addEventListener("click", () => {
      const newCart = getCart();
      newCart.splice(index, 1);
      saveCart(newCart);
      renderCart();
      setUpNavCartNotification();
    });
    //Thêm phần tử cartItem vào danh sách giỏ hàng trên giao diện
    cartList.appendChild(cartItem);
  });

  updateSummary();
}
//Khởi tạo trạng thái selected cho các sản phẩm trong giỏ hàng nếu chưa có
function initSelectedState() {
  const cart = getCart().map((item) => ({
    ...item,
    selected: item.selected ?? true,
  }));
  saveCart(cart);
}
//Xử lý thanh toán
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    const cart = getCart();
    const selectedItems = cart.filter((item) => item.selected);
    //// Kiểm tra lại một lần nữa để đảm bảo người dùng đã chọn ít nhất 1 sản phẩm trước khi thanh toán
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất 1 sản phẩm để thanh toán.");
      return;
    }
    //Xóa các sản phẩm đã được chọn khỏi giỏ hàng, chỉ giữ lại những sản phẩm chưa được chọn
    const remainingCart = cart.filter((item) => !item.selected);
    saveCart(remainingCart);
    //xoá mã giảm giá sau khi thanh toán
    localStorage.removeItem("discount");
    renderCart();
    //Hiển thị modal thông báo thanh toán thành công
    modal.style.display = "flex";
  });
}
//Đóng modal khi người dùng click vào nút đóng hoặc click ra ngoài modal
if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
//Xử lý áp dụng mã giảm giá
if (applyCouponBtn) {
  applyCouponBtn.addEventListener("click", () => {
    const code = couponInput.value.trim().toLowerCase();
    let discount = 0;
    //kiem tra mã giảm giá và cập nhật thông báo tương ứng
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
    //Lưu mã giảm giá vào localStorage để có thể sử dụng khi tính tổng tiền
    localStorage.setItem("discount", discount);
    updateSummary();
  });
}
//Khởi tạo trạng thái selected cho các sản phẩm trong giỏ hàng nếu chưa có và hiển thị giỏ hàng lên giao diện
initSelectedState();
renderCart();
