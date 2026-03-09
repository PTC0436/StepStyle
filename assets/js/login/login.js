import { api, saveAuth } from "../utils/request.js";

const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("Email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Vui lòng nhập email và mật khẩu!");
    return;
  }

  try {
    const res = await api.post("/api/auth/login", { email, password });

    saveAuth(res);

    window.location.href = "/index.html";
  } catch (err) {
    if (err.message === "Invalid email or password") {
      alert("Email hoặc mật khẩu không đúng!");
    } else {
      alert(err.message || "Đăng nhập thất bại!");
    }

    console.error(err);
  }
});
