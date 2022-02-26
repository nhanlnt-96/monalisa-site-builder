import {
  GET_FAQ_CONTENT_FAIL,
  GET_FAQ_CONTENT_START,
  GET_FAQ_CONTENT_SUCCESS
} from "redux/faqContent/actionTypes";

const initialState = {
  isLoading: false,
  faqData: [],
  error: []
};

const FaqContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAQ_CONTENT_START:
      return {
        ...state,
        isLoading: true,
        error: []
      };
    case GET_FAQ_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        faqData: action.payload
      };
    case GET_FAQ_CONTENT_FAIL:
      return {
        ...state,
        isLoading: false,
        faqData: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default FaqContentReducer;