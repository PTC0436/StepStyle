import getHashPath from "./getHashPath.js";
import updateQuery from "./updateQuery.js";

export function handleChangeSearch(newSearch) {
  updateQuery({ search: newSearch });
};

export function setUpSearch() {

  document.addEventListener("click", (e) => {

    const btnSubmit = e.target.closest(".products__search button[type=submit]");
    if (btnSubmit) {
      e.preventDefault();

      const search = document.getElementById("search");
      if (search) handleChangeSearch(search.value);
    }
  });
};

export function setUpSeachBar() {

  const { query } = getHashPath();

  const search = document.getElementById("search");

  if (search) search.value = query.get("search") || "";
}