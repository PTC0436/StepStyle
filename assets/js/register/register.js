import { api } from "../utils/request";

// register.js
document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.querySelector("form");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Lấy giá trị từ các input
    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("Email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("repassword").value;
    const address = document.getElementById("address").value.trim();

    // Kiểm tra các trường không được để trống
    if (!name || !email || !password || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Kiểm tra email hợp lệ
    if (!isValidEmail(email)) {
      alert("Email không hợp lệ!");
      return;
    }

    // Kiểm tra mật khẩu đủ mạnh
    if (isValidPassword(password)) {
      alert(
        "Password phải tối thiểu 8 ký tự, chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt",
      );
      return;
    }

    // Kiểm tra mật khẩu nhập lại khớp
    if (password !== confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    const res = await api.post("/api/auth/register", {
      name,
      email,
      password,
      address,
    });

    console.log(res);
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
