const setUpNavLink = () => {
  const path = window.location.pathname;
  if (path == "/") path = "/index.html";
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
