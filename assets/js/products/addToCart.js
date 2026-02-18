import Swal from "/test/libs/sweetalert2/sweetalert2.all.min.js";

function addToCart() {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "Đã thêm vào giỏ",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });
}

export default addToCart;
