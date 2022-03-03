import React, {useRef, useState} from "react";
import {AiOutlineDelete} from "react-icons/all";
import {Container, Spinner} from "react-bootstrap";
import {ButtonUpload} from "components/uploadImg/UploadImg";
import {useDispatch, useSelector} from "react-redux";
import {removeImgsUploaded, removeImgsWillUpload, uploadImgs} from "redux/uploadMultiImg/uploadMultiActions";
import ToastNoti from "components/toastNoti/ToastNoti";

export const UploadMultiImg = ({
                                 imgFolder,
                                 currentImg,
                                 imageLimit,
                                 previewPosition,
                                 uploadFor
                               }) => {
  const dispatch = useDispatch();
  const uploadedImgsData = useSelector((state) => state.uploadedImgsData);
  const hiddenFilesInput = useRef(null);
  const [errMsg, setErrMsg] = useState("");
  const onUploadBtnClick = (e) => {
    hiddenFilesInput.current.click();
  };
  const onUploadHandler = (e) => {
    const fileUploaded = e.target.files;
    if ((fileUploaded.length + currentImg.length) > imageLimit) {
      setErrMsg(`Image upload maximum ${imageLimit} images`);
    } else {
      dispatch(uploadImgs(imgFolder, fileUploaded));
    }
  };
  const onRemoveImgWillUpload = (imgFolder, imageName, imageUrl) => {
    dispatch(removeImgsWillUpload(imgFolder, uploadedImgsData.imgsUploadedData, imageName, imageUrl));
  };
  const onRemoveImgUploaded = (imgFolder, imageName, imageId) => {
    dispatch(removeImgsUploaded(imgFolder, imageName, imageId, uploadedImgsData.imgsUploadedData));
  };
  return (
    <Container fluid
               className="upload-comp d-flex flex-column justify-content-center align-items-center">
      {
        (currentImg?.length < imageLimit || uploadFor === "collections") && (
          <div className="upload-btn">
            <input ref={hiddenFilesInput} type="file" style={{display: "none"}} onChange={onUploadHandler}
                   multiple={true}/>
            <ButtonUpload onClick={onUploadBtnClick}>Upload images</ButtonUpload>
          </div>
        )
      }
      {
        uploadedImgsData.imgsUploadedData?.length > 0 ? (
          <div className={`multi-img-preview d-flex align-items-center ${previewPosition === "center" && "justify-content-center"} overflow-scroll`}>
            <div className="multi-img-track d-flex">
              {
                uploadedImgsData.imgsUploadedData?.map((val, index) => (
                  <div key={index} className="img-preview-container">
                    <button title="Remove image" className="remove-img"
                            onClick={() => onRemoveImgWillUpload(imgFolder, val.imageName, val.imageUrl)}>
                      <AiOutlineDelete/>
                    </button>
                    <img src={val.imageUrl} alt="liberT-admin"/>
                  </div>
                ))
              }
            </div>
          </div>
        ) : uploadedImgsData?.isLoading ? (
          <div style={{marginTop: 24}}>
            <Spinner animation="grow" variant="primary"/>
          </div>
        ) : currentImg?.length > 0 && (
          <div className={`multi-img-preview d-flex align-items-center overflow-scroll ${previewPosition === "center" && "justify-content-center"}`}>
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
      {
        errMsg && (
          <ToastNoti position={"top-center"} errorMsg={errMsg} titleNoti={"Error"}/>
        )
      }
    </Container>
  );
};