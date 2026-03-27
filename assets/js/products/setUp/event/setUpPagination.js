import getHashPath from "../../utils/getHashPath.js";
import updateQuery from "../../utils/updateQuery.js";

//Hàm setUpPagination dùng để xử lý phân trang
const setUpPagination = () => {
  document.addEventListener("click", (e) => {
    //Kiểm tra click có phải vào item pagination không
    const btn = e.target.closest(".pagination__item");
    if (!btn) return;

    //Lấy query hiện tại từ URL
    const { query } = getHashPath();

    //Lấy page hiện tại (mặc định = 1)
    const curPage = query.get("page") ?? 1;

    //Nếu:
    //  không có page hiện tại
    //  hoặc click vào page đang active
    //  hoặc button không có data-page
    //thì không làm gì
    if (!curPage || curPage == btn.dataset.page || !btn.dataset.page) return;

    //Cập nhật page mới vào URL
    updateQuery({ page: btn.dataset.page });
  });
};

export default setUpPagination;
