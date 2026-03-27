//Hàm setUpBackButton dùng để xử lý sự kiện quay lại trang trước cho nút có class btn-back
const setUpBackButton = () => {
  document.addEventListener("click", (e) => {
    //Kiểm tra có click vào nút back không
    const backBtn = e.target.closest(".btn-back");
    if (!backBtn) return;

    //Điều hướng về trang trước đó
    window.history.back();
  });
};

export default setUpBackButton;
