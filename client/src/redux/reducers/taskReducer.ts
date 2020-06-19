import {
  GET_TASKS,
  ADD_TASK,
  DELETE_TASK,
  TASKS_LOADING,
} from '../actions/types';
import { IAction, IItem } from '../types/interfaces';

const INITIAL_STATE = {
  tasks: [],
  loading: false,
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
    case TASKS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
