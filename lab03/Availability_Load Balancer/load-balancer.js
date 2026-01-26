const http = require("http");

const servers = [
  { host: "localhost", port: 3001, alive: true },
  { host: "localhost", port: 3002, alive: true },
  { host: "localhost", port: 3003, alive: true },
];

let currentIndex = 0;

// Health check
setInterval(() => {
  servers.forEach(server => {
    const req = http.request(
      {
        host: server.host,
        port: server.port,
        timeout: 1000,
      },
      () => {
        server.alive = true;
      }
    );

    req.on("error", () => {
      server.alive = false;
    });

    req.on("timeout", () => {
      server.alive = false;
    });

    req.end();
  });
}, 5000);

// Chọn server còn sống (Round Robin)
function getNextServer() {
  const aliveServers = servers.filter(s => s.alive);
  if (aliveServers.length === 0) return null;

  currentIndex = (currentIndex + 1) % aliveServers.length;
  return aliveServers[currentIndex];
}

http.createServer((req, res) => {
  const target = getNextServer();

  if (!target) {
    res.writeHead(503);
    return res.end("Service Unavailable ❌");
  }

  const proxy = http.request(
    {
      host: target.host,
      port: target.port,
      path: req.url,
      method: req.method,
    },
    serverRes => {
      serverRes.pipe(res);
    }
  );

  proxy.on("error", () => {
    target.alive = false;
    res.writeHead(502);
    res.end("Bad Gateway ⚠️");
  });

  req.pipe(proxy);
}).listen(3000, () => {
  console.log("Load Balancer running on port 3000");
});
