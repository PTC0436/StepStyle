document.addEventListener("DOMContentLoaded", function () {
  function showAlert() {
    alert("Cảm ơn bạn đã quan tâm STEPSTYLE");
  }
  window.showAlert = showAlert;

  let slideIndex = 0;

  const slides = document.querySelector(".slides");
  const images = document.querySelectorAll(".slides img");

  if (!slides || images.length === 0) {
    console.log("Không tìm thấy slider hoặc hình ảnh");
    return;
  }

  function nextSlide() {
    slideIndex++;

    if (slideIndex >= images.length) {
      slideIndex = 0;
    }

    slides.style.transform = `translateX(-${slideIndex * 100}%)`;
  }

  setInterval(nextSlide, 3000);
});
