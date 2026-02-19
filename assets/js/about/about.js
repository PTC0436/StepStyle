document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".slides img");

  if (images.length === 0) {
    console.log("Khong tim thay image");
    return;
  }

  let index = 0;

  images.forEach((img) => img.classList.remove("active"));
  images[index].classList.add("active");

  setInterval(() => {
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
  }, 2000);
});
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".slides2 img");

  if (images.length === 0) {
    console.log("Khong tim thay image");
    return;
  }

  let index = 0;

  images.forEach((img) => img.classList.remove("active"));
  images[index].classList.add("active");

  setInterval(() => {
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
  }, 2000);
});
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".slides3 img");

  if (images.length === 0) {
    console.log("Khong tim thay image");
    return;
  }

  let index = 0;

  images.forEach((img) => img.classList.remove("active"));
  images[index].classList.add("active");

  setInterval(() => {
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
  }, 2000);
});
