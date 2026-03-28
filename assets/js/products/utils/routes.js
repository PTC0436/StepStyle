import {
  getBrandList,
  getGenderList,
  getProductById,
  getProductsList,
  getSimilarProducts,
  getTagList,
} from "../services/productsAPI.js";
import { getReviewsByShoeId } from "../services/reviewsAPI.js";
import productHome from "../render/productHome.js";
import productHomeSkeleton from "../render/productHomeSkeleton.js";
import productDetail from "../render/productDetail.js";
import productDetailSkeleton from "../render/productDetailSkeleton.js";
import pageNotFound404 from "../render/pageNotFound404.js";
import scrollTop from "../../utils/scrollTop.js";
import isValidObjectId from "./isValidObjectId.js";

//Mỗi route sẽ có một path và một hàm render
const routes = [
  {
    //Path của của trang product list
    path: "/",
    render: async ({ query }) => {
      //Dùng try catch vì lúc fetch có thể gặp lỗi server
      try {
        //Tìm đến phần tử có id app
        const app = document.querySelector("#app");
        //Vẽ ra giao diện skeleton trước khi nhận được dữ liệu
        if (app) app.innerHTML = productHomeSkeleton();

        //Scroll lên đầu trang
        scrollTop();

        //Lấy các params từ query
        const filters = {
          search: query.get("search"),
          brand: query.get("brand"),
          gender: query.get("gender"),
          sort: query.get("sort"),
          order: query.get("order") || "asc",
          tags: query.get("tags")?.split(",") || [],
          priceMin: query.get("priceMin") ?? 0,
          priceMax: query.get("priceMax") ?? Infinity,
          page: query.get("page") ?? 1,
        };

        //Gọi hàm lấy dữ liệu từ server
        const [products, brandList, genderList, tagList] = await Promise.all([
          getProductsList(filters),
          getBrandList(),
          getGenderList(),
          getTagList(),
        ]);

        //Khi có dữ liệu thì trả về
        return {
          html: productHome({
            products,
            brandList,
            genderList,
            tagList,
          }),
          route: "PRODUCT_HOME",
        };
      } catch (err) {
        //Có lỗi thì trả về page not found
        return {
          html: pageNotFound404(),
          route: "NOT_FOUND",
        };
      }
    },
  },

  {
    //Path của của trang product detail
    path: "/:id",
    render: async (params) => {
      //Kiểm tra xem có đi vào trang chi tiết sản phẩm hay không
      if (!isValidObjectId(params.id)) {
        return {
          html: pageNotFound404(),
          route: "NOT_FOUND",
        };
      }

      try {
        //Tìm tới element có id app
        const app = document.querySelector("#app");
        //Vẽ ra skeleton trước khi call api
        if (app) app.innerHTML = productDetailSkeleton();

        scrollTop();

        //Call api
        const [product, reviews, similarProducts] = await Promise.all([
          getProductById(params.id),
          getReviewsByShoeId(params.id),
          getSimilarProducts(params.id, 6),
        ]);

        //Nếu không có product thì trả về page not found
        if (!product) {
          return {
            html: pageNotFound404(),
            route: "NOT_FOUND",
          };
        }

        //Nếu có thì return
        return {
          html: productDetail({ product, reviews, similarProducts }),
          route: "PRODUCT_DETAIL",
        };
      } catch (err) {
        //Có lỗi thì trả về page not found
        return {
          html: pageNotFound404(),
          route: "NOT_FOUND",
        };
      }
    },
  },
];

export default routes;
