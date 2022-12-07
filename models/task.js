const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a task"],
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["normal", "medium", "high"],
      default: "normal",
    },
    status: {
      type: String,
      enum: ["up comming", "on prograss", "completed"],
      required: [true, "Status must not be empty!"],
      default: "up comming",
    },
  },
  { timestamps: true, versionKey: false }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
