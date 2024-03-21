const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { connect, connection } = require("mongoose");

// Load environment variables from .env file
require("dotenv").config();

const app = express();
const httpServer = createServer(app);

app.use(express.json());

// Generic error handler middleware
app.use((err, req, res, next) => {
  // If no status code is specified, use 500 as default
  const statusCode = err.statusCode || 500;
  // If no message is specified, use "Internal Server Error" as default
  const message = err.message || "Internal Server Error";
  // Log error to console
  console.error(err);
  // Return error message to client as JSON response
  res.status(statusCode).json({ message });
});

// Connect to MongoDB using Mongoose
connect(process.env.DB_URL, {
  dbName: "trello",
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Socket.io server
const io = new Server(httpServer, {
  // Allow all origins to connect to Socket.io server
  cors: {
    origin: "*",
  },
});

// When a client connects to the Socket.io server
io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);

  // When a client disconnects from the Socket.io server
  socket.on("disconnect", () => {
    // Log client ID to console
    console.log(`user disconnected ${socket.id}`);
  });
});

// Routes
app.use("/api/todos", require("./routes"));

// Start listening on port 3000
httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});
