/**
 * Search Plugin
 * 
 * Plugin tìm kiếm bài viết theo từ khóa.
 * Minh họa khả năng plugin có thể tương tác với plugin khác thông qua Core.
 */

const SearchPlugin = {
  name: 'Search',
  version: '1.0.0',
  description: 'Tìm kiếm bài viết và danh mục',
  routes: [
    { method: 'GET', path: '/api/search?q=keyword' }
  ],

  init(app, core) {
    // GET - Tìm kiếm
    app.get('/api/search', (req, res) => {
      const query = (req.query.q || '').toLowerCase().trim();

      if (!query) {
        return res.status(400).json({ success: false, message: 'Vui lòng nhập từ khóa tìm kiếm' });
      }

      const results = [];

      // Tìm trong Articles plugin (tương tác cross-plugin qua Core)
      const articlePlugin = core.getPlugin('Articles');
      if (articlePlugin && typeof articlePlugin.getData === 'function') {
        const articles = articlePlugin.getData();
        const matchedArticles = articles.filter(a => {
          const titleMatch = a.title.toLowerCase().includes(query);
          const contentMatch = a.content.toLowerCase().includes(query);
          const authorMatch = a.author.toLowerCase().includes(query);
          
          // Tính điểm tương đối
          let score = 0;
          if (titleMatch) score += 3;
          if (contentMatch) score += 1;
          if (authorMatch) score += 2;
          
          return score > 0;
        }).map(a => {
          // Tính toán điểm số chi tiết
          const titleMatch = a.title.toLowerCase().includes(query);
          const contentMatch = a.content.toLowerCase().includes(query);
          const authorMatch = a.author.toLowerCase().includes(query);
          
          let score = 0;
          if (titleMatch) score += 3;
          if (contentMatch) score += 1;
          if (authorMatch) score += 2;
          
          return { ...a, score, type: 'article' };
        });
        
        matchedArticles.forEach(a => {
          results.push(a);
        });
      }

      // Tìm trong Categories plugin
      const categoryPlugin = core.getPlugin('Categories');
      if (categoryPlugin && typeof categoryPlugin.getData === 'function') {
        const categories = categoryPlugin.getData();
        const matchedCategories = categories.filter(c => {
          const nameMatch = c.name.toLowerCase().includes(query);
          const descriptionMatch = c.description.toLowerCase().includes(query);
          
          // Tính điểm tương đối
          let score = 0;
          if (nameMatch) score += 3;
          if (descriptionMatch) score += 1;
          
          return score > 0;
        }).map(c => {
          // Tính toán điểm số chi tiết
          const nameMatch = c.name.toLowerCase().includes(query);
          const descriptionMatch = c.description.toLowerCase().includes(query);
          
          let score = 0;
          if (nameMatch) score += 3;
          if (descriptionMatch) score += 1;
          
          return { ...c, score, type: 'category' };
        });
        
        matchedCategories.forEach(c => {
          results.push(c);
        });
      }

      // Sắp xếp kết quả theo điểm số giảm dần
      results.sort((a, b) => b.score - a.score);

      res.json({
        success: true,
        query,
        total: results.length,
        data: results
      });
    });
  }
};

module.exports = SearchPlugin;
