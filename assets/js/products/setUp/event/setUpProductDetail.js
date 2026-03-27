import addToCart from "../../utils/addToCart.js";
import getIdFromHash from "../../utils/getIdFromHash.js";

const setUpProductDetail = () => {
  document.addEventListener("click", (e) => {
    //XỬ LÝ CHỌN MÀU
    const color = e.target.closest(".product__color");
    if (color) {
      //Nếu chưa active thì tắt active của cái đăng active rồi thêm active vào cái hiện tại
      if (!color.classList.contains("product__color--active")) {
        document
          .querySelector(".product__color--active")
          ?.classList.remove("product__color--active");
        color.classList.add("product__color--active");
      }

      //Nếu đang active thì xóa active
      else {
        color.classList.remove("product__color--active");
      }
    }

    //XỬ LÝ CHỌN SIZE
    const size = e.target.closest(".product__size");
    if (size) {
      //Nếu chưa active thì tắt active của cái đăng active rồi thêm active vào cái hiện tại
      if (!size.classList.contains("product__size--active")) {
        document
          .querySelector(".product__size--active")
          ?.classList.remove("product__size--active");
        size.classList.add("product__size--active");
      }

      //Nếu đang active thì xóa active
      else {
        size.classList.remove("product__size--active");
      }
    }

    //XỬ LÝ SỐ LƯỢNG
    const quantityContent = document.querySelector(
      ".product__quantity-content",
    );

    //Giảm số lượng (min = 1)
    const decrease = e.target.closest(".product__quantity-btn.decrease");
    if (decrease && Number(quantityContent.innerHTML) > 1) {
      quantityContent.innerHTML = Number(quantityContent.innerHTML) - 1;
    }

    //Tăng số lượng (max = data-max)
    const increase = e.target.closest(".product__quantity-btn.increase");
    if (increase && Number(quantityContent.innerHTML) < increase.dataset.max) {
      quantityContent.innerHTML = Number(quantityContent.innerHTML) + 1;
    }

    //XỬ LÝ ADD TO CART
    const add = e.target.closest(".product__action.add");
    if (add) {
      //Lấy màu đã chọn
      const colorChosen = document.querySelector(".product__color--active")
        ?.dataset.colorName;

      //Kiểm tra màu
      if (!colorChosen) {
        Swal.fire({
          icon: "error",
          title: "Vui lòng chọn màu!",
          timer: 2000,
          timerProgressBar: true,
        });
        return;
      }

      //Lấy size đã chọn
      const sizeChosen = document.querySelector(".product__size--active")
        ?.dataset.size;

      //Kiểm tra size
      if (!sizeChosen) {
        Swal.fire({
          icon: "error",
          title: "Vui lòng chọn size!",
          timer: 2000,
          timerProgressBar: true,
        });
        return;
      }

      //Lấy các thông tin khác

      //Tên sản phẩm
      const name = document.querySelector(".product__name")?.innerHTML;

      //Giá sản phẩm
      const price = document
        .querySelector(".product__price--current")
        ?.innerHTML.replace(/\./g, ""); //Bỏ các dấu chấm trong format số của Việt Nam

      //Ảnh bìa sản phẩm
      const thumbnail = document.querySelector("div[data-thumbnail]")?.dataset
        .thumbnail;

      //Số lượng sản phẩm
      const quantity = Number(
        document.querySelector(".product__quantity-content")?.innerHTML,
      );

      //Lấy id sản phẩm
      const id = getIdFromHash();

      //Thêm vào giỏ
      addToCart({
        id,
        name,
        price,
        thumbnail,
        colorChosen,
        sizeChosen,
        quantity,
      });

      //Thông báo thành công
      Swal.fire({
        title: "Đã thêm vào giỏ hàng!",
        icon: "success",
      });
    }
  });
};

export default setUpProductDetail;
