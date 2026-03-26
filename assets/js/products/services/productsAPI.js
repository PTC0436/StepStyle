// import products from "/database/products.js";

import { api } from "../../utils/request.js";

// export const getProductsList = async (filter) => {
//   // console.log(filter);
//   const data = await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(
//         products.filter((item) => {
//           if (
//             filter.brand &&
//             filter.brand.toLowerCase() != item.brand.toLowerCase()
//           )
//             return false;
//           if (filter.gender && filter.gender != item.gender) return false;
//           const keywords = filter.search?.toLowerCase().split(" ");
//           if (
//             keywords &&
//             !keywords.every((k) => item.name.toLowerCase().includes(k))
//           )
//             return false;
//           if (
//             filter.tags?.length &&
//             !filter.tags.every((tag) => item.tags?.includes(tag))
//           )
//             return false;
//           if (filter.priceRange) {
//             const [start, end] = filter.priceRange;
//             const minPrice = start || 0;
//             const maxPrice = end || Infinity;
//             if (item.salePrice < minPrice || item.salePrice > maxPrice)
//               return false;
//           }
//           return true;
//         }),
//       );
//     }, 150);
//   });

//   if (filter.sort) {
//     const order = filter.order || "asc";
//     data.sort((a, b) => {
//       if (Array.isArray(a)) {
//         if (a.length < b.length) return order == "asc" ? -1 : 1;
//         if (a.length > b.length) return order == "asc" ? 1 : -1;
//         return 0;
//       }

//       if (a[filter.sort] < b[filter.sort]) return order == "asc" ? -1 : 1;
//       if (a[filter.sort] > b[filter.sort]) return order == "asc" ? 1 : -1;
//       return 0;
//     });
//   }
//   return data;
// };

// export const getProductsListByID = async (id) => {
//   return products.filter((item) => item.id == id);
// };

// export const getProductsListByBrand = async (brand) => {
//   return products.filter((item) => item.brand == brand);
// };

// export const getBrandList = async () => {
//   const brandList = Array.from(
//     new Set(products?.map((item) => item.brand) || []),
//   );
//   return brandList;
// };

// export const getGenderList = async () => {
//   const genderList = Array.from(
//     new Set(products?.map((item) => item.gender) || []),
//   );
//   return genderList;
// };

// export const getTagList = async () => {
//   const tagList = Array.from(
//     new Set(products?.flatMap((item) => item.tags || [])),
//   );
//   return tagList;
// };

export const getProductsList = async (filter = {}) => {
  const cleanFilter = Object.fromEntries(
    Object.entries(filter).filter(
      ([_, v]) => v !== null && v !== undefined && v !== "",
    ),
  );

  const query = new URLSearchParams(cleanFilter).toString();

  const res = await api.get(`/api/shoes?${query}`);
  return res;
};

export const getProductById = async (id) => {
  const res = await api.get(`/api/shoes/${id}`);
  return res;
};

export const getProductsListByBrand = async (brand) => {
  const res = await api.get(`/api/shoes?brand=${encodeURIComponent(brand)}`);
  return res;
};

export const getSimilarProducts = async (id, limit = null) => {
  const res = await api.get(
    `/api/shoes/${id}/similar${limit ? "?limit=" + limit : ""}`,
  );
  return res;
};

export const getBrandList = async () => {
  const res = await api.get("/api/shoes/brands");
  return res;
};

export const getGenderList = async () => {
  const res = await api.get("/api/shoes/genders");
  return res;
};

export const getTagList = async () => {
  const res = await api.get("/api/shoes/tags");
  return res;
};
