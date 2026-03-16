/**
 * ============================================================
 *  DATA ACCESS LAYER (Lớp truy cập dữ liệu)
 * ============================================================
 * 
 * Vai trò: Chịu trách nhiệm đọc/ghi dữ liệu từ nguồn lưu trữ.
 * Trong ví dụ này, dữ liệu được lưu trong file JSON.
 * Trong thực tế, lớp này sẽ kết nối với database (MySQL, MongoDB, ...).
 * 
 * Nguyên tắc:
 * - Lớp này CHỈ biết cách đọc/ghi dữ liệu
 * - KHÔNG chứa logic nghiệp vụ (validation, business rules)
 * - KHÔNG biết về HTTP request/response
 * - Các lớp khác gọi đến lớp này để lấy/lưu dữ liệu
 */

const fs = require('fs');
const path = require('path');

// Đường dẫn đến file dữ liệu JSON (đóng vai trò như database)
const DATA_FILE = path.join(__dirname, '..', 'data', 'articles.json');

/**
 * Đọc toàn bộ dữ liệu từ file JSON
 * Tương đương: SELECT * FROM articles
 */
function readData() {
  try {
    const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    // Nếu file chưa tồn tại hoặc lỗi, trả về mảng rỗng
    return [];
  }
}

/**
 * Ghi toàn bộ dữ liệu vào file JSON
 * Tương đương: UPDATE/INSERT vào database
 */
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Lấy tất cả bài viết
 * Tương đương: SELECT * FROM articles ORDER BY createdAt DESC
 */
function getAll() {
  const articles = readData();
  // Sắp xếp theo thời gian tạo mới nhất
  return articles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Tìm bài viết theo ID
 * Tương đương: SELECT * FROM articles WHERE id = ?
 */
function findById(id) {
  const articles = readData();
  return articles.find(article => article.id === id);
}

/**
 * Thêm bài viết mới vào database
 * Tương đương: INSERT INTO articles VALUES (...)
 */
function create(article) {
  const articles = readData();
  articles.push(article);
  writeData(articles);
  return article;
}

/**
 * Xóa bài viết theo ID
 * Tương đương: DELETE FROM articles WHERE id = ?
 * @returns {boolean} true nếu xóa thành công, false nếu không tìm thấy
 */
function deleteById(id) {
  const articles = readData();
  const index = articles.findIndex(article => article.id === id);
  
  if (index === -1) {
    return false; // Không tìm thấy bài viết
  }
  
  articles.splice(index, 1); // Xóa 1 phần tử tại vị trí index
  writeData(articles);
  return true;
}

// Export các hàm để lớp Business Logic sử dụng
module.exports = {
  getAll,
  findById,
  create,
  deleteById
};
