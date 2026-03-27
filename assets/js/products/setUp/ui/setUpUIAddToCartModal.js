const setUpUIAddToCartModal = () => {
  document.querySelectorAll(".modal__color")?.forEach((item) => {
    item.style.backgroundColor = item.dataset.color;
  });
};

export default setUpUIAddToCartModal;
