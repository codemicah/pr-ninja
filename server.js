const express = require("express");
const request = require("request");
const socket = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("link", (data) => {
    const url = data;
    request(url, (req, res, body) => {
      socket.emit("content", body);
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
