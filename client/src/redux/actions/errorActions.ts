import { GET_ERRORS, CLEAR_ERRORS } from './types';
import { IMsg } from '../types/interfaces';

//return errors
export const returnErrors = (msg: IMsg, status: IMsg, id: any = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
