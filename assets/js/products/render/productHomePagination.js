const productHomePagination = (currentPage, totalPages) => {
  const pages = [];

  if (totalPages == 0) return "";

  pages.push(
    `<button class="pagination__item pagination__first" data-page="${currentPage == 1 ? "" : 1}"><i class="ri-arrow-left-double-fill"></i></button>`,
  );
  pages.push(
    `<button class="pagination__item pagination__prev" data-page="${currentPage == 1 ? "" : currentPage - 1}"><i class="ri-skip-left-line"></i></button>`,
  );

  // luôn có trang đầu
  pages.push(
    `<button class="pagination__item pagination__number${currentPage == 1 ? " pagination__number--active" : ""}" data-page="1">1</button>`,
  );

  // nếu current > 4 thì thêm ...
  if (currentPage > 4) {
    pages.push(
      `<button class="pagination__item pagination__dot" data-page="${Math.max(1, currentPage - 5)}">...</button>`,
    );
  }

  // các trang quanh current
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 1 && i < totalPages) {
      pages.push(
        `<button class="pagination__item pagination__number${currentPage == i ? " pagination__number--active" : ""}" data-page="${i}">${i}</button>`,
      );
    }
  }

  // nếu current < total - 3 thì thêm ...
  if (currentPage < totalPages - 3) {
    pages.push(
      `<button class="pagination__item pagination__dot" data-page="${Math.min(totalPages, currentPage + 5)}">...</button>`,
    );
  }

  // luôn có trang cuối
  if (totalPages > 1) {
    pages.push(
      `<button class="pagination__item pagination__number${currentPage == totalPages ? " pagination__number--active" : ""}" data-page="${totalPages}">${totalPages}</button>`,
    );
  }

  pages.push(
    `<button class="pagination__item pagination__next" data-page="${currentPage == totalPages ? "" : currentPage + 1}"><i class="ri-skip-right-line"></i></button>`,
  );
  pages.push(
    `<button class="pagination__item pagination__last" data-page="${currentPage == totalPages ? "" : totalPages}"><i class="ri-arrow-right-double-fill"></i></button>`,
  );

  return `
    <div class="pagination">
      ${pages.join("")}
    </div>
  `;
};

export default productHomePagination;
