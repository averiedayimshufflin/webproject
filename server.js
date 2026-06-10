const http = require("http");
const fs = require("fs");
const path = require("path");
const makeupLooks = require("./data/makeupLooks");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
const VIEWS_DIR = path.join(__dirname, "views");

const mimeTypes = {
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".html": "text/html",
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function readView(fileName) {
  return fs.readFileSync(path.join(VIEWS_DIR, fileName), "utf8");
}

function render(template, values) {
  return Object.entries(values).reduce(
    (html, [key, value]) => html.replaceAll(`{{${key}}}`, value),
    template
  );
}

function difficultyClass(difficulty) {
  return difficulty.toLowerCase();
}

function renderCards() {
  return makeupLooks
    .map(
      (look) => `
        <article class="look-card">
          <img src="${look.image}" alt="${escapeHtml(look.name)} makeup look">
          <div class="card-body">
            <div class="card-meta">
              <span>${escapeHtml(look.category)}</span>
              <span class="difficulty ${difficultyClass(look.difficulty)}">${escapeHtml(
        look.difficulty
      )}</span>
            </div>
            <h2>${escapeHtml(look.name)}</h2>
            <p>${escapeHtml(look.description)}</p>
            <a href="/looks/${look.id}" role="button">View Details</a>
          </div>
        </article>
      `
    )
    .join("");
}

function renderProductList(products) {
  return products
    .split(",")
    .map((product) => `<li>${escapeHtml(product.trim())}</li>`)
    .join("");
}

function sendHtml(res, statusCode, html) {
  res.writeHead(statusCode, { "Content-Type": "text/html" });
  res.end(html);
}

function send404(res) {
  const html = readView("404.html");
  sendHtml(res, 404, html);
}

function serveStatic(req, res) {
  const filePath = path.normalize(path.join(PUBLIC_DIR, req.url));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    send404(res);
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      send404(res);
      return;
    }

    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  if (pathname.startsWith("/styles.css") || pathname.startsWith("/images/")) {
    serveStatic({ ...req, url: pathname }, res);
    return;
  }

  if (pathname === "/") {
    const html = render(readView("index.html"), {
      looks: renderCards(),
    });
    sendHtml(res, 200, html);
    return;
  }

  if (pathname.startsWith("/looks/")) {
    const id = pathname.split("/").pop();
    const look = makeupLooks.find((item) => item.id === id);

    if (!look) {
      send404(res);
      return;
    }

    const html = render(readView("detail.html"), {
      name: escapeHtml(look.name),
      category: escapeHtml(look.category),
      difficulty: escapeHtml(look.difficulty),
      difficultyClass: difficultyClass(look.difficulty),
      occasion: escapeHtml(look.occasion),
      time: escapeHtml(look.time),
      products: renderProductList(look.products),
      description: escapeHtml(look.description),
      tip: escapeHtml(look.tip),
      image: look.image,
    });
    sendHtml(res, 200, html);
    return;
  }

  send404(res);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Glow Guide is running at http://localhost:${PORT}`);
});
