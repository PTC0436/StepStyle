const closeHeaderMenu = () => {
  const navMenu = document.querySelector(".nav__menu");
  const navToggle = document.querySelector(".nav__toggle");
  navMenu.classList.remove("show-menu");
  navToggle.classList.remove("show-icon");
};

export default closeHeaderMenu;
