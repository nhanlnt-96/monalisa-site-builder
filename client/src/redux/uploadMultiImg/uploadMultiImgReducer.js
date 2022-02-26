import {UPLOAD_IMAGES_FAIL, UPLOAD_IMAGES_START, UPLOAD_IMAGES_SUCCESS} from "redux/uploadMultiImg/actionTypes";

const initialState = {
  isLoading: false,
  imgsUploadedData: [],
  error: ""
};

const uploadMultiImgReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGES_START:
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    case UPLOAD_IMAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        imgsUploadedData: action.payload
      };
    case UPLOAD_IMAGES_FAIL:
      return {
        ...state,
        isLoading: false,
        imgsUploadedData: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default uploadMultiImgReducer;