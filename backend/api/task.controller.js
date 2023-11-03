const status = require("http-status");
const Task = require("./task.model");

class TaskController {
  // Add task to database (This will not be used in frontend, just for filling database)
  async addTask(req, res) {
    const { title, groupId, priority, longDesc } = req.body;

    try {
      let task = await Task.findOne({ $or: [{ title }, { longDesc }] });
      if (task) {
        return res.status(status.CONFLICT).json({
          success: false,
          status: status[status.CONFLICT],
          errors: ["Task already existing in database!"],
          data: null,
        });
      }

      task = new Task({
        title,
        groupId,
        priority,
        longDesc,
      });

      await task.save();

      res.status(status.CREATED).json({
        success: true,
        status: status[status.CREATED],
        errors: [],
        data: { task },
      });
    } catch (error) {
      res.status(status.INTERNAL_SERVER_ERROR).json({
        success: false,
        status: status[status.INTERNAL_SERVER_ERROR],
        errors: [error.message],
        data: null,
      });
    }
  }

  // Fetch all task list sorted standardly (Database order)
  async getAllTaskListStandard(req, res) {
    try {
      let taskList = await Task.find();
      if (taskList?.length < 1) {
        return res.status(status.NOT_FOUND).json({
          success: false,
          status: status[status.NOT_FOUND],
          errors: ["Could not find any tasks!"],
          data: null,
        });
      }

      res.status(status.OK).json({
        success: true,
        status: status[status.OK],
        errors: [],
        data: { taskList },
      });
    } catch (error) {
      console.log(error);
      res.status(status.INTERNAL_SERVER_ERROR).json({
        success: false,
        status: status[status.INTERNAL_SERVER_ERROR],
        errors: [error.message],
        data: null,
      });
    }
  }

  // Fetch all task list sorted by creation date (ascendent order)
  async getAllTaskListByCreationDateAsc(req, res) {
    try {
      let taskList = await Task.find().sort({ createdAt: 1 });
      if (taskList?.length < 1) {
        return res.status(status.NOT_FOUND).json({
          success: false,
          status: status[status.NOT_FOUND],
          errors: ["Could not find any tasks!"],
          data: null,
        });
      }

      res.status(status.OK).json({
        success: true,
        status: status[status.OK],
        errors: [],
        data: { taskList },
      });
    } catch (error) {
      console.log(error);
      res.status(status.INTERNAL_SERVER_ERROR).json({
        success: false,
        status: status[status.INTERNAL_SERVER_ERROR],
        errors: [error.message],
        data: null,
      });
    }
  }

  // Fetch all task list sorted by creation date (descendent order)
  async getAllTaskListByCreationDateDesc(req, res) {
    try {
      let taskList = await Task.find().sort({ createdAt: -1 });
      if (taskList?.length < 1) {
        return res.status(status.NOT_FOUND).json({
          success: false,
          status: status[status.NOT_FOUND],
          errors: ["Could not find any tasks!"],
          data: null,
        });
      }

      res.status(status.OK).json({
        success: true,
        status: status[status.OK],
        errors: [],
        data: { taskList },
      });
    } catch (error) {
      console.log(error);
      res.status(status.INTERNAL_SERVER_ERROR).json({
        success: false,
        status: status[status.INTERNAL_SERVER_ERROR],
        errors: [error.message],
        data: null,
      });
    }
  }

  // Fetch all task list sorted by priority (ascendent order)
  async getAllTaskListByPriorityAsc(req, res) {
    try {
      let taskList = await Task.find().sort({ priority: 1 });
      if (taskList?.length < 1) {
        return res.status(status.NOT_FOUND).json({
          success: false,
          status: status[status.NOT_FOUND],
          errors: ["Could not find any tasks!"],
          data: null,
        });
      }

      res.status(status.OK).json({
        success: true,
        status: status[status.OK],
        errors: [],
        data: { taskList },
      });
    } catch (error) {
      console.log(error);
      res.status(status.INTERNAL_SERVER_ERROR).json({
        success: false,
        status: status[status.INTERNAL_SERVER_ERROR],
        errors: [error.message],
        data: null,
      });
    }
  }

  // Fetch all task list sorted by priority (descendent order)
  async getAllTaskListByPriorityDesc(req, res) {
    try {
      let taskList = await Task.find().sort({ priority: -1 });
      if (taskList?.length < 1) {
        return res.status(status.NOT_FOUND).json({
          success: false,
          status: status[status.NOT_FOUND],
          errors: ["Could not find any tasks!"],
          data: null,
        });
      }

      res.status(status.OK).json({
        success: true,
        status: status[status.OK],
        errors: [],
        data: { taskList },
      });
    } catch (error) {
      console.log(error);
      res.status(status.INTERNAL_SERVER_ERROR).json({
        success: false,
        status: status[status.INTERNAL_SERVER_ERROR],
        errors: [error.message],
        data: null,
      });
    }
  }

  // Fetch all task list sorted by keyword
  async getAllTaskListByKeyword(req, res) {
    const searchQuery = req.query.search;

    if (!searchQuery) {
      return res.status(status.BAD_REQUEST).json({
        success: false,
        status: status[status.BAD_REQUEST],
        errors: ["Please write something..."],
        data: null,
      });
    }
    try {
      let taskList = await Task.find({
        title: { $regex: `^${searchQuery}`, $options: "i" },
      }).sort({ priority: -1, createdAt: -1 });
      if (taskList?.length < 1) {
        return res.status(status.NOT_FOUND).json({
          success: false,
          status: status[status.NOT_FOUND],
          errors: ["Could not find any tasks!"],
          data: null,
        });
      }

      res.status(status.OK).json({
        success: true,
        status: status[status.OK],
        errors: [],
        data: { taskList },
      });
    } catch (error) {
      console.log(error);
      res.status(status.INTERNAL_SERVER_ERROR).json({
        success: false,
        status: status[status.INTERNAL_SERVER_ERROR],
        errors: [error.message],
        data: null,
      });
    }
  }

  // Update Tasks' Group Ids
  async updateTasksGroupIds(req, res) {
    const { taskIds, targetGroup } = req.body;
    try {
      let originalTaskList = await Task.find()
      let taskList = await Task.find({ _id: { $in: taskIds } });
      if (taskList?.length < 1) {
        return res.status(status.NOT_FOUND).json({
          success: false,
          status: status[status.NOT_FOUND],
          errors: ["Could not find any tasks!"],
          data: null,
        });
      }

      await Task.updateMany(
        { _id: { $in: taskIds } },
        { $set: { groupId: targetGroup } }
      );

      res.status(status.OK).json({
        success: true,
        status: status[status.OK],
        errors: [],
        data: { taskList: originalTaskList },
      });
    } catch (error) {
      console.log(error);
      res.status(status.INTERNAL_SERVER_ERROR).json({
        success: false,
        status: status[status.INTERNAL_SERVER_ERROR],
        errors: [error.message],
        data: null,
      });
    }
  }
}

const taskController = new TaskController();
module.exports = taskController;
