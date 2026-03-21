import setUpLogoutBtn from "./setUpLogoutBtn.js";
import setUpNavLink from "./setUpNavLink.js";

const setUpHeader = async () => {
  // Kiểm tra user đã đăng nhập chưa
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const login = document.querySelector(`[data-nav="login"]`);
    const register = document.querySelector(`[data-nav="register"]`);

    if (login && register) {
      // Ẩn link đăng nhập và đăng ký
      login.classList.add("nav__link--hidden");
      register.classList.add("nav__link--hidden");

      // Thêm thông tin user và nút đăng xuất

      const navUser = document.querySelector(".nav__user");
      if (navUser) {
        navUser.innerHTML = `
                    <p class="nav__user-greeting">
                      <span>Xin chao, </span>
                      ${user.name}
                    </p>
                    <button class="nav__user-logout">
                      <i class="ri-logout-box-r-line"></i>
                    </button>
                  `;
        navUser.classList.remove("nav__user--hidden");
        setUpLogoutBtn();
      }
    }
  }
  setUpNavLink();
};

export default setUpHeader;
