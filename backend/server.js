const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
const initSocket = require('./socket');

const authRoutes = require("./routes/authRoutes");
const mapRoutes = require("./routes/mapRoutes");
const messageRoutes = require("./routes/messageRoutes");
const roomRoutes = require("./routes/roomRoutes");
const sprintRoutes = require("./routes/sprintRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/maps", mapRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/sprints", sprintRoutes);
app.use("/api/tasks", taskRoutes);

const httpServer = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 4000;

    
    initSocket(httpServer);

    httpServer.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
      console.log(" MongoDB connected successfully");
    });
  })
  .catch((err) => console.error(" Database connection failed:", err));