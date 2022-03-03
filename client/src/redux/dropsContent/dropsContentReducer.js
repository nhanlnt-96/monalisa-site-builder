import {
  GET_DROPS_CONTENT_FAIL,
  GET_DROPS_CONTENT_START,
  GET_DROPS_CONTENT_SUCCESS
} from "redux/dropsContent/actionTypes";

const initialState = {
  isLoading: false,
  dropsData: [],
  error: []
};

const dropsContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DROPS_CONTENT_START:
      return {
        ...state,
        isLoading: true,
        error: []
      };
    case GET_DROPS_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dropsData: action.payload
      };
    case GET_DROPS_CONTENT_FAIL:
      return {
        ...state,
        isLoading: false,
        dropsData: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default dropsContentReducer;