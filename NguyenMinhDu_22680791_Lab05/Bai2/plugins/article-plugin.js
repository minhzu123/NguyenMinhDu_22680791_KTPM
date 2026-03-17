/**
 * Article Plugin
 * 
 * Plugin quản lý bài viết với 3 chức năng cơ bản:
 * - Thêm bài viết (Create)
 * - Sửa bài viết (Update)
 * - Xóa bài viết (Delete)
 */

const { v4: uuidv4 } = require('uuid');

// In-memory data store
let articles = [
  {
    id: '1',
    title: 'Chào mừng đến CMS',
    content: 'Đây là bài viết mẫu đầu tiên trong hệ thống CMS sử dụng kiến trúc Microkernel.',
    author: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Kiến trúc Plugin',
    content: 'Hệ thống CMS này được xây dựng theo kiến trúc Microkernel. Mỗi chức năng là một plugin độc lập.',
    author: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const ArticlePlugin = {
  name: 'Articles',
  version: '1.0.0',
  description: 'Quản lý bài viết - Thêm, Sửa, Xóa',
  routes: [
    { method: 'GET', path: '/api/articles' },
    { method: 'POST', path: '/api/articles' },
    { method: 'PUT', path: '/api/articles/:id' },
    { method: 'DELETE', path: '/api/articles/:id' }
  ],

  /**
   * Khởi tạo plugin - đăng ký routes vào Express app
   */
  init(app, core) {
    // GET - Lấy tất cả bài viết
    app.get('/api/articles', (req, res) => {
      res.json({ success: true, data: articles });
    });

    // GET - Lấy một bài viết theo ID
    app.get('/api/articles/:id', (req, res) => {
      const article = articles.find(a => a.id === req.params.id);
      if (!article) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
      }
      res.json({ success: true, data: article });
    });

    // POST - Thêm bài viết mới
    app.post('/api/articles', (req, res) => {
      const { title, content, author } = req.body;

      if (!title || !content) {
        return res.status(400).json({ success: false, message: 'Title và Content là bắt buộc' });
      }

      const newArticle = {
        id: uuidv4(),
        title,
        content,
        author: author || 'Anonymous',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      articles.push(newArticle);
      res.status(201).json({ success: true, data: newArticle, message: 'Thêm bài viết thành công' });
    });

    // PUT - Sửa bài viết
    app.put('/api/articles/:id', (req, res) => {
      const index = articles.findIndex(a => a.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
      }

      const { title, content, author } = req.body;
      articles[index] = {
        ...articles[index],
        title: title || articles[index].title,
        content: content || articles[index].content,
        author: author || articles[index].author,
        updatedAt: new Date().toISOString()
      };

      res.json({ success: true, data: articles[index], message: 'Cập nhật bài viết thành công' });
    });

    // DELETE - Xóa bài viết
    app.delete('/api/articles/:id', (req, res) => {
      const index = articles.findIndex(a => a.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
      }

      const deleted = articles.splice(index, 1);
      res.json({ success: true, data: deleted[0], message: 'Xóa bài viết thành công' });
    });

    // Expose data cho plugins khác (e.g. Search plugin)
    this.getData = () => articles;
  }
};

module.exports = ArticlePlugin;
