import { useState } from 'react';

function ArticleForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Vui lòng không để trống tiêu đề và nội dung anh Zu ơi!');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ title, content, author: author || 'Anonymous' });
      setTitle('');
      setContent('');
      setAuthor('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2><span>📝</span> Tạo bài viết mới</h2>
        <p className="form-subtitle">Chia sẻ kiến thức của anh với cộng đồng</p>
      </div>
      
      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span> {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="modern-form">
        <div className="form-row">
          <div className="form-group flex-2">
            <label htmlFor="title">Tiêu đề bài viết</label>
            <input
              id="title"
              type="text"
              placeholder="Ví dụ: Lộ trình trở thành Senior..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              autoComplete="off"
            />
          </div>

          <div className="form-group flex-1">
            <label htmlFor="author">Tác giả</label>
            <input
              id="author"
              type="text"
              placeholder="Tên anh..."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="content">Nội dung chi tiết</label>
          <textarea
            id="content"
            placeholder="Anh viết nội dung vào đây nhé..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            disabled={loading}
          />
        </div>

        <button type="submit" className={`btn-submit ${loading ? 'btn-loading' : ''}`} disabled={loading}>
          {loading ? (
            <><span className="mini-spinner"></span> Đang xử lý...</>
          ) : (
            '🚀 Xuất bản ngay'
          )}
        </button>
      </form>
    </div>
  );
}

export default ArticleForm;