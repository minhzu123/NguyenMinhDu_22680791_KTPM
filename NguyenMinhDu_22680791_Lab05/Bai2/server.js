/**
 * CMS Server - Entry Point
 * 
 * Khởi tạo Express server, load Core và tất cả plugins
 */

const express = require('express');
const path = require('path');
const CMSCore = require('./core');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// ========== Khởi tạo CMS Core (Microkernel) ==========
const cmsCore = new CMSCore();

// Tự động load tất cả plugins từ thư mục /plugins
cmsCore.loadPlugins();

// Khởi tạo plugins - mount routes vào Express app
cmsCore.initializePlugins(app);

// ========== Core API ==========

// API: Lấy danh sách plugins đã đăng ký
app.get('/api/plugins', (req, res) => {
  res.json({
    success: true,
    plugins: cmsCore.getPluginList()
  });
});

// ========== Start Server ==========
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🌐 CMS Server running at http://localhost:${PORT}`);
  console.log(`📦 Loaded plugins: ${cmsCore.getPluginList().map(p => p.name).join(', ')}`);
  console.log(`${'='.repeat(50)}\n`);
});
