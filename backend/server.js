const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoutes = require ("./routes/authRoutes");
const  mapRoutes = require ("./routes/mapRoutes");
const messageRoutes = require ("./routes/messageRoutes");
const roomRoutes = require ("./routes/roomRoutes");
const sprintRoutes = require ("./routes/sprintRoutes");
const taskRoutes = require ("./routes/taskRoutes");

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

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    app.listen(process.env.PORT || 4000, ()=>{
        console.log(`server is running on port ${process.env.PORT || 4000}`);
    });
})
.catch((err) => console.error("database connection failed:", err))

