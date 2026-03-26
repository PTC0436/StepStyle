const setUpLogoutBtn = () => {
  const logout = document.querySelector(".nav__user-logout");
  if (!logout) return;
  logout.addEventListener("click", () => {
    localStorage.removeItem("user");

    Swal.fire({
      title: "Đăng xuất thành công!",
      icon: "success",
      timer: 3000,
      timerProgressBar: true,
    }).then(() => window.location.reload());
  });
};

export default setUpLogoutBtn;
