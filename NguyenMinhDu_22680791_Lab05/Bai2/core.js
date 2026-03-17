/**
 * CMS Core - Microkernel
 * 
 * Core chỉ chứa Plugin Registry và Plugin Loader.
 * Tất cả business logic nằm trong các plugins.
 */

const fs = require('fs');
const path = require('path');

class CMSCore {
  constructor() {
    // Plugin Registry - lưu trữ tất cả plugins đã đăng ký
    this.plugins = new Map();
    this.pluginDir = path.join(__dirname, 'plugins');
  }

  /**
   * Đăng ký một plugin vào core
   * Mỗi plugin phải có: { name, version, description, init(app, core) }
   */
  registerPlugin(plugin) {
    if (!plugin.name) {
      throw new Error('Plugin must have a name');
    }
    if (this.plugins.has(plugin.name)) {
      console.warn(`⚠️  Plugin "${plugin.name}" already registered. Skipping.`);
      return;
    }
    this.plugins.set(plugin.name, plugin);
    console.log(`✅ Plugin registered: "${plugin.name}" v${plugin.version || '1.0.0'}`);
  }

  /**
   * Tự động load tất cả plugins từ thư mục /plugins
   */
  loadPlugins() {
    if (!fs.existsSync(this.pluginDir)) {
      console.log('📁 Plugin directory not found. Creating...');
      fs.mkdirSync(this.pluginDir, { recursive: true });
      return;
    }

    const pluginFiles = fs.readdirSync(this.pluginDir)
      .filter(file => file.endsWith('-plugin.js'));

    console.log(`\n🔍 Found ${pluginFiles.length} plugin(s) in /plugins directory`);

    for (const file of pluginFiles) {
      try {
        const pluginPath = path.join(this.pluginDir, file);
        const plugin = require(pluginPath);
        this.registerPlugin(plugin);
      } catch (error) {
        console.error(`❌ Failed to load plugin "${file}":`, error.message);
      }
    }
  }

  /**
   * Khởi tạo tất cả plugins - mount routes vào Express app
   */
  initializePlugins(app) {
    console.log(`\n🚀 Initializing ${this.plugins.size} plugin(s)...\n`);

    for (const [name, plugin] of this.plugins) {
      try {
        if (typeof plugin.init === 'function') {
          plugin.init(app, this);
          console.log(`   ✅ "${name}" initialized successfully`);
        } else {
          console.warn(`   ⚠️  "${name}" has no init() method`);
        }
      } catch (error) {
        console.error(`   ❌ Failed to initialize "${name}":`, error.message);
      }
    }
  }

  /**
   * Lấy danh sách plugins đã đăng ký (cho API /api/plugins)
   */
  getPluginList() {
    const list = [];
    for (const [name, plugin] of this.plugins) {
      list.push({
        name: plugin.name,
        version: plugin.version || '1.0.0',
        description: plugin.description || '',
        routes: plugin.routes || []
      });
    }
    return list;
  }

  /**
   * Lấy plugin theo tên
   */
  getPlugin(name) {
    return this.plugins.get(name);
  }

  /**
   * Gỡ bỏ plugin
   */
  unregisterPlugin(name) {
    if (this.plugins.has(name)) {
      this.plugins.delete(name);
      console.log(`🗑️  Plugin "${name}" unregistered`);
      return true;
    }
    return false;
  }
}

module.exports = CMSCore;
