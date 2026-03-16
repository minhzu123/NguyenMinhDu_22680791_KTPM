/**
 * ============================================================
 *  COMPONENT: ArticleList (Danh sách bài viết)
 * ============================================================
 * 
 * Vai trò trong Presentation Layer:
 * - Hiển thị danh sách bài viết dạng card
 * - Mỗi card có nút "Xóa" để xóa bài viết
 * - Hiển thị trạng thái loading và empty state
 * 
 * Props:
 * - articles: Array - danh sách bài viết
 * - onDelete: function(id) - callback khi xóa bài viết
 * - loading: boolean - đang tải dữ liệu
 */

function ArticleList({ articles, onDelete, loading }) {
  // ===== LOADING STATE =====
  if (loading) {
    return (
      <div className="list-container">
        <h2>📋 Danh sách bài viết</h2>
        <div className="loading">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  // ===== EMPTY STATE =====
  if (!articles || articles.length === 0) {
    return (
      <div className="list-container">
        <h2>📋 Danh sách bài viết</h2>
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <p>Chưa có bài viết nào. Hãy tạo bài viết đầu tiên!</p>
        </div>
      </div>
    );
  }

  /**
   * Xử lý xóa bài viết
   * Hiển thị confirm dialog trước khi xóa
   */
  const handleDelete = (id, title) => {
    const confirmed = window.confirm(`Bạn có chắc muốn xóa bài viết "${title}"?`);
    if (confirmed) {
      onDelete(id); // Gọi callback → App.jsx → API Service → Backend
    }
  };

  /**
   * Format ngày tháng từ ISO string sang tiếng Việt
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="list-container">
      <h2>📋 Danh sách bài viết ({articles.length})</h2>
      
      <div className="article-grid">
        {/* Lặp qua mảng articles và render từng card */}
        {articles.map((article) => (
          <div key={article.id} className="article-card">
            <div className="card-header">
              <h3 className="card-title">{article.title}</h3>
              <button
                className="btn-delete"
                onClick={() => handleDelete(article.id, article.title)}
                title="Xóa bài viết"
              >
                🗑️
              </button>
            </div>
            
            <p className="card-content">{article.content}</p>
            
            <div className="card-footer">
              <span className="card-author">✍️ {article.author}</span>
              <span className="card-date">📅 {formatDate(article.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleList;
