/**
 * ============================================================
 *  BUSINESS LOGIC LAYER (Lớp xử lý nghiệp vụ)
 * ============================================================
 * 
 * Vai trò: Chứa các quy tắc nghiệp vụ (business rules) của ứng dụng.
 * Lớp này xử lý logic, validation, và điều phối dữ liệu giữa
 * Controller (API Layer) và Model (Data Access Layer).
 * 
 * Nguyên tắc:
 * - Chứa TẤT CẢ logic nghiệp vụ (validation, tính toán, ...)
 * - Gọi đến Data Access Layer để lấy/lưu dữ liệu
 * - KHÔNG biết về HTTP request/response (không dùng req, res)
 * - KHÔNG trực tiếp đọc/ghi database
 * - Trả về dữ liệu hoặc throw error để Controller xử lý
 */

const { v4: uuidv4 } = require('uuid');
const articleModel = require('../models/articleModel');

/**
 * Lấy danh sách tất cả bài viết
 * 
 * Business Logic: Gọi Data Access Layer để lấy dữ liệu
 * Trong thực tế, có thể thêm: phân trang, lọc, sắp xếp, ...
 */
function getAllArticles() {
  return articleModel.getAll();
}

/**
 * Tạo bài viết mới
 * 
 * Business Logic:
 * 1. Validate dữ liệu đầu vào (title, content không được rỗng)
 * 2. Tạo ID tự động bằng UUID
 * 3. Thêm metadata (author, createdAt)
 * 4. Gọi Data Access Layer để lưu
 */
function createArticle(data) {
  // ===== VALIDATION (Kiểm tra dữ liệu đầu vào) =====
  if (!data.title || data.title.trim() === '') {
    throw new Error('Tiêu đề bài viết không được để trống');
  }

  if (!data.content || data.content.trim() === '') {
    throw new Error('Nội dung bài viết không được để trống');
  }

  if (data.title.trim().length < 5) {
    throw new Error('Tiêu đề phải có ít nhất 5 ký tự');
  }

  // ===== TẠO ĐỐI TƯỢNG BÀI VIẾT MỚI =====
  const newArticle = {
    id: uuidv4(),                          // Tạo ID duy nhất
    title: data.title.trim(),              // Loại bỏ khoảng trắng thừa
    content: data.content.trim(),
    author: data.author || 'Anonymous',    // Mặc định là Anonymous
    createdAt: new Date().toISOString()    // Thời gian tạo
  };

  // Gọi Data Access Layer để lưu vào database
  return articleModel.create(newArticle);
}

/**
 * Xóa bài viết theo ID
 * 
 * Business Logic:
 * 1. Kiểm tra bài viết có tồn tại không
 * 2. Nếu tồn tại, gọi Data Access Layer để xóa
 * 3. Nếu không tồn tại, throw error
 */
function deleteArticle(id) {
  // Kiểm tra bài viết có tồn tại không
  const article = articleModel.findById(id);
  
  if (!article) {
    throw new Error('Không tìm thấy bài viết với ID: ' + id);
  }

  // Gọi Data Access Layer để xóa
  articleModel.deleteById(id);
  return { message: 'Đã xóa bài viết thành công', deletedArticle: article };
}

// Export các hàm để Controller (API Layer) sử dụng
module.exports = {
  getAllArticles,
  createArticle,
  deleteArticle
};
