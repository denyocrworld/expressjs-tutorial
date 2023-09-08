import express from "express";
const router = express.Router();
import { Task } from "../model/Task";

router.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
});

router.get("/", async (req: any, res: any) => {
  let tasks = await Task.findAll();
  res.json({
    data: tasks,
  });
});


router.get("/:id", async (req: any, res: any) => {
  let task = await Task.findByPk(req.params.id);
  res.json({
    data: task,
  });
});

router.post("/", async (req: any, res: any) => {
  let post = req.body;
  let result = await Task.create({
    title: post.title,
  });

  res.json({
    data: result,
  });
});

router.put("/:id", async (req: any, res: any) => {
  let data = req.body;
  let task = await Task.findByPk(req.params.id);
  task!.title = data.title;
  var result = await task?.save();

  res.json({
    data: result,
  });
});

router.delete("/:id", async (req: any, res: any) => {
  let task = await Task.findByPk(req.params.id);
  var result = await task?.destroy();

  res.json({
    data: result,
  });
});

module.exports = router;
