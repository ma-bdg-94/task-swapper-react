import React, { useState } from "react";
import "./tasks.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addToSelectedList,
  removeFromSelectedList,
} from "../../redux/task.slice";

const TaskElement = ({ title, name, value, priority, details }) => {
  const [showDetails, setShowDetails] = useState(false);

  const selectedTaskList = useSelector(
    (state) => state?.tasks?.selectedTaskList
  );

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const dispatch = useDispatch();
  const isChecked = !selectedTaskList.includes(value);

  const handleCheckboxChange = () => {
    
    if (isChecked === true) {
      dispatch(addToSelectedList(value))
    } else {
      dispatch(removeFromSelectedList(value))
    }
  };

  return (
    <div>
      <div className="task-group-element">
        <div className="cb">
          <input
            type="checkbox"
            id={value}
            name={name}
            value={value}
            onChange={handleCheckboxChange}
            checked={!isChecked}
          />
          <label className="task-group-element-text" onClick={toggleDetails}>{title}</label>
        </div>
        <div className="controls">
          <div>{Array(priority).fill("★")}</div>
        </div>
      </div>
      {showDetails === true && (
        <div>
          <p>{details}</p>
        </div>
      )}
    </div>
  );
};

export default TaskElement;
