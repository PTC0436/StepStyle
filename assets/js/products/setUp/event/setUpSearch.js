import getHashPath from "../../utils/getHashPath.js";
import changeSearch from "../../setUp/changeSearch.js";

//Hàm setUpSearch dùng để xử lý chức năng tìm kiếm sản phẩm

const setUpSearch = () => {
  document.addEventListener("click", (e) => {
    //Kiểm tra click vào nút submit của form search
    const btnSubmit = e.target.closest(".products__search button[type=submit]");
    if (btnSubmit) {
      e.preventDefault();

      //Lấy input search
      const search = document.getElementById("search");
      if (!search) return;

      //Lấy query hiện tại từ URL
      const { query } = getHashPath();

      //Nếu giá trị search không đổi thì không cần update
      if (search.value === query.get("search")) return;

      //Cập nhật search
      changeSearch(search.value);
    }
  });
};

export default setUpSearch;
