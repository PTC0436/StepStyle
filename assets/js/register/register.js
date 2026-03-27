import api from "../utils/request.js";

// register.js
document.addEventListener("DOMContentLoaded", async function () {
  const registerForm = document.querySelector("form");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const loading = document.querySelector(".btn-loading");
    loading?.classList.add("btn-loading--shown");

    // Lấy giá trị từ các input
    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("repassword").value;
    const address = document.getElementById("address").value.trim();

    // Kiểm tra các trường không được để trống
    if (!name || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Vui lòng điền đầy đủ thông tin!",
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
      });
      loading?.classList.remove("btn-loading--shown");
      return;
    }

    console.log(name, email, password, confirmPassword, address);

    // Kiểm tra email hợp lệ
    if (!isValidEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Email không hợp lệ!",
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
      });
      loading?.classList.remove("btn-loading--shown");
      return;
    }

    // Kiểm tra mật khẩu đủ mạnh
    if (!isValidPassword(password)) {
      Swal.fire({
        icon: "error",
        title:
          "Password phải tối thiểu 8 ký tự, chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt",
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
      });
      loading?.classList.remove("btn-loading--shown");
      return;
    }

    // Kiểm tra mật khẩu nhập lại khớp
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Mật khẩu nhập lại không khớp!",
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
      });
      loading?.classList.remove("btn-loading--shown");
      return;
    }

    try {
      const res = await api.post("/api/auth/register", {
        name,
        email,
        password,
        address,
      });
      Swal.fire({
        icon: "success",
        title: "Đăng kí thành công!",
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
      }).then(() => (window.location.href = "/pages/login.html"));
    } catch (err) {
      loading?.classList.remove("btn-loading--shown");
      if (err.message === "Email already exists") {
        // alert("Email đã tồn tại");
        Swal.fire({
          title: "Email đã tồn tại!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "hsl(345, 75%, 70%)",
          cancelButtonColor: "hsl(335, 65%, 75%)",
          confirmButtonText: "Đăng nhập",
          cancelButtonText: "Ở lại",
          showCloseButton: true,
          timer: 3000,
          timerProgressBar: true,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/pages/login.html";
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Đăng kí thất bại!",
          text: "Vui lòng thử lại!",
          showCloseButton: true,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    }
  });

  // Hàm kiểm tra email hợp lệ
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function isValidPassword(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
});
