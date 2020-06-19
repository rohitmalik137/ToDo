import axios from 'axios';
import { GET_TASKS, ADD_TASK, DELETE_TASK, TASKS_LOADING } from './types';
import { IItem } from '../types/interfaces';

export const getTasks = () => (dispatch: Function) => {
  dispatch(setTasksLoading());
  axios.get('/todo/tasks').then((res) => {
    dispatch({
      type: GET_TASKS,
      payload: res.data.tasks,
    });
  });
};

export const deleteTask = (id: any) => (dispatch: Function) => {
  axios.delete(`/todo/task/${id}`).then((res) => {
    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  });
};

export const addTask = (task: IItem) => (dispatch: Function) => {
  axios.post('/todo/task', task).then((res) => {
    dispatch({
      type: ADD_TASK,
      payload: res.data.task,
    });
  });
};

export const setTasksLoading = () => {
  return {
    type: TASKS_LOADING,
  };
};
