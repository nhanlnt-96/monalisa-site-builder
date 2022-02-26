import {
  GET_ROADMAP_CONTENT_FAIL,
  GET_ROADMAP_CONTENT_START,
  GET_ROADMAP_CONTENT_SUCCESS
} from "redux/roadmapContent/actionTypes";

const initialState = {
  isLoading: false,
  roadmapData: [],
  error: []
};

const RoadmapContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROADMAP_CONTENT_START:
      return {
        ...state,
        isLoading: true,
        error: []
      };
    case GET_ROADMAP_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        roadmapData: action.payload
      };
    case GET_ROADMAP_CONTENT_FAIL:
      return {
        ...state,
        isLoading: false,
        roadmapData: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default RoadmapContentReducer;