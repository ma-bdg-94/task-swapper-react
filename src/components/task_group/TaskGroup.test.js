import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import TaskGroup from "./TaskGroup";

// Mock the useDispatch and useSelector functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("TaskGroup Component", () => {
  // Mock the useDispatch and useSelector functions
  const mockDispatch = jest.fn();
  const mockUseSelector = jest.fn();

  beforeEach(() => {
    mockDispatch.mockClear();
    mockUseSelector.mockClear();

    // Mock the useDispatch and useSelector functions to return your mock functions
    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(mockDispatch);
    jest.spyOn(require("react-redux"), "useSelector").mockImplementation(mockUseSelector);
  });

  it("renders the component", () => {
    // Mock the useSelector function to provide necessary data for rendering
    mockUseSelector.mockReturnValueOnce({
      taskList: {
        data: {
          taskList: [
            {
              _id: "1",
              groupId: 1,
              title: "Task 1",
              priority: "High",
              longDesc: "Description 1",
            },
            // Add more mock tasks as needed
          ],
        },
      },
      selectedTaskList: [], // Mock an empty selected task list
      error: {
        errors: undefined,
      },
    });

    render(
      <Provider store={mockStore}>
        <TaskGroup groupId={1} />
      </Provider>
    );

    // You can add more specific tests for the rendered elements and their interactions
    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });

  it("dispatches the correct actions when swapping tasks", () => {
    // Mock the useSelector function to provide necessary data for the test
    mockUseSelector.mockReturnValueOnce({
      taskList: {
        data: {
          taskList: [
            {
              _id: "1",
              groupId: 1,
              title: "Task 1",
              priority: "High",
              longDesc: "Description 1",
            },
          ],
        },
      },
      selectedTaskList: ["1"], // Mock a selected task
      error: {
        errors: undefined,
      },
    });

    render(
      <Provider store={mockStore}>
        <TaskGroup groupId={1} />
      </Provider>
    );

    // Find and click the swap button
    const swapButton = screen.getByTestId("swap-button");
    fireEvent.click(swapButton);

    // Verify that the dispatch was called with the expected actions
    expect(mockDispatch).toHaveBeenCalledWith(updateTasksGroupIds({ taskIds: ["1"], targetGroup: 2 }));
    expect(mockDispatch).toHaveBeenCalledWith(fetchAllTasksStandard());
    expect(mockDispatch).toHaveBeenCalledWith(clearSelectedList());
  });
});
