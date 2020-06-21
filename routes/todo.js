const express = require('express');
// const { body } = require('express-validator');

const todoController = require('../controllers/todo');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /todo/tasks
router.get('/tasks/:id', isAuth, todoController.getTasks);

// POST /todo/task
router.post('/task/:id', isAuth, todoController.createTask);

// router.get('/task/:taskId', isAuth, todoController.getTask);

// PUT /todo/task-important/:taskId
router.put('/task-important/:taskId', todoController.updateImportantTask);

// PUT /todo/task-complete/:taskId
router.put('/task-complete/:taskId', todoController.updateCompleteTask);

// DELETE /todo/task/:taskId
router.delete('/task/:taskId', isAuth, todoController.deleteTask);

module.exports = router;
