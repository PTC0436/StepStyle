const setUpLogoutBtn = () => {
  const logout = document.querySelector(".nav__user-logout");
  if (!logout) return;
  logout.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    alert("Đã đăng xuất!");

    window.location.reload();
  });
};

export default setUpLogoutBtn;
