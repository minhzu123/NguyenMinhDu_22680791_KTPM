/**
 * Category Plugin
 * 
 * Plugin quản lý danh mục với 3 chức năng:
 * - Thêm danh mục (Create)
 * - Sửa danh mục (Update)
 * - Xóa danh mục (Delete)
 */

const { v4: uuidv4 } = require('uuid');

// In-memory data store
let categories = [
  {
    id: '1',
    name: 'Công nghệ',
    description: 'Bài viết về công nghệ và lập trình',
    color: '#6366f1',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Tin tức',
    description: 'Tin tức cập nhật hàng ngày',
    color: '#f59e0b',
    createdAt: new Date().toISOString()
  }
];

const CategoryPlugin = {
  name: 'Categories',
  version: '1.0.0',
  description: 'Quản lý danh mục - Thêm, Sửa, Xóa',
  routes: [
    { method: 'GET', path: '/api/categories' },
    { method: 'POST', path: '/api/categories' },
    { method: 'PUT', path: '/api/categories/:id' },
    { method: 'DELETE', path: '/api/categories/:id' }
  ],

  init(app, core) {
    // GET - Lấy tất cả danh mục
    app.get('/api/categories', (req, res) => {
      res.json({ success: true, data: categories });
    });

    // POST - Thêm danh mục mới
    app.post('/api/categories', (req, res) => {
      const { name, description, color } = req.body;

      if (!name) {
        return res.status(400).json({ success: false, message: 'Tên danh mục là bắt buộc' });
      }

      const newCategory = {
        id: uuidv4(),
        name,
        description: description || '',
        color: color || '#6366f1',
        createdAt: new Date().toISOString()
      };

      categories.push(newCategory);
      res.status(201).json({ success: true, data: newCategory, message: 'Thêm danh mục thành công' });
    });

    // PUT - Sửa danh mục
    app.put('/api/categories/:id', (req, res) => {
      const index = categories.findIndex(c => c.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy danh mục' });
      }

      const { name, description, color } = req.body;
      categories[index] = {
        ...categories[index],
        name: name || categories[index].name,
        description: description !== undefined ? description : categories[index].description,
        color: color || categories[index].color
      };

      res.json({ success: true, data: categories[index], message: 'Cập nhật danh mục thành công' });
    });

    // DELETE - Xóa danh mục
    app.delete('/api/categories/:id', (req, res) => {
      const index = categories.findIndex(c => c.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy danh mục' });
      }

      const deleted = categories.splice(index, 1);
      res.json({ success: true, data: deleted[0], message: 'Xóa danh mục thành công' });
    });

    this.getData = () => categories;
  }
};

module.exports = CategoryPlugin;
