const checkEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const setUpFooterSubscribe = () => {
  const subscribe = document.querySelector("#subscribe");
  if (!subscribe) return;

  subscribe.addEventListener("click", (e) => {
    e.preventDefault();
    const input = document.querySelector("[name='subscribeEmail']");
    if (!input || !input.value) {
      Swal.fire({
        icon: "error",
        title: "Vui lòng nhập email!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (checkEmail(input.value)) {
      Swal.fire({
        icon: "success",
        title: "Cảm ơn đã đăng kí",
        text: "Khi có khuyến mãi, chúng tôi sẽ gửi cho bạn trong thời gian sớm nhất!",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Email không hợp lệ!",
        text: "Vui lòng nhập lại!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
};

setUpFooterSubscribe();
