const pageNotFound404 = () => {
  return `
    <div class="not-found">
      <div class="container-fluid">
        <div class="row text-align-center">
          <h1>NOT FOUND</h1>
          <p class="zoom-area">
            Bạn đang cố truy cập vào trang không tồn tại!
          </p>
          <section class="error-container">
            <span class="four"><span class="screen-reader-text">4</span></span>
            <span class="zero"><span class="screen-reader-text">0</span></span>
            <span class="four"><span class="screen-reader-text">4</span></span>
          </section>
          <div class="link-container">
            <button class="btn-back">Quay lại</button>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default pageNotFound404;
