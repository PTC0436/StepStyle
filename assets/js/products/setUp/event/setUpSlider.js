//Hàm setUpSlider dùng để khởi tạo slider cho trang chi tiết sản phẩm
//Do slickjs cần dùng jquery

const setUpSlider = () => {
  //SLIDER ẢNH CHÍNH

  $(".slider-for").slick({
    slidesToShow: 1, //Hiển thị 1 ảnh
    slidesToScroll: 1, //Scroll từng ảnh
    arrows: false, //Ẩn nút prev/next
    fade: true, //Hiệu ứng fade giữa các slide
    asNavFor: ".slider-nav", //Liên kết với slider thumbnail
  });

  //SLIDER THUMBNAIL
  $(".slider-nav").slick({
    slidesToShow: 2, //Hiển thị 2 thumbnail
    slidesToScroll: 1,
    asNavFor: ".slider-for", //Liên kết ngược lại với slider chính
    dots: false, //Ẩn dots
    arrows: false,
    centerMode: true, //Slide active nằm giữa
    focusOnSelect: true, //Click thumbnail → đổi slide chính
  });
};

export default setUpSlider;
