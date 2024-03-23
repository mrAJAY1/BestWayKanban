const socketIo = require("socket.io");
let io;

function initSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    console.log(`user ${socket.id} connected`);
    socket.emit("connected", { message: "Real time updates active" });
    socket.on("cardShift", (data) => {
      console.log(data);
      socket.broadcast.emit("receiveShift", data);
    });
    socket.on("cardCreation", (data) => {
      socket.broadcast.emit("receiveCreation", data);
    });
    socket.on("disconnect", (socket) => {
      console.log(`user ${socket.id} disconnected`);
    });
  });
  return io;
}

function getIo() {
  if (!io) {
    throw new Error("Socket.IO has not been initialized");
  }
  return io;
}

module.exports = { initSocket, getIo };
