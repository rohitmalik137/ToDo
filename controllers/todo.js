const fs = require('fs');
const path = require('path');

const Todo = require('../models/todo');

exports.getTasks = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Todo.find({ userId: id })
    .sort({ createdAt: -1 })
    .then((tasks) => {
      res.status(200).json({
        message: 'Fetched tasks successfully.',
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
  const { task, important, completed } = req.body;
  const id = req.params.id;
  const addTask = new Todo({
    task: task,
    completed: completed,
    important: important,
    userId: id,
  });
  addTask
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Task added successfully!',
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
  Todo.findById(taskId)
    .then((task) => {
      if (!task) {
        const error = new Error('Could not find task.');
        error.statusCode = 404;
        throw error;
      }
      task.completed = !task.completed;
      return task.save();
    })
    .then((result) => {
      res.status(200).json({ message: 'Task updated!', task: result });
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};

exports.updateImportantTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Todo.findById(taskId)
    .then((task) => {
      if (!task) {
        const error = new Error('Could not find task.');
        error.statusCode = 404;
        throw error;
      }
      task.important = !task.important;
      return task.save();
    })
    .then((result) => {
      res.status(200).json({ message: 'Task updated!', task: result });
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};

exports.deleteTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Todo.findById(taskId)
    .then((task) => {
      if (!task) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      // Check logged in user
      return Todo.findByIdAndRemove(taskId);
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: 'Deleted task.' });
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};
