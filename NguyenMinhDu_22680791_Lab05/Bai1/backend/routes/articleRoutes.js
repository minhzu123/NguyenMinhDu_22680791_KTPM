/**
 * ============================================================
 *  API LAYER / CONTROLLER LAYER (Lớp điều khiển API)
 * ============================================================
 * 
 * Vai trò: Tiếp nhận HTTP request từ client (Frontend),
 * gọi Business Logic Layer để xử lý, và trả về HTTP response.
 * 
 * Nguyên tắc:
 * - CHỈ xử lý HTTP request/response (req, res)
 * - KHÔNG chứa logic nghiệp vụ (validation, business rules)
 * - KHÔNG trực tiếp truy cập database
 * - Gọi đến Business Logic Layer (Service) để xử lý
 * - Xử lý lỗi và trả về status code phù hợp
 * 
 * REST API Endpoints:
 * - GET    /api/articles     → Lấy danh sách bài viết
 * - POST   /api/articles     → Tạo bài viết mới
 * - DELETE  /api/articles/:id → Xóa bài viết theo ID
 */

const express = require('express');
const router = express.Router();
const articleService = require('../services/articleService');

/**
 * GET /api/articles
 * Chức năng 1: XEM DANH SÁCH bài viết
 * 
 * Flow: Client Request → Controller → Service → Model → JSON File
 *       Client Response ← Controller ← Service ← Model ← JSON File
 */
router.get('/', (req, res) => {
  try {
    // Gọi Business Logic Layer
    const articles = articleService.getAllArticles();
    
    // Trả về response thành công với status 200
    res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server: ' + error.message
    });
  }
});

/**
 * POST /api/articles
 * Chức năng 2: TẠO bài viết mới
 * 
 * Flow: Client gửi { title, content, author } trong body
 *       → Controller nhận req.body
 *       → Service validate + tạo article
 *       → Model lưu vào JSON file
 */
router.post('/', (req, res) => {
  try {
    // Lấy dữ liệu từ request body (do client gửi lên)
    const { title, content, author } = req.body;

    // Gọi Business Logic Layer để xử lý
    const newArticle = articleService.createArticle({ title, content, author });

    // Trả về response thành công với status 201 (Created)
    res.status(201).json({
      success: true,
      message: 'Tạo bài viết thành công',
      data: newArticle
    });
  } catch (error) {
    // Lỗi validation từ Business Logic Layer → 400 Bad Request
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * DELETE /api/articles/:id
 * Chức năng 3: XÓA bài viết
 * 
 * Flow: Client gửi ID qua URL params
 *       → Controller lấy req.params.id
 *       → Service kiểm tra tồn tại + xóa
 *       → Model xóa khỏi JSON file
 */
router.delete('/:id', (req, res) => {
  try {
    // Lấy ID từ URL params (ví dụ: /api/articles/abc-123)
    const { id } = req.params;

    // Gọi Business Logic Layer để xử lý
    const result = articleService.deleteArticle(id);

    // Trả về response thành công với status 200
    res.status(200).json({
      success: true,
      message: result.message,
      data: result.deletedArticle
    });
  } catch (error) {
    // Lỗi không tìm thấy bài viết → 404 Not Found
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
