import http from "node:http";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getFile(fileName) {
  try {
    return await fs.readFile(join(__dirname, fileName), "utf8");
  } catch {
    return null;
  }
}

const routes = {
  "/": "index.html",
  "/about": "about.html",
  "/contact-me": "contact.html",
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method !== "GET") {
    res.writeHead(405, { "Content-Type": "text/plain" });
    return res.end("Method not allowed");
  }

  const fileName = routes[url.pathname] || "404.html";
  const data = await getFile(fileName);

  if (data) {
    res.writeHead(fileName === "404.html" ? 404 : 200, {
      "Content-Type": "text/html",
    });
    res.end(data);
  } else {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal server error");
  }
});

server.listen(8888, () =>
  console.log("Server running at http://localhost:8888"),
);
