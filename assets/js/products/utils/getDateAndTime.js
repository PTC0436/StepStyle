// Hàm getDateAndTime dùng để chuyển đổi dữ liệu thời gian
// sang định dạng ngày giờ theo locale Việt Nam
//
// Sử dụng toLocaleString("vi-VN") để hiển thị:
// - Đúng múi giờ local (GMT+7)
// - Định dạng quen thuộc với người dùng Việt Nam

const getDateAndTime = (data) => {
  const date = new Date(data);
  return date.toLocaleString("vi-VN");
};

export default getDateAndTime;

/*
Ví dụ:
getDateAndTime("2026-03-27T10:15:30.000Z")
ra "27/3/2026, 17:15:30"
*/
