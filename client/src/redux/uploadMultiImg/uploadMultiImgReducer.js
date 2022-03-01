import {
  UPLOAD_IMAGES_TO_DB_SUCCESS,
  UPLOAD_IMAGES_FAIL,
  UPLOAD_IMAGES_START,
  UPLOAD_IMAGES_SUCCESS
} from "redux/uploadMultiImg/actionTypes";

const initialState = {
  isLoading: false,
  imgsUploadedData: [],
  error: "",
};

const uploadMultiImgReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGES_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        isUploaded: false
      };
    case UPLOAD_IMAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        imgsUploadedData: action.payload,
      };
    case UPLOAD_IMAGES_FAIL:
      return {
        ...state,
        isLoading: false,
        imgsUploadedData: [],
        error: action.payload,
        isUploaded: false
      };
    case UPLOAD_IMAGES_TO_DB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        imgsUploadedData: [],
        error: "",
        isUploaded: false
      };
    default:
      return state;
  }
};

export default uploadMultiImgReducer;