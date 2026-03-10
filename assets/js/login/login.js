import { api, saveAuth } from "../utils/request.js";

const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const loading = document.querySelector(".btn-loading");
  loading?.classList.add("btn-loading--shown");

  const email = document.getElementById("Email").value.trim();
  const password = document.getElementById("password").value;

  console.log(email, password);

  if (!email || !password) {
    Swal.fire({
      icon: "error",
      title: "Vui lòng nhập email và mật khấu!",
      showCloseButton: true,
      timer: 2000,
      timerProgressBar: true,
    });
    loading?.classList.remove("btn-loading--shown");
    return;
  }

  try {
    const res = await api.post("/api/auth/login", { email, password });

    saveAuth(res);

    Swal.fire({
      title: "Đăng nhập thành công!",
      icon: "success",
      showCloseButton: true,
      timer: 2000,
      timerProgressBar: true,
    }).then(() => (window.location.href = "/index.html"));
  } catch (err) {
    loading?.classList.remove("btn-loading--shown");
    if (err.message === "Invalid email or password") {
      Swal.fire({
        icon: "error",
        title: "Email hoặc mật khẩu không đúng!",
        text: "Vui lòng thử lại!",
        showCloseButton: true,
        timer: 2000,
        timerProgressBar: true,
      });
    } else if (err.message === "Unauthorized") {
      Swal.fire({
        title: "Tài khoản không tồn tại!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "hsl(345, 75%, 70%)",
        cancelButtonColor: "hsl(335, 65%, 75%)",
        confirmButtonText: "Đăng kí",
        cancelButtonText: "Ở lại",
        showCloseButton: true,
        timer: 2000,
        timerProgressBar: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/pages/register.html";
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: `${err.message || "Đăng nhập thất bại!"}`,
        text: "Vui lòng thử lại!",
        showCloseButton: true,
        timer: 2000,
        timerProgressBar: true,
      });
    }

    console.error(err);
  }
});
