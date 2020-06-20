import {
  GET_TASKS,
  ADD_TASK,
  DELETE_TASK,
  TASKS_LOADING,
  IS_IMPORTANT,
  IS_COMPLETE,
  SHOW_DESCRIPTION,
  HIDE_DESCRIPTION,
} from '../actions/types';
import { IAction, IItem } from '../types/interfaces';

const INITIAL_STATE = {
  tasks: [],
  loading: false,
  showDescription: false,
};

interface IState {
  tasks: IItem[];
}

export default function (state: IState = INITIAL_STATE, action: IAction) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case IS_IMPORTANT:
      return Object.assign({}, state, {
        tasks: state.tasks.map((task) => {
          if (task._id === action.payload) {
            return Object.assign({}, task, {
              important: !task.important,
            });
          }
          return task;
        }),
      });
    case IS_COMPLETE:
      return Object.assign({}, state, {
        tasks: state.tasks.map((task) => {
          if (task._id === action.payload) {
            return Object.assign({}, task, {
              completed: !task.completed,
            });
          }
          return task;
        }),
      });
    case SHOW_DESCRIPTION:
      return {
        ...state,
        showDescription: true,
      };
    case HIDE_DESCRIPTION:
      return {
        ...state,
        showDescription: false,
      };
    case TASKS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
