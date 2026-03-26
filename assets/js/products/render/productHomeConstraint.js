import getHashPath from "../utils/getHashPath.js";
import capitalizeWords from "../utils/capitalizeWords.js";

const productHomeConstraint = () => {
  const { query } = getHashPath();
  const brand = query.get("brand");

  const gender = query.get("gender");

  const priceMin = query.get("priceMin") ?? 0;
  const priceMax = query.get("priceMax") ?? Infinity;

  const tags = query.get("tags")?.split(",") || [];

  const sort = query.get("sort");
  const order = query.get("order") || "asc";

  var delayTime = 150;

  const increaseDelayTime = (increaseAmount) => {
    delayTime += increaseAmount;
    return delayTime;
  };

  return `
    <div class="products__constraint">
      ${brand ? `<div class="products__constraint-item" data-aos="fade-down" data-aos-delay="${increaseDelayTime(50)}">${brand} <span class="products__constraint-clear products__constraint-clear-brand"><i class="ri-close-fill"></i></span></div>` : ""}

      ${gender ? `<div class="products__constraint-item" data-aos="fade-down" data-aos-delay="${increaseDelayTime(50)}">${gender}<span class="products__constraint-clear products__constraint-clear-gender"><i class="ri-close-fill"></i></span></div>` : ""}

      ${
        priceMin == 0 && priceMax == Infinity
          ? ""
          : `<div class="products__constraint-item" data-aos="fade-down" data-aos-delay="${increaseDelayTime(50)}">${
              priceMin == 0 && priceMax == 1000000
                ? "Dưới 1 triệu"
                : priceMin == 1000000 && priceMax == 2000000
                  ? "Từ 1 đến 2 triệu"
                  : priceMin == 2000000 && priceMax == 4000000
                    ? "Từ 2 đến 4 triệu"
                    : "Trên 4 triệu"
            }<span class="products__constraint-clear products__constraint-clear-price"><i class="ri-close-fill"></i></span></div>`
      }

      ${tags
        .map(
          (
            tag,
          ) => `<div class="products__constraint-item" data-aos="fade-down" data-aos-delay="${increaseDelayTime(50)}">
        ${capitalizeWords(tag)}
        <span class="products__constraint-clear products__constraint-delete-tag" data-tag="${tag}"><i class="ri-close-fill"></i></span></div>`,
        )
        .join("")}

      ${
        sort
          ? `<div class="products__constraint-item" data-aos="fade-down" data-aos-delay="${increaseDelayTime(50)}">${
              sort == "salePrice" && order == "asc"
                ? "Giá Thấp Đến Cao"
                : sort == "salePrice" && order == "desc"
                  ? "Giá Cao Đến Thấp"
                  : sort == "createAt" && order == "desc"
                    ? "Mới Nhất"
                    : sort == "createAt" && order == "asc"
                      ? "Cũ Nhất"
                      : "Nhiều review nhất"
            }<span class="products__constraint-clear products__constraint-clear-sort"><i class="ri-close-fill"></i></span></div>`
          : ""
      }
    </div>
  `;
};

export default productHomeConstraint;
