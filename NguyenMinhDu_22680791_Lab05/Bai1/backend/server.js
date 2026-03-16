/**
 * ============================================================
 *  SERVER ENTRY POINT (Điểm khởi đầu của ứng dụng Backend)
 * ============================================================
 * 
 * File này khởi tạo Express server và cấu hình các middleware.
 * Đây là nơi "kết nối" tất cả các lớp lại với nhau.
 * 
 * Luồng xử lý request:
 * Client (React) → Server → Routes (Controller) → Service → Model → Data
 */

const express = require('express');
const cors = require('cors');
const articleRoutes = require('./routes/articleRoutes');

// Khởi tạo Express app
const app = express();
const PORT = 5000;

// ===== MIDDLEWARE CONFIGURATION =====

// CORS: Cho phép Frontend (port 3000) gọi đến Backend (port 5000)
// Nếu không có CORS, trình duyệt sẽ chặn request cross-origin
app.use(cors());

// Parse JSON body: Cho phép đọc dữ liệu JSON từ request body
// Ví dụ: khi Frontend gửi POST request với body { title: "...", content: "..." }
app.use(express.json());

// ===== ROUTE MOUNTING =====
// Gắn tất cả article routes vào prefix /api/articles
// Ví dụ: GET /api/articles, POST /api/articles, DELETE /api/articles/:id
app.use('/api/articles', articleRoutes);

// ===== ROOT ROUTE =====
// Route mặc định để kiểm tra server có hoạt động không
app.get('/', (req, res) => {
  res.json({
    message: 'CMS Backend API đang hoạt động!',
    endpoints: {
      'GET /api/articles': 'Lấy danh sách bài viết',
      'POST /api/articles': 'Tạo bài viết mới',
      'DELETE /api/articles/:id': 'Xóa bài viết theo ID'
    }
  });
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`\n====================================`);
  console.log(`  CMS Backend Server`);
  console.log(`  Đang chạy tại: http://localhost:${PORT}`);
  console.log(`  API endpoint:   http://localhost:${PORT}/api/articles`);
  console.log(`====================================\n`);
});
