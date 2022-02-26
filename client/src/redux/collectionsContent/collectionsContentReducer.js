import {
  GET_COLLECTIONS_CONTENT_FAIL,
  GET_COLLECTIONS_CONTENT_START,
  GET_COLLECTIONS_CONTENT_SUCCESS
} from "redux/collectionsContent/actionTypes";

const initialState = {
  isLoading: false,
  collectionsData: [],
  error: []
};

const CollectionsContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLLECTIONS_CONTENT_START:
      return {
        ...state,
        isLoading: true,
        error: []
      };
    case GET_COLLECTIONS_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        collectionsData: action.payload
      };
    case GET_COLLECTIONS_CONTENT_FAIL:
      return {
        ...state,
        isLoading: false,
        collectionsData: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default CollectionsContentReducer;