import addToCart from "../../utils/addToCart.js";
import formatCurrency from "../../utils/formatCurrency.js";
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
          confirmButtonColor: "hsl(350, 88%, 68%)",
          confirmButtonText: "Đóng",
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
          confirmButtonColor: "hsl(350, 88%, 68%)",
          confirmButtonText: "Đóng",
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
        title: "Đã thêm vào giỏ!",
        icon: "success",
        html: `
          <ul class="p-0 m-0">
            <li><b>${name}</b></li>
            <li><b>Màu: </b>${colorChosen}</li>
            <li><b>Size: </b>${sizeChosen}</li>
            <li><b>Số lượng: </b>${quantity}</li>
          </ul>
        `,
        confirmButtonColor: "hsl(350, 88%, 68%)",
        confirmButtonText: "Đóng",
        timer: 4000,
        timerProgressBar: true,
      });
    }

    //XỬ LÝ BUY NOW
    const buy = e.target.closest(".product__action.buy-now");
    if (buy) {
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
          confirmButtonColor: "hsl(350, 88%, 68%)",
          confirmButtonText: "Đóng",
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
          confirmButtonColor: "hsl(350, 88%, 68%)",
          confirmButtonText: "Đóng",
        });
        return;
      }

      //Lấy các thông tin khác

      //Tên sản phẩm
      const name = document.querySelector(".product__name")?.innerHTML;

      //Giá sản phẩm
      const price = document
        .querySelector(".product__price--current")
        ?.innerHTML.replace(/\./g, ""); //Bỏ các dấu chấm

      //Số lượng sản phẩm
      const quantity = Number(
        document.querySelector(".product__quantity-content")?.innerHTML,
      );

      Swal.fire({
        title: "Cảm ơn đã đặt hàng!",
        icon: "success",
        html: `
          <div class="buy-now-alert">
            <h3 class="buy-now-alert__title">Đơn hàng:</h3>
            <div class="buy-now-alert__content">
              <p class="buy-now-alert__name"><b>Sản phẩm: </b>${name}</p>
              <p class="buy-now-alert__color"><b>Màu: </b>${colorChosen}</p>
              <p class="buy-now-alert__size"><b>Size: </b>${sizeChosen}</p>
              <p class="buy-now-alert__price"><b>Đơn giá: </b>${formatCurrency(price)} VND</p>
              <p class="buy-now-alert__quantity"><b>Số lượng: </b>${quantity}</p>
              <p class="buy-now-alert__total fs-3"><b>Thành tiền: </b>${formatCurrency(Number(price) * quantity)} VND</p>
            </div>
            <h3 class="buy-now-alert__callback">Chúng tôi sẽ liên hệ với bạn trong vòng 24h để xác nhận đơn hàng!</h3>
          </div>
        `,
        showCloseButton: true,
        confirmButtonColor: "hsl(350, 88%, 68%)",
        confirmButtonText: "Đóng",
      });
    }
  });
};

export default setUpProductDetail;
