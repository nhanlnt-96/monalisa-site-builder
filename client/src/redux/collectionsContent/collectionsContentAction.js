import api from "configs/axios";
import {
  GET_COLLECTIONS_CONTENT_FAIL,
  GET_COLLECTIONS_CONTENT_START,
  GET_COLLECTIONS_CONTENT_SUCCESS
} from "redux/collectionsContent/actionTypes";

export const getCollectionsContentStart = () => {
  return {
    type: GET_COLLECTIONS_CONTENT_START
  };
};

export const getCollectionsContentSuccess = (collectionsData) => {
  return {
    type: GET_COLLECTIONS_CONTENT_SUCCESS,
    payload: collectionsData
  };
};

export const getCollectionsContentFail = (error) => {
  return {
    type: GET_COLLECTIONS_CONTENT_FAIL,
    payload: error
  };
};

export const getCollectionsContent = () => {
  return async (dispatch) => {
    dispatch(getCollectionsContentStart());
    await api.get("collections").then((res) => {
      dispatch(getCollectionsContentSuccess(res.data.data));
    }).catch((error) => {
      dispatch(getCollectionsContentFail(error.response.data.error));
    });
  };
};
