document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    let valid = true;

    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("messageError").innerText = "";
    document.getElementById("successMessage").innerText = "";

    if (name === "") {
        document.getElementById("nameError").innerText = "Vui lòng nhập tên";
        valid = false;
    }

    if (email === "") {
        document.getElementById("emailError").innerText = "Vui lòng nhập email";
        valid = false;
    }

    if (message === "") {
        document.getElementById("messageError").innerText = "Vui lòng nhập nội dung";
        valid = false;
    }

    if (valid) {
        document.getElementById("successMessage").innerText = "Gửi thành công!";
        document.getElementById("contactForm").reset();
    }
});
