const http = require("http");

const PORT = process.argv[2];

http.createServer((req, res) => {
  res.end(`Hello from Server ${PORT}`);
}).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
