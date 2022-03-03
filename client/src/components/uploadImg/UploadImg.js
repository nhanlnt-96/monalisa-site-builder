import React, {useRef, useState} from "react";
import {Container, Spinner} from "react-bootstrap";
import styled from "styled-components";
import firebase from "firebase/compat";
import {getStorage, deleteObject, ref} from "firebase/storage";
import {AiOutlineDelete} from "react-icons/all";
import {generateFileName} from "helpers/generateFileName";
import ToastNoti from "components/toastNoti/ToastNoti";

import "./UploadImg.scss";

export const ButtonUpload = styled.button`
  border: none;
  outline: none;
  padding: 12px;
  border-radius: 5px;
  background-color: #EFEFEF;
`;

export const UploadImg = ({
                            imgFolder,
                            imgInfo,
                            setImgInfo,
                            currentImgName,
                            currentImgUrl,
                            isAllowDeleteImg,
                            setIsDeletedImg,
                            isDeletedImg
                          }) => {
  const hiddenFileInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    msg: "",
    titleNoti: ""
  });
  const onUploadBtnClick = (e) => {
    hiddenFileInput.current.click();
  };
  const removeImgFromFirebase = (imgFolder, imageName, isShowMsg) => {
    const storage = getStorage();
    const desertRef = ref(storage, `${imgFolder}/${imageName}`);
    deleteObject(desertRef).then(() => {
      if (imgInfo.imageName || imgInfo.imageUrl) {
        setImgInfo({
          imageName: "",
          imageUrl: ""
        });
      }
      setIsDeletedImg(true);
      if (isShowMsg) {
        setErrorMsg({
          msg: "Removed image.",
          titleNoti: "Successful"
        });
      }
    }).catch((error) => {
      console.error(error);
    });
  };
  const onUploadHandler = async (e, currentImgName) => {
    setIsLoading(true);
    if (!isAllowDeleteImg) {
      await removeImgFromFirebase(imgFolder, currentImgName, false);
    }
    const fileUploaded = e.target.files[0];
    const fileName = generateFileName(fileUploaded.name);
    const storageRef = firebase.storage().ref(`${imgFolder}/${fileName}`).put(fileUploaded);
    storageRef.on("state_changed", (snapshot) => {
    }, (error) => {
      console.log(error);
      setIsLoading(false);
    }, async () => {
      await storageRef.snapshot.ref.getDownloadURL().then((url) => {
        setImgInfo({
          imageName: fileName,
          imageUrl: url
        });
        setIsLoading(false);
      });
    });
  };
  const onRemoveImgUpload = async (imgFolder, imageName) => {
    if (!isAllowDeleteImg) {
      setErrorMsg({
        msg: "You cannot remove this image. If you want to change current image, please upload the new one.",
        titleNoti: "Error"
      });
    } else {
      setIsLoading(true);
      await removeImgFromFirebase(imgFolder, imageName, true);
      setIsLoading(false);
    }
  };
  return (
    <Container fluid className="upload-comp d-flex flex-column justify-content-center align-items-center">
      {
        (!currentImgUrl) && (
          <div className="upload-btn">
            <input
              ref={hiddenFileInput}
              type="file"
              style={{display: "none"}}
              onChange={(e) => onUploadHandler(e, currentImgName)}/>
            <ButtonUpload onClick={onUploadBtnClick}>Upload new image</ButtonUpload>
          </div>
        )
      }
      {
        imgInfo.imageUrl ? (
          <div className="img-preview d-flex flex-column justify-content-center align-items-center">
            <button title="Remove image" className="remove-img"
                    onClick={() => onRemoveImgUpload(imgFolder, imgInfo.imageName)}>
              <AiOutlineDelete/>
            </button>
            <img src={imgInfo.imageUrl} alt="liberT-admin"/>
          </div>
        ) : isLoading ? (
          <div style={{marginTop: 24}}>
            <Spinner animation="grow" variant="primary"/>
          </div>
        ) : (currentImgUrl && !isDeletedImg) && (
          <div className="img-preview d-flex flex-column justify-content-center align-items-center">
            <button title="Remove image" className="remove-img"
                    onClick={() => onRemoveImgUpload(imgFolder, currentImgName)}>
              <AiOutlineDelete/>
            </button>
            <img src={currentImgUrl} alt="liberT-admin"/>
          </div>
        )
      }
      <ToastNoti errorMsg={errorMsg.msg}
                 setErrorMsg={setErrorMsg}
                 position={"top-center"}
                 titleNoti={errorMsg.titleNoti}/>
    </Container>
  );
};