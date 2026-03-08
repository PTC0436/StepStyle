const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(e);
  const email = document.getElementById("Email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Vui lòng nhập email và mật khẩu!");
    return;
  }

  try {
    const res = await fetch(
      "https://stepstyle-api.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );
    const data = await res.json();
    console.log(data);
    console.log(res);

    if (!res.ok) {
      if (res.status === 401) {
        alert("Sai email hoặc password");
      } else {
        alert("Server error");
      }
      return;
    }

    // login thành công
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    window.location.href = "/";
  } catch (err) {
    console.error("Network error:", err);
    alert("Không thể kết nối server");
  }
});
