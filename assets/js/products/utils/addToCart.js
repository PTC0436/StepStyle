const addToCart = (newItem) => {
  if (!newItem) return;

  // Lấy dữ liệu giỏ hàng từ localStorage, nếu chưa có thì khởi tạo mảng rỗng
  const cart = JSON.parse(localStorage.getItem("cart")) ?? [];

  // Tìm vị trí sản phẩm trùng (cùng id, màu và size)
  const itemIndex = cart.findIndex(
    (item) =>
      item.id === newItem.id &&
      item.colorChosen === newItem.colorChosen &&
      item.sizeChosen === newItem.sizeChosen,
  );

  if (itemIndex === -1) {
    // Nếu chưa tồn tại thì thêm mới sản phẩm vào giỏ hàng
    const newCart = [...cart, newItem];

    // Sắp xếp lại để các sản phẩm cùng loại nằm gần nhau
    localStorage.setItem(
      "cart",
      JSON.stringify(
        newCart.sort((a, b) => {
          const compareId = a.id.localeCompare(b.id);
          return compareId
            ? compareId
            : a.colorChosen?.localeCompare(b.colorChosen);
        }),
      ),
    );
  } else {
    // Nếu đã tồn tại thì tăng số lượng
    cart[itemIndex].quantity += newItem.quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  console.log(JSON.parse(localStorage.getItem("cart")));
};

export default addToCart;
