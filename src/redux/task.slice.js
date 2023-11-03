import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllTasksByCreationDateAsc,
  fetchAllTasksByCreationDateDesc,
  fetchAllTasksByKeyword,
  fetchAllTasksByPriorityAsc,
  fetchAllTasksByPriorityDesc,
  fetchAllTasksStandard,
  updateTasksGroupIds,
} from "./task.service";

const initialState = {
  taskList: [],
  error: null,
  loading: false,
  selectedTaskList: [],
};

const tasksPending = (state) => {
  state.loading = true;
};

const tasksError = (state, action) => {
  state.error = action.payload;
};

const fetchTasksSuccess = (state, action) => {
  state.taskList = action.payload;
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addToSelectedList: (state, { payload }) => {
      state.selectedTaskList = [...state.selectedTaskList, payload];
    },
    removeFromSelectedList: (state, { payload }) => {
      state.selectedTaskList = state.selectedTaskList.filter(
        (task) => task !== payload
      );
    },
    clearSelectedList: (state) => {
      state.selectedTaskList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasksStandard.pending, tasksPending)
      .addCase(fetchAllTasksStandard.rejected, tasksError)
      .addCase(fetchAllTasksStandard.fulfilled, fetchTasksSuccess)
      .addCase(fetchAllTasksByCreationDateAsc.pending, tasksPending)
      .addCase(fetchAllTasksByCreationDateAsc.rejected, tasksError)
      .addCase(fetchAllTasksByCreationDateAsc.fulfilled, fetchTasksSuccess)
      .addCase(fetchAllTasksByCreationDateDesc.pending, tasksPending)
      .addCase(fetchAllTasksByCreationDateDesc.rejected, tasksError)
      .addCase(fetchAllTasksByCreationDateDesc.fulfilled, fetchTasksSuccess)
      .addCase(fetchAllTasksByPriorityAsc.pending, tasksPending)
      .addCase(fetchAllTasksByPriorityAsc.rejected, tasksError)
      .addCase(fetchAllTasksByPriorityAsc.fulfilled, fetchTasksSuccess)
      .addCase(fetchAllTasksByPriorityDesc.pending, tasksPending)
      .addCase(fetchAllTasksByPriorityDesc.rejected, tasksError)
      .addCase(fetchAllTasksByPriorityDesc.fulfilled, fetchTasksSuccess)
      .addCase(fetchAllTasksByKeyword.pending, tasksPending)
      .addCase(fetchAllTasksByKeyword.rejected, tasksError)
      .addCase(fetchAllTasksByKeyword.fulfilled, fetchTasksSuccess)
      .addCase(updateTasksGroupIds.pending, tasksPending)
      .addCase(updateTasksGroupIds.rejected, tasksError)
      .addCase(updateTasksGroupIds.fulfilled, fetchTasksSuccess);
  },
});

export const { addToSelectedList, removeFromSelectedList, clearSelectedList } =
  taskSlice.actions;
export default taskSlice.reducer;
