//Hàm isValidObjectId dùng để xác định xem một chuỗi có phải id của sản phẩm không
//Id của các sản lưu trên Atlas MongoDB là ObjectId(một chuỗi 24 kí tự dạng hexadecimal (0-9, a-f))
//nên ta có regex: /^[0-9a-fA-F]{24}$/
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

export default isValidObjectId;
