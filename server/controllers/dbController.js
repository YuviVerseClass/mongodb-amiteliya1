const Task = require('../models/Task');

// מחזיר את כל המשימות
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// מוסיף משימה חדשה
exports.addTask = async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add task' });
  }
};

// משנה את הסטטוס של המשימה (true <-> false)
exports.toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.done = !task.done;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: 'Failed to toggle task' });
  }
};

// מוחק משימה
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete task' });
  }
};

