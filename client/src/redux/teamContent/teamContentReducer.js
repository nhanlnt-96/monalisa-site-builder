import {
  GET_TEAM_CONTENT_FAIL,
  GET_TEAM_CONTENT_START,
  GET_TEAM_CONTENT_SUCCESS
} from "redux/teamContent/actionTypes";

const initialState = {
  isLoading: false,
  teamData: [],
  error: []
};

const TeamContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAM_CONTENT_START:
      return {
        ...state,
        isLoading: true,
        error: []
      };
    case GET_TEAM_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        teamData: action.payload
      };
    case GET_TEAM_CONTENT_FAIL:
      return {
        ...state,
        isLoading: false,
        teamData: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default TeamContentReducer;