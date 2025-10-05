const http = require("http");
const { URL } = require("url");

const PORT = process.env.MOCK_PRUEBA_PORT || 3000;

const usersPage2 = {
  page: 2,
  per_page: 6,
  total: 12,
  total_pages: 2,
  data: [
    {
      id: 7,
      email: "michael.lawson@mock-prueba.in",
      first_name: "Michael",
      last_name: "Lawson",
      avatar: "https://mock-prueba.in/img/faces/7-image.jpg"
    },
    {
      id: 8,
      email: "lindsay.ferguson@mock-prueba.in",
      first_name: "Lindsay",
      last_name: "Ferguson",
      avatar: "https://mock-prueba.in/img/faces/8-image.jpg"
    },
    {
      id: 9,
      email: "tobias.funke@mock-prueba.in",
      first_name: "Tobias",
      last_name: "Funke",
      avatar: "https://mock-prueba.in/img/faces/9-image.jpg"
    },
    {
      id: 10,
      email: "byron.fields@mock-prueba.in",
      first_name: "Byron",
      last_name: "Fields",
      avatar: "https://mock-prueba.in/img/faces/10-image.jpg"
    },
    {
      id: 11,
      email: "george.edwards@mock-prueba.in",
      first_name: "George",
      last_name: "Edwards",
      avatar: "https://mock-prueba.in/img/faces/11-image.jpg"
    },
    {
      id: 12,
      email: "rachel.howell@mock-prueba.in",
      first_name: "Rachel",
      last_name: "Howell",
      avatar: "https://mock-prueba.in/img/faces/12-image.jpg"
    }
  ],
  support: {
    url: "https://mock-prueba.in/#support-heading",
    text: "mock-prueba: servicio de datos de ejemplo para pruebas automatizadas"
  }
};

const usersById = usersPage2.data.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});

const validUser = {
  email: "eve.holt@mock-prueba.in",
  password: "cityslicka",
  token: "mock-prueba-token-123"
};

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

async function parseBody(req) {
  return await new Promise((resolve, reject) => {
    let data = "";

    req.on("data", chunk => {
      data += chunk;
      if (data.length > 1e6) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });

    req.on("end", () => {
      if (!data) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
}

function handleGetUsers(req, res, url) {
  const page = url.searchParams.get("page") || "1";

  if (page === "2") {
    sendJson(res, 200, usersPage2);
    return;
  }

  const emptyPage = {
    page: Number(page),
    per_page: usersPage2.per_page,
    total: usersPage2.total,
    total_pages: usersPage2.total_pages,
    data: []
  };

  sendJson(res, 200, emptyPage);
}

function handleGetUserById(res, id) {
  const numericId = Number(id);
  const user = usersById[numericId];

  if (!user) {
    sendJson(res, 404, {});
    return;
  }

  sendJson(res, 200, { data: user });
}

async function handleLogin(req, res) {
  let payload;

  try {
    payload = await parseBody(req);
  } catch (error) {
    sendJson(res, 400, { error: "Invalid JSON payload" });
    return;
  }

  if (!payload.email) {
    sendJson(res, 400, { error: "Missing email or username" });
    return;
  }

  if (!payload.password) {
    sendJson(res, 400, { error: "Missing password" });
    return;
  }

  const hasValidCredentials =
    payload.email === validUser.email && payload.password === validUser.password;

  if (!hasValidCredentials) {
    sendJson(res, 400, { error: "user not found" });
    return;
  }

  sendJson(res, 200, { token: validUser.token });
}

function requestListener(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/api/users") {
    handleGetUsers(req, res, url);
    return;
  }

  if (req.method === "GET" && url.pathname.startsWith("/api/users/")) {
    const id = url.pathname.split("/").pop();
    handleGetUserById(res, id);
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/login") {
    handleLogin(req, res);
    return;
  }

  sendJson(res, 404, { error: "Not found" });
}

const server = http.createServer(requestListener);

function start() {
  return new Promise(resolve => {
    server.listen(PORT, () => {
      console.log(`mock-prueba API running on http://localhost:${PORT}/api`);
      resolve(server);
    });
  });
}

function stop() {
  return new Promise(resolve => server.close(resolve));
}

if (require.main === module) {
  start();
}

module.exports = { start, stop, server };
