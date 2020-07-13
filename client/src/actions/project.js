import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_PROJECTS,
  PROJECT_ERROR,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  ADD_PROJECT,
  GET_PROJECT,
  GET_OBJECTIVES,
  GET_OBJECTIVE,
  UPDATE_OBJECTIVE,
  DELETE_OBJECTIVE,
  ADD_OBJECTIVE,
  OBJECTIVE_ERROR,
  GET_TASKS,
  GET_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  ADD_TASK,
  TASK_ERROR
} from './types';

// Get projects
export const getProjects = () => async (dispatch) => {
  try {
    const res = await api.get('/projects');

    dispatch({
      type: GET_PROJECTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get project
export const getProject = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/projects/${id}`);

    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update project
export const updateProject = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/projects/${id}`);

    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete project
export const deleteProject = (id) => async (dispatch) => {
  try {
    await api.delete(`/projects/${id}`);

    dispatch({
      type: DELETE_PROJECT,
      payload: id
    });

    dispatch(setAlert('Project Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add project
export const addProject = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/projects', formData);

    dispatch({
      type: ADD_PROJECT,
      payload: res.data
    });

    dispatch(setAlert('Project Created', 'success'));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get objectives
export const getObjectives = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/projects/${id}/objectives`);

    dispatch({
      type: GET_OBJECTIVES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: OBJECTIVE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get objective
export const getObjective = (id, obj_id) => async (dispatch) => {
  try {
    const res = await api.get(`/projects/${id}/objectives/${obj_id}/`);

    dispatch({
      type: GET_OBJECTIVE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: OBJECTIVE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update objective
export const updateObjective = (id, obj_id) => async (dispatch) => {
  try {
    const res = await api.put(`/projects/${id}/objectives/${obj_id}`);

    dispatch({
      type: UPDATE_OBJECTIVE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: OBJECTIVE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete objective
export const deleteObjective = (id, obj_id) => async (dispatch) => {
  try {
    await api.delete(`/projects/${id}/objectives/${obj_id}`);

    dispatch({
      type: DELETE_OBJECTIVE,
      payload: obj_id
    });

    dispatch(setAlert('Objective Removed', 'success'));
  } catch (err) {
    dispatch({
      type: OBJECTIVE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add objective
export const addObjective = (id, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/projects/${id}/objectives/`, formData);

    dispatch({
      type: ADD_OBJECTIVE,
      payload: res.data
    });

    dispatch(setAlert('Objective Created', 'success'));
  } catch (err) {
    dispatch({
      type: OBJECTIVE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get tasks
export const getTasks = (id, obj_id) => async (dispatch) => {
  try {
    const res = await api.get(`/projects/${id}/objectives/${obj_id}/tasks/`);

    dispatch({
      type: GET_TASKS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get task
export const getTask = (id, obj_id, task_id) => async (dispatch) => {
  try {
    const res = await api.get(
      `/projects/${id}/objectives/${obj_id}/tasks/${task_id}/`
    );

    dispatch({
      type: GET_TASK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update task
export const updateTask = (id, obj_id, task_id) => async (dispatch) => {
  try {
    const res = await api.put(
      `/projects/${id}/objectives/${obj_id}/tasks/${task_id}/`
    );

    dispatch({
      type: UPDATE_TASK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete task
export const deleteTask = (id, obj_id, task_id) => async (dispatch) => {
  try {
    await api.delete(`/projects/${id}/objectives/${obj_id}/tasks/${task_id}/`);

    dispatch({
      type: DELETE_TASK,
      payload: task_id
    });

    dispatch(setAlert('Task Removed', 'success'));
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add task
export const addTask = (id, obj_id, formData) => async (dispatch) => {
  try {
    const res = await api.post(
      `/projects/${id}/objectives/${obj_id}`,
      formData
    );

    dispatch({
      type: ADD_TASK,
      payload: res.data
    });

    dispatch(setAlert('Task Created', 'success'));
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
