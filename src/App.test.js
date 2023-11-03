import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";

// Mock the useDispatch function to capture dispatched actions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("App Component", () => {
  // Mock useDispatch and the actions you want to test
  const mockDispatch = jest.fn();
  const mockFetchAllTasksStandard = jest.fn();
  const mockFetchAllTasksByCreationDateAsc = jest.fn();
  const mockFetchAllTasksByCreationDateDesc = jest.fn();
  const mockFetchAllTasksByPriorityAsc = jest.fn();
  const mockFetchAllTasksByPriorityDesc = jest.fn()
  const mockFetchAllTasksByKeyword = jest.fn();

  beforeEach(() => {
    mockDispatch.mockClear();
    mockFetchAllTasksStandard.mockClear();
    mockFetchAllTasksByCreationDateAsc.mockClear();
    mockFetchAllTasksByCreationDateDesc.mockClear();
    mockFetchAllTasksByPriorityAsc.mockClear();
    mockFetchAllTasksByPriorityDesc.mockClear();
    mockFetchAllTasksByKeyword.mockClear();

    // Mock the useDispatch function to return your mockDispatch function
    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(mockDispatch);

    // Mock the actions you want to test
    jest.mock("./redux/task.service", () => ({
      fetchAllTasksStandard: mockFetchAllTasksStandard,
      fetchAllTasksByCreationDateAsc: mockFetchAllTasksByCreationDateAsc,
      fetchAllTasksByCreationDateDesc: mockFetchAllTasksByCreationDateDesc,
      fetchAllTasksByPriorityAsc: mockFetchAllTasksByPriorityAsc,
      fetchAllTasksByPriorityDesc: mockFetchAllTasksByPriorityDesc,
      fetchAllTasksByKeyword: mockFetchAllTasksByKeyword,
    }));
  });

  it("renders the component", () => {
    render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

    expect(screen.getByText("Standard")).toBeInTheDocument();
    expect(screen.getByText("Search Task")).toBeInTheDocument();
  });

  it("dispatches fetchAllTasksStandard on component mount", () => {
    render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith(mockFetchAllTasksStandard());
  });

  it("dispatches the correct action when selecting a sort option", () => {
    render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

    const selectElement = screen.getByTestId("sort-select"); // Add test id to your select element
    fireEvent.change(selectElement, { target: { value: "creationDateAsc" } });

    expect(mockDispatch).toHaveBeenCalledWith(mockFetchAllTasksByCreationDateAsc());
  });

  it("dispatches the correct action when searching for tasks", () => {
    render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "example keyword" } });

    expect(mockDispatch).toHaveBeenCalledWith(mockFetchAllTasksByKeyword({ keyword: "example keyword" }));
  });
});
