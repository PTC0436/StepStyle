/*
  Hàm getHashPath() dùng để tách phần hash URL(phần sau kí tự '#') thành:
  - path: định tuyến trang (route)
  - query: các tham số lọc (dạng URLSearchParams)

  Ví dụ 1 (trang danh sách sản phẩm):
  URL: https://step-style-six.vercel.app/pages/products.html#/?brand=Converse&page=1&priceMin=1000000&priceMax=2000000
    path = "/" (đi đến trang list sản phẩm)
    query = URLSearchParams("brand=Converse&page=1&priceMin=1000000&priceMax=2000000") (dùng để lọc các sản phẩm hiển thị)

  Ví dụ 2 (trang chi tiết sản phẩm):
  URL: http://127.0.0.1:3000/pages/products.html#/69b9483d557ba1976ca07474
    path = "/69b9483d557ba1976ca07474" (đi đến chi tiết sp có id 69b9483d557ba1976ca07474)
    query = URLSearchParams("")
  */

const getHashPath = () => {
  const hash = window.location.hash || "#/"; //Lấy trên URL từ phần kí tự '#' về sau
  const raw = hash.slice(1); //Bỏ #

  //path là phần trước dấu '?' còn queryString là phần sau
  const [path, queryString] = raw.split("?");

  return {
    path: path === "" ? "/" : path,
    query: new URLSearchParams(queryString || ""),
  };
};

export default getHashPath;
