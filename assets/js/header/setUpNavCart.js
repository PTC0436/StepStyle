const setUpNavCart = () => {
  const cart = document.querySelector(`[data-nav="cart"]`);
  if (!cart) return;
  cart.addEventListener("click", async (e) => {
    e.preventDefault();
    const user = localStorage.getItem("user");
    if (user) {
      window.location.href = "/pages/cart.html";
    } else {
      const result = await Swal.fire({
        icon: "warning",
        title: "Bạn chưa đăng nhập",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Ở lại",
      });

      if (result.isConfirmed) {
        window.location.href = "/pages/login.html";
      }
    }
  });
};

export default setUpNavCart;
