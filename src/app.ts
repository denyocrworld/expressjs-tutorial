// index.ts
import express from "express";
const fs = require("fs");
const path = require("path");

import taskRouter from "./router/tasks";
import userRouter from "./router/user_router";
import { User } from "./model/user";
import { exit } from "process";
import router from "./router/tasks";
import { Task } from "./model/task";
import DB from "./database/database_config";

const app = express();

DB.addModels([Task, User]);
DB.sync({ force: true }).then(() => {
  console.log("Database dan tabel telah dibuat!");
});

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, TypeScript Express!");
});

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
