/* ================= MOBILE MENU ================= */

const navMenu = document.querySelector(".nav__menu");
const navToggle = document.querySelector(".nav__toggle");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show-menu");
  navToggle.classList.toggle("show-icon");
});

/* ================= DROPDOWN CLICK ================= */

const dropdownItems = document.querySelectorAll(".dropdown__item");
const subDropdownItems = document.querySelectorAll(".dropdown__subitem");

dropdownItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    // tránh click lan ra ngoài
    e.stopPropagation();

    // đóng các dropdown khác
    dropdownItems.forEach((i) => {
      if (i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});

subDropdownItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.stopPropagation();

    subDropdownItems.forEach((i) => {
      if (i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});

/* ================= CLICK OUTSIDE TO CLOSE ================= */

document.addEventListener("click", () => {
  dropdownItems.forEach((item) => item.classList.remove("active"));
  subDropdownItems.forEach((item) => item.classList.remove("active"));
});
