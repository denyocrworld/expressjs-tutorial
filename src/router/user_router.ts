import express from "express";
const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.json({
    message: `GET ${req.query.search}`,
  });
});

router.post("/", (req: any, res: any) => {
  res.json({
    message: `POST`,
    header: req.headers,
    data: req.body,
  });
});

router.put("/:id", (req: any, res: any) => {
  res.json({
    message: `PUT: ${req.params.id} `,
  });
});

router.delete("/:id", (req: any, res: any) => {
  res.json({
    message: "Delete",
  });
});

module.exports = router;
