const fs = require("fs");
const path = require("path");

const Todo = require("../models/todo");

exports.getTasks = (req, res, next) => {
  Todo.find()
    .sort({ createdAt: -1 })
    .then((tasks) => {
      res.status(200).json({
        message: "Fetched tasks successfully.",
        tasks: tasks,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createTask = (req, res, next) => {
  const task = req.body.task;
  const addTask = new Todo({
    task: task,
  });
  addTask
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Task added successfully!",
        task: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateCompleteTask = (req, res, next) => {
  const taskId = req.params.taskId;
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error('Validation failed, entered data is incorrect.');
  //   error.statusCode = 422;
  //   throw error;
  // }
  const completed = req.body.completed;
  Todo.findById(taskId)
    .then((task) => {
      if (!task) {
        const error = new Error("Could not find task.");
        error.statusCode = 404;
        throw error;
      }
      task.completed = completed;
      return task.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Task updated!", task: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateImportantTask = (req, res, next) => {
  const taskId = req.params.taskId;
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error('Validation failed, entered data is incorrect.');
  //   error.statusCode = 422;
  //   throw error;
  // }
  const important = req.body.important;
  Todo.findById(taskId)
    .then((task) => {
      if (!task) {
        const error = new Error("Could not find task.");
        error.statusCode = 404;
        throw error;
      }
      task.important = important;
      return task.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Task updated!", task: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Todo.findById(taskId)
    .then((task) => {
      if (!task) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      // Check logged in user
      return Todo.findByIdAndRemove(taskId);
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Deleted task." });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
