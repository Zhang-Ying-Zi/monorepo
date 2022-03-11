const http = require("http");
const fs = require("fs");
const server = http.createServer();

server.listen(8080, () => {
  console.log("Server running on port 8080");
});

server.on("request", (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    return res.end(fs.readFileSync(__dirname + "/index.html"));
  }

  if (req.url.startsWith("/upload") && req.method == "POST") {
    const query = new URLSearchParams(req.url);
    const fileName = query.get("/upload?fileName");

    req.on("data", (chunk) => {
      fs.appendFileSync(fileName, chunk);
    });

    return res.end("Yay! File is uploaded.");
  }
});
