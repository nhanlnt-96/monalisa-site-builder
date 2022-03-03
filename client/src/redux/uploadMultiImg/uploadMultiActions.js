import {
  UPLOAD_IMAGES_TO_DB_SUCCESS,
  UPLOAD_IMAGES_FAIL,
  UPLOAD_IMAGES_START,
  UPLOAD_IMAGES_SUCCESS
} from "redux/uploadMultiImg/actionTypes";
import {generateFileName} from "helpers/generateFileName";
import firebase from "firebase/compat";
import {deleteObject, getStorage, ref} from "firebase/storage";
import {getCollectionsContent} from "redux/collectionsContent/collectionsContentAction";
import api from "configs/axios";
import {getAboutContent} from "redux/aboutContent/aboutContentAction";
import {finishUpdate} from "redux/finishUpdate/finishUpdateAction";

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

export const uploadImgsFail = (error) => {
  return {
    type: UPLOAD_IMAGES_FAIL,
    payload: error
  };
};

export const uploadedImgsToDb = () => {
  return {
    type: UPLOAD_IMAGES_TO_DB_SUCCESS
  };
};

export const uploadImgs = (imgFolder, imgsData) => {
  return async (dispatch) => {
    dispatch(uploadImgsStart());
    dispatch(finishUpdate(false));
    const imgToStore = [];
    console.log();
    for (let i = 0; i < imgsData.length; i++) {
      const fileName = generateFileName(imgsData[i].name);
      const storageRef = firebase.storage().ref(`${imgFolder}/${fileName}`).put(imgsData[i]);
      storageRef.on("state_changed", (snapshot) => {
      }, (error) => {
        dispatch(uploadImgsFail(error));
      }, async () => {
        await storageRef.snapshot.ref.getDownloadURL().then((url) => {
          imgToStore.push({
            imageName: fileName,
            imageUrl: url
          });
          dispatch(uploadImgsSuccess(imgToStore));
        });
      });
    }
    
  };
};

export const removeImgsWillUpload = (imgFolder, imgsData, imageName, imageUrl) => {
  return async (dispatch) => {
    dispatch(uploadImgsStart());
    const storage = getStorage();
    const desertRef = ref(storage, `${imgFolder}/${imageName}`);
    deleteObject(desertRef).then(() => {
      for (let i = 0; i < imgsData.length; i++) {
        if (imgsData[i].imageUrl === imageUrl) {
          imgsData.splice(i, 1);
          dispatch(uploadImgsSuccess(imgsData));
        }
      }
    }).catch((error) => {
      dispatch(uploadImgsFail(error));
    });
  };
};

export const removeImgsUploaded = (imgFolder, imageName, imageId, imgData) => {
  return async (dispatch) => {
    dispatch(uploadImgsStart());
    const storage = getStorage();
    const desertRef = ref(storage, `${imgFolder}/${imageName}`);
    deleteObject(desertRef).then(async () => {
      switch (imgFolder) {
        case "about":
          return await api.delete(`${imgFolder}/${imageId}`).then(() => {
            dispatch(getAboutContent());
            dispatch(uploadImgsSuccess(imgData));
          });
        case "collections":
          return await api.delete(`${imgFolder}/images/${imageId}`).then(() => {
            dispatch(getCollectionsContent());
            dispatch(uploadImgsSuccess(imgData));
          });
        default:
          return await api.delete(`${imgFolder}/${imageId}`).then(() => {
            dispatch(getCollectionsContent());
            dispatch(uploadImgsSuccess(imgData));
          });
      }
    }).catch(async (error) => {
      dispatch(uploadImgsFail(error));
    });
  };
};
