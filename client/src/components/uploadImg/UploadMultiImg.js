import React, {useRef, useState} from "react";
import {AiOutlineDelete} from "react-icons/all";
import {Container, Spinner} from "react-bootstrap";
import {ButtonUpload} from "components/uploadImg/UploadImg";
import {deleteObject, getStorage, ref} from "firebase/storage";
import api from "configs/axios";
import {useDispatch, useSelector} from "react-redux";
import {getCollectionsContent} from "redux/collectionsContent/collectionsContentAction";
import {removeImgsUploaded, removeImgsWillUpload, uploadImgs} from "redux/uploadMultiImg/uploadMultiActions";

export const UploadMultiImg = ({
                                 imgFolder,
                                 currentImg
                               }) => {
  const dispatch = useDispatch();
  const uploadedImgsData = useSelector((state) => state.uploadedImgsData);
  const hiddenFilesInput = useRef(null);
  const onUploadBtnClick = (e) => {
    hiddenFilesInput.current.click();
  };
  const onUploadHandler = (e) => {
    const fileUploaded = e.target.files;
    dispatch(uploadImgs(imgFolder, fileUploaded));
  };
  const onRemoveImgWillUpload = (imgFolder, imgName, imgUrl) => {
    dispatch(removeImgsWillUpload(imgFolder, uploadedImgsData.imgsUploadedData, imgName, imgUrl));
  };
  const onRemoveImgUploaded = (imgFolder, imgName, imageId) => {
    dispatch(removeImgsUploaded(imgFolder, imgName, imageId, uploadedImgsData.imgsUploadedData));
  };
  return (
    <Container fluid
               className="upload-comp d-flex flex-column justify-content-center align-items-center overflow-scroll">
      <div className="upload-btn">
        <input ref={hiddenFilesInput} type="file" style={{display: "none"}} onChange={onUploadHandler}
               multiple={true}/>
        <ButtonUpload onClick={onUploadBtnClick}>Upload images</ButtonUpload>
      </div>
      {
        uploadedImgsData.imgsUploadedData.length > 0 ? (
          <div className="multi-img-preview d-flex align-items-center">
            <div className="multi-img-track d-flex">
              {
                uploadedImgsData.imgsUploadedData.map((val, index) => (
                  <div key={index} className="img-preview-container">
                    <button title="Remove image" className="remove-img"
                            onClick={() => onRemoveImgWillUpload(imgFolder, val.imgName, val.imgUrl)}>
                      <AiOutlineDelete/>
                    </button>
                    <img src={val.imgUrl} alt="liberT-admin"/>
                  </div>
                ))
              }
            </div>
          </div>
        ) : uploadedImgsData.isLoading ? (
          <div style={{marginTop: 24}}>
            <Spinner animation="grow" variant="primary"/>
          </div>
        ) : currentImg.length > 0 && (
          <div className="multi-img-preview d-flex align-items-center overflow-scroll">
            <div className="multi-img-track d-flex">
              {
                currentImg.map((val, index) => (
                  <div key={index} className="img-preview-container">
                    <button title="Remove image" className="remove-img"
                            onClick={() => onRemoveImgUploaded(imgFolder, val.imageName, val.id)}>
                      <AiOutlineDelete/>
                    </button>
                    <img src={val.imageUrl} alt="liberT-admin"/>
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
    </Container>
  );
};