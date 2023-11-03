import React, { useEffect } from "react";
import "./tasks.scss";
import TaskElement from "./TaskElement";
import SwapperButton from "../swapper/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTasksStandard,
  updateTasksGroupIds,
} from "../../redux/task.service";
import { clearSelectedList } from "../../redux/task.slice";

const TaskGroup = ({ groupId }) => {
  const dispatch = useDispatch();
  const taskList = useSelector(
    (state) => state?.tasks?.taskList?.data?.taskList
  );
  const selectedTaskList = useSelector(
    (state) => state?.tasks?.selectedTaskList
  );
  const taskErrors = useSelector((state) => state?.tasks?.error?.errors);

  useEffect(() => {
    console.log("liiiist", taskList);
  }, []);

  // verify if current task group has checked tasks
  const hasSelectedTasks = selectedTaskList?.some((taskId) => {
    const task = taskList?.find((task) => task?._id === taskId);
    return task?.groupId === groupId;
  });

  // handle task swapping
  const handleSwapTask = async () => {
    if (groupId === 1 || groupId === 2) {
      const targetGroup = groupId === 1 ? 2 : 1;

      await dispatch(
        updateTasksGroupIds({ taskIds: selectedTaskList, targetGroup })
      );
      await dispatch(fetchAllTasksStandard());
      dispatch(clearSelectedList());
    }
  };

  return (
    <div>
      <div className="task-group-container">
        <div
          className="task-group-fs"
          style={{
            flexDirection:
              groupId === 1 ? "row" : groupId === 2 ? "row-reverse" : null,
          }}
        >
          <div
            className="swap"
            style={{
              visibility: hasSelectedTasks === true ? "visible" : "hidden",
            }}
          >
            <SwapperButton
              to={groupId === 1 ? "right" : groupId === 2 ? "left" : null}
              onClick={handleSwapTask}
            />
          </div>
        </div>
        <div>
          {taskList
            ?.filter((task) => task?.groupId == groupId)
            ?.map((task) => (
              <div key={task?.key}>
                <TaskElement
                  title={task?.title}
                  value={task?._id}
                  name={task?.title}
                  priority={task?.priority}
                  details={task?.longDesc}
                />
              </div>
            ))}
          {taskErrors !== undefined && <p>{taskErrors[0]}</p>}
        </div>
      </div>
    </div>
  );
};

export default TaskGroup;
