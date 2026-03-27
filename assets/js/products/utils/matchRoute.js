import routes from "./routes.js";

//Hàm matchRoute dùng để so khớp đường dẫn (path) hiện tại
//với danh sách routes đã định nghĩa, đồng thời trích xuất params động
//Xem chi tiết các route trong routes.js

const matchRoute = (path) => {
  //Duyệt qua từng route trong danh sách routes
  for (const route of routes) {
    //Chuyển path của route thành regex (":param" → "([^/]+)")
    const regexPath = route.path.replace(/:\w+/g, "([^/]+)");
    const regex = new RegExp("^" + regexPath + "$");

    //So khớp path hiện tại với regex
    const m = path.match(regex);
    if (!m) continue;

    const keys = Array.from(route.path.matchAll(/:(\w+)/g)).map((x) => x[1]);
    const values = m.slice(1);

    //Tạo object params (key-value)
    const params = {};
    keys.forEach((k, i) => (params[k] = values[i]));

    //Trả về route và params nếu tìm thấy
    return { route, params };
  }

  //Không tìm thấy route trả về null
  return null;
};

export default matchRoute;

/*
Ví dụ: 
matchRoute("#/69b9483d557ba1976ca0745e") {
  Có route {
    path: "/:id",
    ...
  }

  regexPath = "/([^/]+)"
  regex = ^/([^/]+)$

  m = "/69b9483d557ba1976ca0745e".match(regex);
    = [
        "/69b9483d557ba1976ca0745e",
        "69b9483d557ba1976ca0745e"
      ]

  keys = ["id"]
  values = ["69b9483d557ba1976ca0745e"]

  params =  {
              id: "69b9483d557ba1976ca0745e"
            }

  return {
    route: {
      path: "/:id",
      ...
    },
    params: {
      id: "69b9483d557ba1976ca0745e"
    }
  }
}

*/
