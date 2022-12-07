const express = require("express");
const router = express.Router();

const {
  getTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/task");

router.get("/health", async (req, res) => {
  res.json({
    status: "Success",
    message: "API is working",
  });
});

router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);

module.exports = router;
