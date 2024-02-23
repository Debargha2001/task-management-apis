const Task = require("../model/taskSchema");

const fetchAllTasks = async (req, res) => {
  try {
    const { priority, status } = req.query;
    const tasks = await Task.find({
      priority: priority ? priority : { $exists: true },
      status: status ? status : { $exists: true },
    });
    return res.status(200).json({
      error: false,
      data: tasks,
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message ?? "internal server error",
    });
  }
};
const fetchTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    return res.status(200).json({
      error: false,
      data: task,
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message ?? "internal server error",
    });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const newTask = await Task.create({
      title,
      description,
      status,
      priority,
    });
    return res.status(201).json({
      error: false,
      date: newTask,
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;
    const updateObject = {};
    if (title) {
      updateObject.title = title;
    }
    if (description) {
      updateObject.description = description;
    }
    if (status) {
      updateObject.status = status;
    }
    if (priority) {
      updateObject.priority = priority;
    }
    const updatedTask = await Task.updateOne(
      { _id: id },
      { $set: updateObject },
      { new: true }
    );
    return res.status(200).json({
      error: false,
      task: updatedTask,
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message ?? "internal server error",
    });
  }
};

const deleteTaskById = async (req, res) => {
  try{
    const task = await Task.deleteOne({_id: req.params.id});
    return res.status(200).json({
      error: false,
      data: task
    })
  }catch(err){
    return res.status(500).json({
      error: true,
      message: err.message ?? "internal server error",
    });
  }
}

module.exports = {
  fetchAllTasks,
  createTask,
  updateTask,
  fetchTaskById,
  deleteTaskById
};
