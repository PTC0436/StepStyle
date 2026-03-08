// register.js
document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.querySelector("form");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Lấy giá trị từ các input
    const fullName = document.getElementById("userName").value.trim();
    const email = document.getElementById("Email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("repassworc").value;
    const address = document.getElementById("address").value.trim();

    // Kiểm tra các trường không được để trống
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Kiểm tra email hợp lệ
    if (!isValidEmail(email)) {
      alert("Email không hợp lệ!");
      return;
    }

    // Kiểm tra mật khẩu đủ mạnh
    if (password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    // Kiểm tra mật khẩu nhập lại khớp
    if (password !== confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    // Lấy danh sách users từ localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra email đã tồn tại chưa
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      alert("Email đã được đăng ký!");
      return;
    }

    // Tạo user mới
    const newUser = {
      id: Date.now(),
      fullName: fullName,
      email: email,
      password: password,
      address: address,
      createdAt: new Date().toISOString(),
    };

    // Thêm user
    users.push(newUser);

    // Lưu vào localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");

    // Chuyển hướng
    window.location.href = "../login/login.html";
  });

  // Hàm kiểm tra email hợp lệ
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
