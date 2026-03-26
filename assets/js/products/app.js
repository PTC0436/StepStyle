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

const render = async () => {
  //<!--=============== AOS INIT ===============-->
  AOS.init();

  //Đóng header menu phòng trường hợp người dùng chuyển trang khi header menu đang mở
  closeHeaderMenu();

  //Lấy element chính chứa toàn bộ nọi dung trang trừ header và footer
  const app = document.querySelector("#app");

  /*
  Hàm getHashPath() dùng để tách phần hash URL(phần sau kí tự '#') thành:
  - path: định tuyến trang (route)
  - query: các tham số lọc (dạng URLSearchParams)

  Ví dụ 1 (trang danh sách sản phẩm):
  URL: http://127.0.0.1:3000/pages/products.html#/?brand=Converse&page=1&priceMin=1000000&priceMax=2000000
    path = "/" (đi đến trang list sản phẩm)
    query = URLSearchParams("brand=Converse&page=1&priceMin=1000000&priceMax=2000000") (dùng để lọc các sản phẩm hiển thị)

  Ví dụ 2 (trang chi tiết sản phẩm):
  URL: http://127.0.0.1:3000/pages/products.html#/69b9483d557ba1976ca07474
    path = "/69b9483d557ba1976ca07474" (đi đến chi tiết sp có id 69b9483d557ba1976ca07474)
    query = URLSearchParams("")
  */

  const { path, query } = getHashPath();

  //Kím  route phù hợp với path trên
  const match = matchRoute(path);

  //Không có thì chèn html của hàm pageNotFound404() trả về vào app
  if (!match) {
    app.innerHTML = pageNotFound404();
    return;
  }

  //Có thì gọi đến hàm render của route đó (có thể xem ở utils/routes.js) rồi nhận về đoạn html và route đó là gì
  const { html, route } = await match.route.render({
    ...match.params,
    query,
  });

  //Nếu không có html thì chèn html của hàm pageNotFound404() trả về vào app
  if (!html) {
    app.innerHTML = pageNotFound404();
    return;
  }

  //Nếu có thì chèn html vào app
  app.innerHTML = html;

  //Route khác nhau thì có một vài hàm phải gọi lại theo từng route
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
  //Khởi tạo lại hiệu ứng
  AOS.init();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

//Gán sự kiện cho window thì link url có phần sau '#' thay đổi thì gọi lại render
window.addEventListener("hashchange", render);

//Gọi render lần đầu khi vào web
render();

// Gọi các hàm setup. Đây là các hàm dùng để gắn sự kiện vào document nên chỉ cần gọi một lần mỗi khi reload trang.

/*
Trong trang products, nhiều phần tử HTML được render động nên cấu trúc DOM có thể thay đổi.
Nếu gắn sự kiện trực tiếp vào một phần tử cụ thể, khi DOM bị cập nhật thì phần tử đó có thể bị thay thế,
dẫn đến việc mất event listener.

Để giải quyết vấn đề này, em sử dụng kỹ thuật "Event Delegation" bằng cách gắn sự kiện lên phần tử cha (document).
Khi xảy ra sự kiện, em kiểm tra phần tử con được click thông qua e.target.closest().

Ví dụ:
document.addEventListener("click", (e) => {
  const element = e.target.closest("selector");

  if (element) {
    // Thực hiện xử lý khi click đúng phần tử cần quản lý
  }
});
*/

//Các hàm bên dưới được cố ý đặt tên đúng công dụng của nó.
//Để xem chi tiết các hàm bên dưới thầy vui lòng vào file tương ứng để xem
setUpScrollTop();
setUpFilter();
setUpSearch();
setUpSort();
setUpConstraint();
setUpProductSelection();
setUpBackButton();
setUpPagination();
setUpAddToCartOfProdCard();
