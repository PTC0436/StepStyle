// Hàm capitalizeWords dùng để viết hoa chữ cái đầu của mỗi từ trong chuỗi
const capitalizeWords = (string) => {
  return string
    .toLowerCase() //Chuyển toàn bộ chuỗi về chữ thường (tránh lỗi chữ hoa lẫn lộn)
    .split(" ") //Tách chuỗi thành mảng các từ dựa trên khoảng trắng
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) //Viết hoa chữ cái đầu của từng từ
    .join(" "); //Ghép lại thành chuỗi hoàn chỉnh
};

export default capitalizeWords;

/*
Ví dụ:
capitalizeWords("nIKE air jORdan")
ra "Nike Air Jordan"
*/
