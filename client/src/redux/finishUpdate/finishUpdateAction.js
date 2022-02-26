import {FINISH_UPDATE} from "redux/finishUpdate/actionTypes";

export const finishUpdate = (status) => {
  return {
    type: FINISH_UPDATE,
    payload: status
  };
};