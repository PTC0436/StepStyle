import getHashPath from "../../utils/getHashPath.js";
import changeSearch from "../changeSearch.js";

const setUpSearch = () => {
  document.addEventListener("click", (e) => {
    const btnSubmit = e.target.closest(".products__search button[type=submit]");
    if (btnSubmit) {
      e.preventDefault();

      const search = document.getElementById("search");
      if (!search) return;

      const { query } = getHashPath();
      if (search.value == query.get("search")) return;

      changeSearch(search.value);
    }
  });
};

export default setUpSearch;
