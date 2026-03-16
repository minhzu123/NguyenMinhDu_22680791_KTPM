/**
 * ============================================================
 *  API SERVICE LAYER (Lớp gọi API từ Frontend)
 * ============================================================
 * 
 * Vai trò: Tập trung tất cả các lệnh gọi API đến Backend.
 * Đây là "cầu nối" giữa Presentation Layer (React components)
 * và Backend API.
 * 
 * Nguyên tắc:
 * - Tập trung mọi API call vào 1 file duy nhất
 * - Components KHÔNG gọi fetch() trực tiếp
 * - Dễ dàng thay đổi URL hoặc cách gọi API mà không ảnh hưởng components
 * - Xử lý lỗi response tại đây
 */

// Base URL của Backend API
const API_BASE_URL = 'http://localhost:5000/api/articles';

/**
 * Chức năng 1: LẤY DANH SÁCH bài viết
 * 
 * Gửi GET request đến Backend
 * Flow: React Component → API Service → Backend → Response → Component
 */
export async function fetchArticles() {
  try {
    const response = await fetch(API_BASE_URL);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    return result.data; // Trả về mảng articles
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bài viết:', error);
    throw error;
  }
}

/**
 * Chức năng 2: TẠO bài viết mới
 * 
 * Gửi POST request với dữ liệu bài viết trong body
 * Content-Type: application/json để Backend đọc được req.body
 */
export async function createArticle(articleData) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Quan trọng: báo cho BE biết body là JSON
      },
      body: JSON.stringify(articleData),       // Chuyển object thành JSON string
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    return result.data; // Trả về article vừa tạo
  } catch (error) {
    console.error('Lỗi khi tạo bài viết:', error);
    throw error;
  }
}

/**
 * Chức năng 3: XÓA bài viết
 * 
 * Gửi DELETE request với ID bài viết trong URL
 */
export async function deleteArticle(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    return result.data; // Trả về article đã xóa
  } catch (error) {
    console.error('Lỗi khi xóa bài viết:', error);
    throw error;
  }
}
