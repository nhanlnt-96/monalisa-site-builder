import {
  GET_SPOT_CONTENT_FAIL,
  GET_SPOT_CONTENT_START,
  GET_SPOT_CONTENT_SUCCESS
} from "redux/spotContent/actionTypes";

const initialState = {
  isLoading: false,
  spotData: [],
  error: []
};

const SpotContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOT_CONTENT_START:
      return {
        ...state,
        isLoading: true,
        error: []
      };
    case GET_SPOT_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        spotData: action.payload
      };
    case GET_SPOT_CONTENT_FAIL:
      return {
        ...state,
        isLoading: false,
        spotData: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default SpotContentReducer;