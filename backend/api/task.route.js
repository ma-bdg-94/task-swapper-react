const express = require("express");
const router = express.Router();

const taskController = require("./task.controller");
const {
  addTask,
  getAllTaskListStandard,
  getAllTaskListByCreationDateAsc,
  getAllTaskListByCreationDateDesc,
  getAllTaskListByPriorityAsc,
  getAllTaskListByPriorityDesc,
  getAllTaskListByKeyword,
  updateTasksGroupIds,
} = taskController;

router.post("/add", addTask);

router.get("/fetch/standard", getAllTaskListStandard);
router.get("/fetch/date/asc", getAllTaskListByCreationDateAsc);
router.get("/fetch/date/desc", getAllTaskListByCreationDateDesc);
router.get("/fetch/priority/asc", getAllTaskListByPriorityAsc);
router.get("/fetch/priority/desc", getAllTaskListByPriorityDesc);
router.get("/fetch/search", getAllTaskListByKeyword);

router.put("/swap", updateTasksGroupIds);

module.exports = router;
