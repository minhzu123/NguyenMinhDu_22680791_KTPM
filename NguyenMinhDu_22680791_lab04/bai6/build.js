const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, 'src', 'index.js');
const distDir = path.join(__dirname, 'dist');
const distFile = path.join(distDir, 'index.js');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

fs.copyFileSync(srcFile, distFile);
console.log('Build completed: dist/index.js created');
