//Mảng chứa các icon sao
const stars = [
  '<i class="ri-star-fill"></i>', //Sao full
  '<i class="ri-star-half-fill"></i>', //Sao một nửa(có nữa bên)
  '<i class="ri-star-line"></i>', //Sao rỗng(chỉ có viền)
];

// Hàm getRatingStars dùng để chuyển đổi điểm rating (0 - 5)
// thành chuỗi HTML hiển thị sao tương ứng
const getRatingStars = (rating) => {
  let temp = rating;

  let result = "";

  //Lặp 5 lần ứng với 5 sao
  for (let i = 0; i < 5; i++) {
    if (temp >= 1) {
      //Nếu temp >= 1 thì thêm 1 sao full rồi giảm temp đi 1
      result += stars[0];
      temp--;
    } else if (temp >= 0.5) {
      //Nếu 0.5 <= temp < 1 thì thêm 1 sao nửa rồi giảm temp đi 0.5
      result += stars[1];
      temp -= 0.5;
    } else result += stars[2]; //Trường hợp còn lại là 0 <= temp < 0.5 nên thêm 1 sao rỗng
  }
  return result;
};

export default getRatingStars;

/*
Ví dụ:
  getRatingStars(3.4) thì ra chuỗi 5 sao gồm 3 sao full và 2 sao rỗng
  getRatingStars(3.5) thì ra chuỗi 5 sao gồm 3 sao full 1 sao nửa và 1 sao rỗng
*/
