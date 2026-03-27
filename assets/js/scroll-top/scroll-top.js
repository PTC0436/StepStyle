import scrollTop from "../utils/scrollTop.js";

const setUpScrollTop = () => {
  document.addEventListener("click", (e) => {
    const btnScrollTop = e.target.closest(".scroll-top");
    if (!btnScrollTop) return;
    scrollTop();
  });
};

setUpScrollTop();

export default setUpScrollTop;
