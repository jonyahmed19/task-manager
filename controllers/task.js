const Task = require("../models/task");

exports.getTasks = async (req, res) => {
  try {
    let { sort: sortValue, page: items } = req.query;

    console.log("sortValue", sortValue);
    if (sortValue === undefined) {
      sortValue = 1;
    } else {
      sortValue = parseInt(sortValue);
    }
    if (items === undefined || items === 1) {
      items = 0;
    } else {
      items = 10 * (parseInt(items) - 1);
    }

    const tasks = await Task.aggregate([
      { $sort: { updatedAt: sortValue } },
      { $skip: items },
      { $limit: 10 },
    ]);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json(`No task with id : ${id}`);
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json(`No task with id : ${id}`);
    }
    // res.status(200).json(task);
    res.status(200).send("Task deleted");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json(`No task with id : ${id}`);
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
