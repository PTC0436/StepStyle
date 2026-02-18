import matchRoute from "/assets/js/products/matchRoute.js";
import getHashPath from "./getHashPath.js";
import setUpSlider from "./setUpSlider.js";
import { setUpFilter, setUpFilterItem } from "./filter.js";
import { setUpSeachBar, setUpSearch } from "./search.js";
import { setUpSort, setUpSortItem } from "./sort.js";
import { setUpConstraint } from "./constraint.js";
import setUpScrollTop from "/assets/js/scroll-top/scroll-top.js";
import {
  setUpProductMain,
  setUpProductMainOptions,
} from "./setUpProductMain.js";
import setUpBackButton from "./setUpBackButton.js";
import { renderPageNotFound404 } from "./products.js";

async function render() {
  const app = document.querySelector("#app");
  const { path, query } = getHashPath();
  const match = matchRoute(path);
  if (!match) {
    app.innerHTML = renderPageNotFound404();
    return;
  }
  const { html, route } = await match.route.render({
    ...match.params,
    query,
  });
  if (!html) {
    app.innerHTML = renderPageNotFound404();
    AOS.init({
      disable: function () {
        return window.innerWidth < 768;
      },
    });

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
      setUpProductMainOptions();
      break;
    }
  }

  //<!--=============== AOS INIT ===============-->
  AOS.init({
    disable: function () {
      return window.innerWidth < 768;
    },
  });

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
setUpProductMain();
setUpBackButton();
