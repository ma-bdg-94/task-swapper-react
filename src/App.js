import { Fragment, useEffect } from "react";
import "./App.scss";
import TaskGroup from "./components/task_group/TaskGroup";
import { useDispatch } from "react-redux";
import { fetchAllTasksByCreationDateAsc, fetchAllTasksByCreationDateDesc, fetchAllTasksByKeyword, fetchAllTasksByPriorityAsc, fetchAllTasksByPriorityDesc, fetchAllTasksStandard } from "./redux/task.service";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTasksStandard());
  }, []);

  // handle tasks sorting
  const handleSortTasks = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === "creationDateAsc") {
      dispatch(fetchAllTasksByCreationDateAsc());
    } else if (selectedOption === "creationDateDesc") {
      dispatch(fetchAllTasksByCreationDateDesc());
    } else if (selectedOption === "priorityAsc") {
      dispatch(fetchAllTasksByPriorityAsc());
    } else if (selectedOption === "priorityDesc") {
      dispatch(fetchAllTasksByPriorityDesc());
    } else {
      dispatch(fetchAllTasksStandard());
    }
  };

  // handle search tasks
  const handleSearchTasks = async (e) => {
    const keyword = e.target.value;

    try {
      if (keyword) {
        await dispatch(fetchAllTasksByKeyword({ keyword }));
      } else {
        dispatch(fetchAllTasksStandard());
      }
    } catch (error) {
      console.error("Error occurred while searching tasks: ", error);
    }
  };

  return (
    <Fragment>
      <div className="App-header">
        <div className="button-wrapper">
          <div className="sort">
            <select name="opts" id="opts" onChange={(e) => handleSortTasks(e)}>
              <option value="standard">Standard</option>
              <option value="creationDateAsc">Creation Date ⇗</option>
              <option value="creationDateDesc">Creation Date ⇘</option>
              <option value="priorityAsc">Priority ⇗</option>
              <option value="priorityDesc">Priority ⇘</option>
            </select>
          </div>
          <div className="search">
            <input
              type="search"
              id="gsearch"
              name="gsearch"
              placeholder="Search Task"
              onChange={(e) => handleSearchTasks(e)}
            />
          </div>
        </div>
        <div className="task-groups">
          <div className="task-group-wrapper">
            <TaskGroup groupId={1} />
          </div>
          <div className="task-group-wrapper">
            <TaskGroup groupId={2} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
