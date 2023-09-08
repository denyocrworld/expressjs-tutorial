// index.ts
import express from "express";
import sequelize from "./database/database_config";
import { Task } from "./model/Task";
const userRouter = require("./router/user_router");
const productRouter = require("./router/product_router");
const taskRouter = require("./router/task_router");

// Inisialisasi aplikasi Express
const app = express();

// Sinkronisasi model dengan database SQLite

sequelize.addModels([Task]);
// Task.sync({force: true});

sequelize.sync({ force: true }).then(() => {
  console.log("Database dan tabel telah dibuat!");
});

// Middleware untuk mengizinkan parsing JSON
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, TypeScript Express!");
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/tasks", taskRouter);

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
