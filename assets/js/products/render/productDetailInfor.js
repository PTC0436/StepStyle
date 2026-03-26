const productDetailInfor = (product) => {
  return `
    <div class="product__infor">
      <h3>Thông tin chi tiết</h3>
      <div class="accordion product__accordion" id="product__accordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
              aria-expanded="true" aria-controls="collapseOne">
              Mô tả sản phẩm
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
            data-bs-parent="#product__accordion">
            <div class="accordion-body">
                <p class="product__name">${product.name}</p>
                <p><strong>Thương hiệu:</strong> ${product?.brand ?? "Đang cập nhật"}</p>
                <p><strong>Xuất xứ:</strong> ${product?.origin ?? "Đang cập nhật"}</p>
                <p><strong>Chất liệu:</strong> ${product?.material ?? "Đang cập nhật"}</p>
                <p><strong>Trọng lượng(kg):</strong> ${product?.weight ?? "Đang cập nhật"}</p>
                <p><strong>Giới tính:</strong> ${product?.gender ?? "Đang cập nhật"}</p>
                <p><strong>Cam kết chính hãng 100%</strong></p>
                <p><strong style="text-decoration: underline; font-style: italic;">Lưu ý:</strong>Đối với các sản phẩm hết hàng sẵn hoặc hết size bạn cần, Quý khách có thể liên hệ với Stepstyle để trao đổi.</p>
                <br/>
                <p>${product?.description ?? ""}</p>
            </div>  
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
              aria-expanded="false" aria-controls="collapseTwo">
              Chính sách thanh toán
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
            data-bs-parent="#product__accordion">
            <div class="accordion-body">
              <p>
                Stepstyle hỗ trợ nhiều hình thức thanh toán nhằm mang lại sự tiện lợi và an tâm cho khách hàng.
              </p>

              <ol>
                <li>
                  <strong>Hình thức thanh toán</strong>
                  <ul>
                    <li>
                      <strong>Thanh toán khi nhận hàng (COD):</strong>
                      Khách hàng thanh toán trực tiếp cho nhân viên giao hàng khi nhận sản phẩm.
                    </li>
                    <li>
                      <strong>Chuyển khoản ngân hàng:</strong>
                      Thông tin tài khoản sẽ được Stepstyle cung cấp sau khi xác nhận đơn hàng.
                      <br />
                      <em>Nội dung chuyển khoản: Tên + Số điện thoại + Mã đơn hàng.</em>
                    </li>
                    <li>
                      <strong>Thanh toán qua ví điện tử:</strong>
                      Momo, ZaloPay, VNPay (nếu có).
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Thời gian xác nhận thanh toán</strong>
                  <ul>
                    <li>
                      <strong>Đơn COD:</strong> Xử lý ngay sau khi xác nhận đặt hàng.
                    </li>
                    <li>
                      <strong>Đơn chuyển khoản / ví điện tử:</strong>
                      Xử lý sau khi Stepstyle xác nhận đã nhận được thanh toán.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Lưu ý</strong>
                  <ul>
                    <li>
                      Stepstyle <strong>không chịu trách nhiệm</strong> nếu khách hàng chuyển khoản sai thông
                      tin.
                    </li>
                    <li>
                      Nếu phát sinh sự cố thanh toán, vui lòng liên hệ Stepstyle để được hỗ trợ.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Chính sách đổi trả
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
            data-bs-parent="#product__accordion">
            <div class="accordion-body">
              <p>
                Stepstyle cam kết bảo vệ quyền lợi khách hàng với chính sách đổi trả minh bạch và rõ ràng.
              </p>

              <ol>
                <li>
                  <strong>Thời gian đổi trả</strong>
                  <ul>
                    <li>
                      Khách hàng được <strong>đổi hoặc trả sản phẩm trong vòng X ngày</strong> kể từ ngày nhận hàng.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Điều kiện đổi trả</strong>
                  <ul>
                    <li>Sản phẩm <strong>chưa qua sử dụng</strong>, chưa mang ra ngoài.</li>
                    <li>Còn <strong>nguyên tem, nhãn mác</strong>.</li>
                    <li>Không bị bẩn, trầy xước, biến dạng.</li>
                    <li>Có <strong>đầy đủ hộp giày và phụ kiện</strong> đi kèm.</li>
                    <li>Có <strong>hóa đơn hoặc thông tin đơn hàng</strong>.</li>
                  </ul>
                </li>

                <li>
                  <strong>Trường hợp được đổi trả</strong>
                  <ul>
                    <li>Sản phẩm bị <strong>lỗi do nhà sản xuất</strong>.</li>
                    <li>Giao <strong>sai mẫu, sai size, sai màu</strong>.</li>
                    <li>Sản phẩm bị <strong>hư hỏng trong quá trình vận chuyển</strong>.</li>
                  </ul>
                </li>

                <li>
                  <strong>Trường hợp không áp dụng đổi trả</strong>
                  <ul>
                    <li>Sản phẩm đã qua sử dụng.</li>
                    <li>Sản phẩm bị hư hỏng do người sử dụng.</li>
                    <li>
                      Sản phẩm thuộc chương trình
                      <strong>giảm giá sâu / xả kho / sale off</strong>
                      (trừ khi có lỗi từ nhà sản xuất).
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Phí đổi trả</strong>
                  <ul>
                    <li>
                      Stepstyle <strong>chịu phí đổi trả</strong> nếu lỗi thuộc về shop.
                    </li>
                    <li>
                      Khách hàng <strong>chịu phí vận chuyển</strong> nếu đổi trả do nhu cầu cá nhân.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Quy trình đổi trả</strong>
                  <ul>
                    <li>Liên hệ Stepstyle qua fanpage / hotline / email.</li>
                    <li>Cung cấp <strong>mã đơn hàng và hình ảnh sản phẩm</strong>.</li>
                    <li>Stepstyle xác nhận và hướng dẫn gửi hàng.</li>
                    <li>Tiến hành đổi hoặc trả theo thỏa thuận.</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default productDetailInfor;
