import { getProductById } from "../../services/productsAPI.js";
import addToCartModalSkeleton from "../../render/addToCartModalSkeleton.js";
import addToCartModal from "../../render/addToCartModal.js";
import setUpAddToCartModal from "./setUpAddToCartModal.js";
import setUpUIAddToCartModal from "../ui/setUpUIAddToCartModal.js";

//Hàm setUpAddToCartOfProdCard dùng để xử lý sự kiện "Add to Cart"
//từ các product card và hiển thị modal tương ứng
const setUpAddToCartOfProdCard = () => {
  //Event delegation cho các nút add trong product card
  document.addEventListener("click", async (e) => {
    //Kiểm tra click có phải vào nút add không
    const addBtn = e.target.closest(".prod__card .prod__add");
    if (!addBtn) return;

    //Tìm đến phần content của modal
    const addModelContent = document.querySelector(
      "#addToCartModal .modal-content",
    );

    //Hiển thị skeleton trước khi có dữ liệu
    addModelContent.innerHTML = addToCartModalSkeleton();

    //Gọi API lấy dữ liệu
    try {
      const shoes = await getProductById(addBtn.dataset.id);
      addModelContent.innerHTML = addToCartModal(shoes);

      //Hiển thị giao diện với dữ liệu vừa nhận
      addModelContent.innerHTML = addToCartModal(shoes);

      //Set up lại UI
      setUpUIAddToCartModal();
    } catch (err) {
      addModelContent.innerHTML = "<p>Lỗi tải sản phẩm</p>";
    }
  });

  //Setup logic xử lý bên trong modal (add to cart, chọn màu, size,...)
  //Chỉ cần gọi 1 lần do dùng event delegation
  setUpAddToCartModal();
};

export default setUpAddToCartOfProdCard;
