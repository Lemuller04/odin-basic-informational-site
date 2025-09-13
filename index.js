import http from "node:http";
import fs from "node:fs/promises";

const getFile = async (fileName) => {
  let data = null;
  try {
    data = await fs.readFile(
      `/home/leonardo/repos/odin-basic-informational-site/${fileName}`,
      { encoding: "utf8" },
    );
  } catch (err) {
    console.error(err);
  }

  return data;
};

const server = http
  .createServer((req, res) => {
    try {
      if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });

        (async () => {
          const data = await getFile("index.html");

          if (data) {
            res.end(data.toString());
          } else {
            throw new Error("Couldn't get index page");
          }
        })();
      } else if (req.url === "/about" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });

        (async () => {
          const data = await getFile("about.html");

          if (data) {
            res.end(data.toString());
          } else {
            throw new Error("Couldn't get about page");
          }
        })();
      } else if (req.url === "/contact" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });

        (async () => {
          const data = await getFile("contact.html");

          if (data) {
            res.end(data.toString());
          } else {
            throw new Error("Couldn't get contact page");
          }
        })();
      } else {
        res.writeHead(404, { "Content-Type": "text/html" });

        (async () => {
          const data = await getFile("404.html");

          if (data) {
            res.end(data.toString());
          } else {
            throw new Error("Couldn't get error page");
          }
        })();
      }
    } catch (err) {
      console.error(err);
      res.end("error" + err);
    }
  })
  .listen(8888);
