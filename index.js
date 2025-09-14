import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import express from "express";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const routes = {
  "/": "index.html",
  "/about": "about.html",
  "/contact-me": "contact-me.html",
};

app.get(Object.keys(routes), (req, res) => {
  const fileName = routes[req.path];
  res.sendFile(join(__dirname, fileName));
});

app.use((req, res) => {
  res.status(404).sendFile(join(__dirname, "404.html"));
});

const PORT = 8888;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on port ${PORT}.`);
});
