/**
 * ============================================================
 *  APP COMPONENT (Component chính - Presentation Layer)
 * ============================================================
 * 
 * Vai trò: Component gốc của ứng dụng React.
 * - Quản lý state toàn cục (danh sách articles)
 * - Kết nối các component con (ArticleForm, ArticleList)
 * - Gọi API Service để tương tác với Backend
 * 
 * Luồng dữ liệu:
 * App.jsx (state) → ArticleForm (tạo bài) → API Service → Backend
 * App.jsx (state) → ArticleList (hiển thị) ← API Service ← Backend
 */

import { useState, useEffect } from 'react';
import ArticleForm from './components/ArticleForm.jsx';
import ArticleList from './components/ArticleList.jsx';
import { fetchArticles, createArticle, deleteArticle } from './api/articleApi.js';
import './App.css';

function App() {
  // ===== STATE MANAGEMENT =====
  const [articles, setArticles] = useState([]);    // Danh sách bài viết
  const [loading, setLoading] = useState(true);     // Đang tải dữ liệu
  const [notification, setNotification] = useState(null); // Thông báo

  /**
   * useEffect: Chạy 1 lần khi component mount
   * Gọi API để lấy danh sách bài viết ban đầu
   * 
   * Flow: Component Mount → loadArticles() → API Service → Backend
   */
  useEffect(() => {
    loadArticles();
  }, []);

  /**
   * Tải danh sách bài viết từ Backend
   */
  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await fetchArticles();  // Gọi API Service
      setArticles(data);                    // Cập nhật state
    } catch (error) {
      showNotification('Lỗi khi tải dữ liệu: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Chức năng TẠO bài viết mới
   * Được truyền xuống ArticleForm qua prop onSubmit
   * 
   * Flow: ArticleForm submit → handleCreate() → API Service → Backend
   *       → Cập nhật state → Re-render ArticleList
   */
  const handleCreate = async (articleData) => {
    const newArticle = await createArticle(articleData);  // Gọi API Service
    setArticles(prev => [newArticle, ...prev]);           // Thêm vào đầu danh sách
    showNotification('Tạo bài viết thành công!', 'success');
  };

  /**
   * Chức năng XÓA bài viết
   * Được truyền xuống ArticleList qua prop onDelete
   * 
   * Flow: ArticleList click Delete → handleDelete() → API Service → Backend
   *       → Cập nhật state → Re-render ArticleList
   */
  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);                                     // Gọi API Service
      setArticles(prev => prev.filter(article => article.id !== id)); // Xóa khỏi state
      showNotification('Đã xóa bài viết thành công!', 'success');
    } catch (error) {
      showNotification('Lỗi khi xóa: ' + error.message, 'error');
    }
  };

  /**
   * Hiển thị thông báo tạm thời (3 giây)
   */
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="app">
      {/* ===== HEADER ===== */}
      <header className="app-header">
        <div className="header-content">
          <h1>📰 CMS - Quản lý Nội dung</h1>
          <p className="subtitle">Kiến trúc phân lớp (Layered Architecture)</p>
        </div>
      </header>

      {/* ===== NOTIFICATION ===== */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.type === 'success' ? '✅' : '❌'} {notification.message}
        </div>
      )}

      {/* ===== ARCHITECTURE INFO ===== */}
      <div className="arch-info">
        <div className="arch-layer">
          <span className="layer-badge presentation">Presentation</span>
          <span>React.js (Frontend)</span>
        </div>
        <span className="arch-arrow">→</span>
        <div className="arch-layer">
          <span className="layer-badge business">Business Logic</span>
          <span>Express.js (Service)</span>
        </div>
        <span className="arch-arrow">→</span>
        <div className="arch-layer">
          <span className="layer-badge data">Data Access</span>
          <span>JSON File (Model)</span>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <main className="main-content">
        {/* Form tạo bài viết - truyền callback handleCreate */}
        <ArticleForm onSubmit={handleCreate} />
        
        {/* Danh sách bài viết - truyền data và callback handleDelete */}
        <ArticleList 
          articles={articles} 
          onDelete={handleDelete} 
          loading={loading} 
        />
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="app-footer">
        <p>CMS Layered Architecture Demo - NguyenMinhDu_22680791 - Lab05 Bai1</p>
      </footer>
    </div>
  );
}

export default App;
