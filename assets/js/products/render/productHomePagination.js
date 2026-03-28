//Hàm productHomePagination dùng để tạo cấu trúc html của phần phân trang trong trang danh sách sản phẩm
const productHomePagination = (currentPage, totalPages) => {
  const pages = [];

  //Tổng = 0 thì không có phân trang(noProduct)
  if (totalPages == 0) return "";

  //Nút first
  pages.push(
    `<button class="pagination__item pagination__first" data-page="${currentPage == 1 ? "" : 1}"><i class="ri-arrow-left-double-fill"></i></button>`,
  );
  //Nút previous
  pages.push(
    `<button class="pagination__item pagination__prev" data-page="${currentPage == 1 ? "" : currentPage - 1}"><i class="ri-skip-left-line"></i></button>`,
  );

  //Luôn có trang đầu
  pages.push(
    `<button class="pagination__item pagination__number${currentPage == 1 ? " pagination__number--active" : ""}" data-page="1">1</button>`,
  );

  //Nếu current > 3 thì thêm ...
  if (currentPage > 3) {
    pages.push(
      `<button class="pagination__item pagination__dot" data-page="${Math.max(1, currentPage - 3)}">...</button>`,
    );
  }

  //Các trang quanh currentPage
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i > 1 && i < totalPages) {
      pages.push(
        `<button class="pagination__item pagination__number${currentPage == i ? " pagination__number--active" : ""}" data-page="${i}">${i}</button>`,
      );
    }
  }

  //Nếu current < total - 2 thì thêm ...
  if (currentPage < totalPages - 2) {
    pages.push(
      `<button class="pagination__item pagination__dot" data-page="${Math.min(totalPages, currentPage + 3)}">...</button>`,
    );
  }

  //Luôn có trang cuối
  if (totalPages > 1) {
    pages.push(
      `<button class="pagination__item pagination__number${currentPage == totalPages ? " pagination__number--active" : ""}" data-page="${totalPages}">${totalPages}</button>`,
    );
  }

  //Nút next
  pages.push(
    `<button class="pagination__item pagination__next" data-page="${currentPage == totalPages ? "" : currentPage + 1}"><i class="ri-skip-right-line"></i></button>`,
  );
  //Nút last
  pages.push(
    `<button class="pagination__item pagination__last" data-page="${currentPage == totalPages ? "" : totalPages}"><i class="ri-arrow-right-double-fill"></i></button>`,
  );

  return `
    <div class="products__pagination">
      ${pages.join("")}
    </div>
  `;
};

export default productHomePagination;
