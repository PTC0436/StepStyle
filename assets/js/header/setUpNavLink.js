const setUpNavLink = () => {
  const path = window.location.pathname;
  // console.log(path);
  if (path == "/pages/products.html") {
    document
      .querySelector(`.nav__link:has([href="${path}"])`)
      ?.classList.add("nav__link--active");
  } else
    document
      .querySelector(`.nav__link[href="${path}"]`)
      ?.classList.add("nav__link--active");
};
export default setUpNavLink;
