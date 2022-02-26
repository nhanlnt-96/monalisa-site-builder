import {
  GET_HOW_WORK_CONTENT_FAIL,
  GET_HOW_WORK_CONTENT_START,
  GET_HOW_WORK_CONTENT_SUCCESS
} from "redux/howWorkContent/actionTypes";

const initialState = {
  isLoading: false,
  howWorkData: [],
  error: []
};

const howWorkContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOW_WORK_CONTENT_START:
      return {
        ...state,
        isLoading: true,
        error: []
      };
    case GET_HOW_WORK_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        howWorkData: action.payload
      };
    case GET_HOW_WORK_CONTENT_FAIL:
      return {
        ...state,
        isLoading: false,
        howWorkData: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default howWorkContentReducer;