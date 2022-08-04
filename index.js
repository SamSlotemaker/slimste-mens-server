const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const PORT = 5000;

const io = socketIo(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("New clientje connected");

  socket.on("add", ({ team, seconds }) => {
    io.emit("add", { team, seconds });
  });
  socket.on("changeTurn", ({ turn }) => {
    io.emit("changeTurn", turn);
  });
  socket.on("puzzleCorrect", ({ seconds }) => {
    console.log(seconds);
    io.emit("puzzleCorrect", seconds);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => {
  console.log(`server started at port ${PORT}`);
});
