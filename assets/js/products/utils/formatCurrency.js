//Chuyển số thành chuỗi theo dạng ở VN
//Ví dụ: 1000000 thành 1.000.000

const formatCurrency = (number) => {
  return Number(number).toLocaleString("vi-VN");
};

export default formatCurrency;
