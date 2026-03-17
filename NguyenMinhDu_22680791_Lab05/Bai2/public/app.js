/**
 * CMS Frontend App
 * 
 * Tự động load danh sách plugins từ server
 * và render UI tương ứng cho từng plugin.
 */

// ========== State ==========
let currentView = 'dashboard';
let plugins = [];
let articles = [];
let categories = [];

// Plugin icons map
const pluginIcons = {
  'Articles': '📝',
  'Categories': '📁',
  'Search': '🔍'
};

// ========== Init ==========
document.addEventListener('DOMContentLoaded', () => {
  loadPlugins();
});

/**
 * Load danh sách plugins từ Core API
 */
async function loadPlugins() {
  try {
    const res = await fetch('/api/plugins');
    const data = await res.json();
    plugins = data.plugins || [];

    renderPluginNav();
    renderDashboardStats();
    renderDiagramPlugins();

    document.getElementById('pluginCount').textContent = `${plugins.length} plugin(s) loaded`;
  } catch (error) {
    console.error('Failed to load plugins:', error);
    showToast('Không thể kết nối đến server', 'error');
  }
}

/**
 * Render sidebar navigation từ danh sách plugins
 */
function renderPluginNav() {
  const nav = document.getElementById('pluginNav');

  // Dashboard item
  let html = `
    <div class="plugin-nav-item dashboard-item active" onclick="switchView('dashboard')" data-view="dashboard">
      <span class="plugin-nav-icon">🏠</span>
      <span class="plugin-nav-label">Dashboard</span>
    </div>
  `;

  // Plugin items
  plugins.forEach(plugin => {
    const icon = pluginIcons[plugin.name] || '🧩';
    html += `
      <div class="plugin-nav-item" onclick="switchView('${plugin.name}')" data-view="${plugin.name}">
        <span class="plugin-nav-icon">${icon}</span>
        <span class="plugin-nav-label">${plugin.name}</span>
        <span class="plugin-nav-version">v${plugin.version}</span>
      </div>
    `;
  });

  nav.innerHTML = html;
}

/**
 * Chuyển đổi view giữa các plugins
 */
function switchView(viewName) {
  currentView = viewName;

  // Update active nav item
  document.querySelectorAll('.plugin-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.view === viewName);
  });

  // Hide all views
  document.getElementById('dashboard').style.display = 'none';
  document.querySelectorAll('.plugin-view').forEach(v => v.style.display = 'none');

  // Show selected view
  if (viewName === 'dashboard') {
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('pageTitle').textContent = 'Dashboard';
    renderDashboardStats();
  } else {
    const viewEl = document.getElementById(`view-${viewName}`);
    if (viewEl) {
      viewEl.style.display = 'block';
      document.getElementById('pageTitle').textContent = viewName;

      // Load data for the view
      if (viewName === 'Articles') loadArticles();
      if (viewName === 'Categories') loadCategories();
    }
  }
}

// ========== Dashboard ==========
async function renderDashboardStats() {
  const grid = document.getElementById('statsGrid');

  try {
    const [artRes, catRes] = await Promise.all([
      fetch('/api/articles').then(r => r.json()).catch(() => ({ data: [] })),
      fetch('/api/categories').then(r => r.json()).catch(() => ({ data: [] }))
    ]);

    grid.innerHTML = `
      <div class="stat-card">
        <div class="stat-icon">🧩</div>
        <div class="stat-value">${plugins.length}</div>
        <div class="stat-label">Plugins Loaded</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📝</div>
        <div class="stat-value">${artRes.data ? artRes.data.length : 0}</div>
        <div class="stat-label">Bài viết</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📁</div>
        <div class="stat-value">${catRes.data ? catRes.data.length : 0}</div>
        <div class="stat-label">Danh mục</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">⚡</div>
        <div class="stat-value">Active</div>
        <div class="stat-label">Trạng thái hệ thống</div>
      </div>
    `;
  } catch (e) {
    console.error(e);
  }
}

function renderDiagramPlugins() {
  const container = document.getElementById('diagramPlugins');
  container.innerHTML = plugins.map(p =>
    `<div class="diagram-plugin-box">${pluginIcons[p.name] || '🧩'} ${p.name}</div>`
  ).join('');
}

// ========== Articles Plugin ==========
async function loadArticles() {
  try {
    const res = await fetch('/api/articles');
    const data = await res.json();
    articles = data.data || [];
    renderArticles();
  } catch (error) {
    showToast('Lỗi tải bài viết', 'error');
  }
}

function renderArticles() {
  const container = document.getElementById('articleList');

  if (articles.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">📝</span>
        <p>Chưa có bài viết nào. Hãy thêm bài viết đầu tiên!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = articles.map(article => `
    <div class="data-card">
      <div class="data-card-header">
        <div class="data-card-title">${escapeHtml(article.title)}</div>
        <div class="data-card-actions">
          <button class="btn btn-ghost btn-sm" onclick="editArticle('${article.id}')">✏️ Sửa</button>
          <button class="btn btn-danger btn-sm" onclick="deleteArticle('${article.id}')">🗑️ Xóa</button>
        </div>
      </div>
      <div class="data-card-body">${escapeHtml(article.content)}</div>
      <div class="data-card-meta">
        <span>👤 ${escapeHtml(article.author)}</span>
        <span>📅 ${formatDate(article.createdAt)}</span>
      </div>
    </div>
  `).join('');
}

function showArticleForm(article = null) {
  document.getElementById('articleFormCard').style.display = 'block';
  if (article) {
    document.getElementById('articleFormTitle').textContent = 'Sửa bài viết';
    document.getElementById('articleId').value = article.id;
    document.getElementById('articleTitle').value = article.title;
    document.getElementById('articleContent').value = article.content;
    document.getElementById('articleAuthor').value = article.author;
    document.getElementById('articleSubmitBtn').textContent = 'Cập nhật';
  } else {
    document.getElementById('articleFormTitle').textContent = 'Thêm bài viết mới';
    document.getElementById('articleId').value = '';
    document.getElementById('articleForm').reset();
    document.getElementById('articleAuthor').value = 'Admin';
    document.getElementById('articleSubmitBtn').textContent = 'Thêm';
  }
}

function hideArticleForm() {
  document.getElementById('articleFormCard').style.display = 'none';
  document.getElementById('articleForm').reset();
}

async function handleArticleSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('articleId').value;
  const payload = {
    title: document.getElementById('articleTitle').value,
    content: document.getElementById('articleContent').value,
    author: document.getElementById('articleAuthor').value
  };

  try {
    let res;
    if (id) {
      // Sửa bài viết
      res = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      // Thêm bài viết mới
      res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    const data = await res.json();
    if (data.success) {
      showToast(data.message, 'success');
      hideArticleForm();
      loadArticles();
    } else {
      showToast(data.message, 'error');
    }
  } catch (error) {
    showToast('Có lỗi xảy ra', 'error');
  }
}

function editArticle(id) {
  const article = articles.find(a => a.id === id);
  if (article) showArticleForm(article);
}

async function deleteArticle(id) {
  if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return;

  try {
    const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      showToast(data.message, 'success');
      loadArticles();
    } else {
      showToast(data.message, 'error');
    }
  } catch (error) {
    showToast('Có lỗi xảy ra khi xóa', 'error');
  }
}

// ========== Categories Plugin ==========
async function loadCategories() {
  try {
    const res = await fetch('/api/categories');
    const data = await res.json();
    categories = data.data || [];
    renderCategories();
  } catch (error) {
    showToast('Lỗi tải danh mục', 'error');
  }
}

function renderCategories() {
  const container = document.getElementById('categoryList');

  if (categories.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">📁</span>
        <p>Chưa có danh mục nào. Hãy thêm danh mục đầu tiên!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = categories.map(cat => `
    <div class="data-card">
      <div class="data-card-header">
        <div class="data-card-title">
          <span class="category-color-dot" style="background:${cat.color}"></span>
          ${escapeHtml(cat.name)}
        </div>
        <div class="data-card-actions">
          <button class="btn btn-ghost btn-sm" onclick="editCategory('${cat.id}')">✏️ Sửa</button>
          <button class="btn btn-danger btn-sm" onclick="deleteCategory('${cat.id}')">🗑️ Xóa</button>
        </div>
      </div>
      <div class="data-card-body">${escapeHtml(cat.description || 'Không có mô tả')}</div>
      <div class="data-card-meta">
        <span>📅 ${formatDate(cat.createdAt)}</span>
      </div>
    </div>
  `).join('');
}

function showCategoryForm(category = null) {
  document.getElementById('categoryFormCard').style.display = 'block';
  if (category) {
    document.getElementById('categoryFormTitle').textContent = 'Sửa danh mục';
    document.getElementById('categoryId').value = category.id;
    document.getElementById('categoryName').value = category.name;
    document.getElementById('categoryDescription').value = category.description || '';
    document.getElementById('categoryColor').value = category.color || '#6366f1';
    document.getElementById('categorySubmitBtn').textContent = 'Cập nhật';
  } else {
    document.getElementById('categoryFormTitle').textContent = 'Thêm danh mục mới';
    document.getElementById('categoryId').value = '';
    document.getElementById('categoryForm').reset();
    document.getElementById('categorySubmitBtn').textContent = 'Thêm';
  }
}

function hideCategoryForm() {
  document.getElementById('categoryFormCard').style.display = 'none';
  document.getElementById('categoryForm').reset();
}

async function handleCategorySubmit(e) {
  e.preventDefault();

  const id = document.getElementById('categoryId').value;
  const payload = {
    name: document.getElementById('categoryName').value,
    description: document.getElementById('categoryDescription').value,
    color: document.getElementById('categoryColor').value
  };

  try {
    let res;
    if (id) {
      res = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    const data = await res.json();
    if (data.success) {
      showToast(data.message, 'success');
      hideCategoryForm();
      loadCategories();
    } else {
      showToast(data.message, 'error');
    }
  } catch (error) {
    showToast('Có lỗi xảy ra', 'error');
  }
}

function editCategory(id) {
  const category = categories.find(c => c.id === id);
  if (category) showCategoryForm(category);
}

async function deleteCategory(id) {
  if (!confirm('Bạn có chắc muốn xóa danh mục này?')) return;

  try {
    const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      showToast(data.message, 'success');
      loadCategories();
    } else {
      showToast(data.message, 'error');
    }
  } catch (error) {
    showToast('Có lỗi xảy ra khi xóa', 'error');
  }
}

// ========== Search Plugin ==========
function handleSearch(e) {
  // Tìm kiếm khi nhấn Enter
  if (e.key === 'Enter') {
    performSearch();
  }
  // Tìm kiếm tức thì khi gõ (debounced)
  else {
    debounceSearch();
  }
}

// Debounce function để tránh gọi API quá nhiều
let searchTimeout;
function debounceSearch() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const query = document.getElementById('searchInput').value.trim();
    if (query.length >= 2) { // Chỉ tìm kiếm khi có ít nhất 2 ký tự
      performSearch();
    }
  }, 300); // 300ms delay
}

async function performSearch() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) {
    showToast('Vui lòng nhập từ khóa tìm kiếm', 'error');
    return;
  }

  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    renderSearchResults(data);
  } catch (error) {
    showToast('Lỗi tìm kiếm', 'error');
  }
}

function renderSearchResults(data) {
  const container = document.getElementById('searchResults');

  if (!data.data || data.data.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">😔</span>
        <p>Không tìm thấy kết quả cho "${escapeHtml(data.query)}"</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <p style="color: var(--text-muted); margin-bottom: 16px; font-size: 14px;">
      Tìm thấy <strong style="color: var(--accent-hover)">${data.total}</strong> kết quả cho "${escapeHtml(data.query)}"
    </p>
    ${data.data.map(item => `
      <div class="data-card">
        <div class="data-card-header">
          <div class="data-card-title">
            ${escapeHtml(item.title || item.name)}
            <span class="search-result-type type-${item.type}">${item.type}</span>
          </div>
        </div>
        <div class="data-card-body">${escapeHtml(item.content || item.description || '')}</div>
      </div>
    `).join('')}
  `;
}

// ========== Utilities ==========
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) toast.remove();
  }, 3000);
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
