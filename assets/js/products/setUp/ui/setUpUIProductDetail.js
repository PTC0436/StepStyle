const setUpUIProductDetail = () => {
  document.querySelectorAll(".product__color").forEach((item) => {
    item.style.backgroundColor = item.dataset.color;
  });
};

export default setUpUIProductDetail;
