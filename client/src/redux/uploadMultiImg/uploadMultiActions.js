import {UPLOAD_IMAGES_FAIL, UPLOAD_IMAGES_START, UPLOAD_IMAGES_SUCCESS} from "redux/uploadMultiImg/actionTypes";
import {generateFileName} from "helpers/generateFileName";
import firebase from "firebase/compat";
import {deleteObject, getStorage, ref} from "firebase/storage";
import {getCollectionsContent} from "redux/collectionsContent/collectionsContentAction";
import api from "configs/axios";

export const uploadImgsStart = () => {
  return {
    type: UPLOAD_IMAGES_START
  };
};

export const uploadImgsSuccess = (imgsData) => {
  return {
    type: UPLOAD_IMAGES_SUCCESS,
    payload: imgsData
  };
};

export const uploadImsFail = (error) => {
  return {
    type: UPLOAD_IMAGES_FAIL,
    payload: error
  };
};

export const uploadImgs = (imgFolder, imgsData) => {
  return async (dispatch) => {
    dispatch(uploadImgsStart());
    const imgToStore = [];
    
    for (let i = 0; i < imgsData.length; i++) {
      const fileName = generateFileName(imgsData[i].name);
      const storageRef = firebase.storage().ref(`${imgFolder}/${fileName}`).put(imgsData[i]);
      storageRef.on("state_changed", (snapshot) => {
      }, (error) => {
        dispatch(uploadImsFail(error));
      }, async () => {
        await storageRef.snapshot.ref.getDownloadURL().then((url) => {
          imgToStore.push({
            imgName: fileName,
            imgUrl: url
          });
          dispatch(uploadImgsSuccess(imgToStore));
        });
      });
    }
    
  };
};

export const removeImgsWillUpload = (imgFolder, imgsData, imgName, imgUrl) => {
  return async (dispatch) => {
    dispatch(uploadImgsStart());
    const storage = getStorage();
    const desertRef = ref(storage, `${imgFolder}/${imgName}`);
    deleteObject(desertRef).then(() => {
      for (let i = 0; i < imgsData.length; i++) {
        if (imgsData[i].imgUrl === imgUrl) {
          imgsData.splice(i, 1);
          dispatch(uploadImgsSuccess(imgsData));
        }
      }
    }).catch((error) => {
      dispatch(uploadImsFail(error));
    });
  };
};

export const removeImgsUploaded = (imgFolder, imgName, imageId, imgData) => {
  return async (dispatch) => {
    dispatch(uploadImgsStart());
    const storage = getStorage();
    const desertRef = ref(storage, `${imgFolder}/${imgName}`);
    deleteObject(desertRef).then(async () => {
      await api.delete(`${imgFolder}/${imageId}`).then(() => {
        dispatch(getCollectionsContent());
        dispatch(uploadImgsSuccess(imgData));
      });
    }).catch((error) => {
      dispatch(uploadImsFail(error));
    });
  };
};
