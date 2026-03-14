import getHashPath from "./getHashPath.js";
import updateQuery from "./updateQuery.js";

const setUpPagination = () => {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".pagination__item");
    if (!btn) return;
    const { query } = getHashPath();
    const curPage = query.get("page") ?? 1;
    if (!curPage || curPage == btn.dataset.page || !btn.dataset.page) return;
    updateQuery({ page: btn.dataset.page });
  });
};

export default setUpPagination;
