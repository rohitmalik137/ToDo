import axios from 'axios';
import {
  GET_TASKS,
  ADD_TASK,
  DELETE_TASK,
  TASKS_LOADING,
  IS_IMPORTANT,
  IS_COMPLETE,
} from './types';
import { IItem } from '../types/interfaces';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getTasks = () => (dispatch: Function, getState: Function) => {
  // console.log(getState().auth.userId);
  const id = localStorage.getItem('userId');
  dispatch(setTasksLoading());
  axios
    .get(`/todo/tasks/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_TASKS,
        payload: res.data.tasks,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteTask = (id: any) => (
  dispatch: Function,
  getState: Function
) => {
  axios
    .delete(`/todo/task/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_TASK,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addTask = (task: IItem) => (
  dispatch: Function,
  getState: Function
) => {
  // console.log(localStorage.getItem('userId'));
  const id = localStorage.getItem('userId');
  axios
    .post(`/todo/task/${id}`, task, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_TASK,
        payload: res.data.task,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const isComplete = (id: any) => (
  dispatch: Function,
  getState: Function
) => {
  axios
    .put(`/todo/task-complete/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: IS_COMPLETE,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const isImportant = (id: any) => (
  dispatch: Function,
  getState: Function
) => {
  axios
    .put(`/todo/task-important/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: IS_IMPORTANT,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setTasksLoading = () => {
  return {
    type: TASKS_LOADING,
  };
};
