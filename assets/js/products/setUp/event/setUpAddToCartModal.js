import addToCart from "../../utils/addToCart.js";

//Hàm setUpAddToCartModal dùng để xử lý toàn bộ logic trong modal "Add to Cart"
const setUpAddToCartModal = () => {
  document.addEventListener("click", (e) => {
    //XỬ LÝ CHỌN MÀU
    const color = e.target.closest("#addToCartModal .modal__color");

    if (color) {
      //Nếu chưa active thì bỏ active cũ và set mới
      if (!color.classList.contains("modal__color--active")) {
        document
          .querySelector(".modal__color--active")
          ?.classList.remove("modal__color--active");
        color.classList.add("modal__color--active");
      }
      //Nếu click lại thì bỏ chọn
      else {
        color.classList.remove("modal__color--active");
      }
    }

    //XỬ LÝ CHỌN SIZE
    const size = e.target.closest("#addToCartModal .modal__size");
    if (size) {
      //Nếu chưa active thì bỏ active cũ và set mới
      if (!size.classList.contains("modal__size--active")) {
        document
          .querySelector(".modal__size--active")
          ?.classList.remove("modal__size--active");
        size.classList.add("modal__size--active");
      }
      //Nếu click lại thì bỏ chọn
      else {
        size.classList.remove("modal__size--active");
      }
    }

    //XỬ LÝ SỐ LƯỢNG
    const quantity = document.querySelector(
      "#addToCartModal .modal__quantity-content",
    );

    //Giảm số lượng (min = 1)
    const decrease = e.target.closest(
      "#addToCartModal .modal__quantity-btn.decrease",
    );
    if (decrease && Number(quantity.textContent) > 1) {
      quantity.textContent = Number(quantity.textContent) - 1;
    }

    //Tăng số lượng (max = data-max)
    const increase = e.target.closest(
      "#addToCartModal .modal__quantity-btn.increase",
    );
    if (
      increase &&
      Number(quantity.textContent) < Number(increase.dataset.max)
    ) {
      quantity.textContent = Number(quantity.textContent) + 1;
    }

    //XỬ LÝ ADD TO CART
    const add = e.target.closest("#addToCartModal .add");
    if (add) {
      //Lấy màu đã chọn
      const colorChosen = document.querySelector(".modal__color--active")
        ?.dataset.colorName;
      //Kiểm tra màu
      if (!colorChosen) {
        Swal.fire({
          icon: "error",
          title: "Vui lòng chọn màu!",
          confirmButtonColor: "hsl(350, 88%, 68%)",
          confirmButtonText: "Đóng",
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }

      //Lấy size đã chọn
      const sizeChosen = document.querySelector(".modal__size--active")?.dataset
        .size;
      //Kiểm tra size
      if (!sizeChosen) {
        Swal.fire({
          icon: "error",
          title: "Vui lòng chọn size!",
          confirmButtonColor: "hsl(350, 88%, 68%)",
          confirmButtonText: "Đóng",
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }

      //Lấy các thông tin khác

      //Tên sản phẩm
      const name = document.querySelector(
        "#addToCartModal .modal-title",
      )?.innerHTML;

      //Giá sản phẩm
      const price = document
        .querySelector("#addToCartModal .modal__price")
        ?.innerHTML.replace(/\./g, ""); //Bỏ dấu chấm trong format tiền Việt

      //Ảnh bìa sản phẩm
      const thumbnail = document
        .querySelector("#addToCartModal .modal__img img")
        ?.getAttribute("src");

      //Số lượng sản phẩm
      const quantity = Number(
        document.querySelector("#addToCartModal .modal__quantity-content")
          ?.innerHTML,
      );

      //Thêm vào giỏ hàng
      addToCart({
        id: add.dataset.id,
        name,
        price,
        thumbnail,
        colorChosen,
        sizeChosen,
        quantity,
      });

      //Tìm modal đó để đóng lại
      const modalEl = document.getElementById("addToCartModal");
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();

      //Thông báo thành công (mẫu của sweetalert2)
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      }).fire({
        icon: "success",
        title: "Đã thêm vào giỏ hàng!",
        html: `
          <ul>
            <li><b>${name}</b></li>
            <li><b>Màu: </b>${colorChosen}</li>
            <li><b>Size: </b>${sizeChosen}</li>
            <li><b>Số lượng: </b>${quantity}</li>
          </ul>
        `,
      });
    }
  });
};

export default setUpAddToCartModal;
