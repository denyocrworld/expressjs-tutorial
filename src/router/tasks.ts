import express from "express";
const router = express.Router();
import { Task } from "../model/task";
import { Op } from "sequelize";
/*
router.get("/", async (req: any, res: any) => {
  let tasks = await Task.findAll();
  res.json({
    data: tasks,
  });
});
*/

/*
router.get("/", async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page || "1"); // Halaman default 1 jika tidak ada query parameter 'page'
    const perPage = parseInt(req.query.perPage || "10"); // Jumlah item per halaman default 10 jika tidak ada query parameter 'perPage'

    const offset = (page - 1) * perPage; // Hitung offset berdasarkan halaman dan jumlah item per halaman
    const totalCount = await Task.count(); // Hitung total jumlah task
    const totalPages = Math.ceil(totalCount / perPage); // Hitung total halaman berdasarkan jumlah item per halaman

    const tasks = await Task.findAll({
      offset,
      limit: perPage,
    });

    res.json({
      data: tasks,
      page,
      perPage,
      totalItems: totalCount,
      totalPages,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});
*/

// Rute GET dengan paginasi, pencarian, dan pengurutan
router.get("/", async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page || "1");
    const perPage = parseInt(req.query.perPage || "10");
    const search = req.query.search || "";
    const sortField = req.query.sort_field || "createdAt"; 
    const sortOrder = req.query.sort_order || "asc"; 

    const offset = (page - 1) * perPage; 
    const whereClause = {
      title: {
        [Op.like]: `%${search}%`,
      },
    };

    const totalCount = await Task.count({
      where: whereClause,
    }); 
    const totalPages = Math.ceil(totalCount / perPage);

    const tasks = await Task.findAll({
      where: whereClause,
      offset,
      limit: perPage,
      order: [[sortField, sortOrder]],
    });

    res.json({
      data: tasks,
      page: page,
      per_page: perPage,
      total_items: totalCount,
      total_pages: totalPages,
      search: search,
      sort_field: sortField,
      sort_order: sortOrder,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
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

export default router;
