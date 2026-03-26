import matchRoute from "./utils/matchRoute.js";
import getHashPath from "./utils/getHashPath.js";
import setUpSlider from "./setUp/setUpSlider.js";
import { setUpFilter, setUpFilterItem } from "./setUp/filter.js";
import { setUpSeachBar, setUpSearch } from "./setUp/search.js";
import { setUpSort, setUpSortItem } from "./setUp/sort.js";
import { setUpConstraint } from "./setUp/constraint.js";
import setUpScrollTop from "/assets/js/scroll-top/scroll-top.js";
import {
  setUpProductOptions,
  setUpProductSelection,
} from "./setUp/setUpProductSelection.js";
import setUpBackButton from "./setUp/setUpBackButton.js";
import pageNotFound404 from "./render/pageNotFound404.js";
import setUpPagination from "./setUp/setUpPagination.js";
import closeHeaderMenu from "../header/closeHeaderMenu.js";
import setUpAddToCartOfProdCard from "./setUp/setUpAddToCartOfProdCard.js";

async function render() {
  //<!--=============== AOS INIT ===============-->
  AOS.init();

  closeHeaderMenu();

  const app = document.querySelector("#app");
  const { path, query } = getHashPath();
  const match = matchRoute(path);

  if (!match) {
    app.innerHTML = pageNotFound404();
    return;
  }
  const { html, route } = await match.route.render({
    ...match.params,
    query,
  });

  if (!html) {
    app.innerHTML = pageNotFound404();

    return;
  }

  app.innerHTML = html;
  switch (route) {
    case "PRODUCT_HOME": {
      setUpFilterItem();
      setUpSeachBar();
      setUpSortItem();
      break;
    }
    case "PRODUCT_DETAIL": {
      setUpSlider();
      setUpProductOptions();
      break;
    }
  }

  //<!--=============== AOS INIT ===============-->
  AOS.init();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

window.addEventListener("hashchange", render);

render();

setUpScrollTop();
setUpFilter();
setUpSearch();
setUpSort();
setUpConstraint();
setUpProductSelection();
setUpBackButton();
setUpPagination();
setUpAddToCartOfProdCard();
