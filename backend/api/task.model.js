const { model, Schema } = require("mongoose");

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    groupId: {
      type: Number,
      required: true,
      min: 1,
      max: 2
    },
    priority: {
      type: Number,
      required: true,
      min: 1,
      max: 3,
    },
    longDesc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", TaskSchema);
module.exports = Task;
