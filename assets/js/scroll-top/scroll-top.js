function setUpScrollTop() {
  document.addEventListener("click", (e) => {
    const btnScrollTop = e.target.closest(".scroll-top");
    if (!btnScrollTop) return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

setUpScrollTop();

export default setUpScrollTop;
