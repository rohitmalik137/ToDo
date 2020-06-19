const express = require("express");
// const { body } = require('express-validator');

const todoController = require("../controllers/todo");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// GET /todo/tasks
router.get("/tasks", isAuth, todoController.getTasks);

// POST /todo/task
router.post("/task", isAuth, todoController.createTask);

// router.get('/task/:taskId', isAuth, todoController.getTask);

// PUT /todo/task-important/:taskId
router.put(
  "/task-important/:taskId",
  isAuth,
  todoController.updateImportantTask
);

// PUT /todo/task-complete/:taskId
router.put("/task-complete/:taskId", isAuth, todoController.updateCompleteTask);

// DELETE /todo/task/:taskId
router.delete("/task/:taskId", isAuth, todoController.deleteTask);

module.exports = router;
