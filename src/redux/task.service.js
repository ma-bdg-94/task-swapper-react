import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const rootURL = "http://localhost:9090/api/tasks"

export const fetchAllTasksStandard = createAsyncThunk(
  "tasks/list_all_standard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${rootURL}/fetch/standard`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllTasksByCreationDateAsc = createAsyncThunk(
  "tasks/list_all_by_date_asc",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${rootURL}/fetch/date/asc`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllTasksByCreationDateDesc = createAsyncThunk(
  "tasks/list_all_by_date_desc",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${rootURL}/fetch/date/desc`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllTasksByPriorityAsc = createAsyncThunk(
  "tasks/list_all_by_priority_asc",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${rootURL}/fetch/priority/asc`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllTasksByPriorityDesc = createAsyncThunk(
  "tasks/list_all_by_priority_desc",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${rootURL}/fetch/priority/desc`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllTasksByKeyword = createAsyncThunk(
  "tasks/list_all_by_keyword",
  async (data, { rejectWithValue }) => {
    const { keyword } = data
    try {
      const response = await axios.get(`${rootURL}/fetch/search?search=${keyword}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTasksGroupIds = createAsyncThunk(
  "tasks/update_group_ids",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${rootURL}/swap`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

