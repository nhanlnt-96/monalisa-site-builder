import {FINISH_UPDATE} from "redux/finishUpdate/actionTypes";
import {uploadedImgsToDb} from "redux/uploadMultiImg/uploadMultiActions";

export const finishUpdate = (status) => {
  return {
    type: FINISH_UPDATE,
    payload: status
  };
};

export const finishUploadImg = () => {
  return (dispatch) => {
    dispatch(uploadedImgsToDb());
    dispatch(finishUpdate(true));
  };
};