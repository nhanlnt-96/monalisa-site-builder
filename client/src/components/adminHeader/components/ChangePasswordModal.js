import React, {useState} from "react";
import {Alert, Button, Modal} from "react-bootstrap";
import {ErrorMessage, Form, Formik, Field} from "formik";
import * as Yup from "yup";
import api from "configs/axios";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const ChangePasswordModal = ({
                                      showChangePassword,
                                      setShowChangePassword
                                    }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.getAuth.userData);
  const [isLoading, setIsLoading] = useState(false);
  const [changeFail, setChangeFail] = useState("");
  const initialValues = {
    currentPassword: "",
    newPassword: ""
  };
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().min(5).required(),
    newPassword: Yup.string().min(5).required()
  });
  const onLoginBtnClick = async (data) => {
    setIsLoading(true);
    await api.patch("/user/change-password", {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword
    }).then((res) => {
      setIsLoading(false);
      localStorage.removeItem("accessToken");
      navigate("/login");
    }).catch(error => {
      setIsLoading(false);
      setChangeFail(error.response.data.error);
    });
  };
  return (
    <Modal
      show={showChangePassword}
      onHide={() => setShowChangePassword(false)}
      backdrop="static"
      keyboard={false}
      centered
      className="modal-container"
    >
      <Modal.Header closeButton>
        <Modal.Title>Change password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          changeFail && (
            <Alert style={{}} variant="danger" dismissible>
              <Alert.Heading>Login failed</Alert.Heading>
              <p>{changeFail}</p>
            </Alert>
          )
        }
        {
          userData.isFirstLogin && "To make your account secure, please create a new password to replace the temporary password you were given."
        }
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onLoginBtnClick}>
          <Form className="form-container">
            <div className="field-container">
              <label>Current password *</label>
              <Field className="input-field" type="password" autoComplete="off" name="currentPassword"
                     placeholder="Enter your current password"/>
              <ErrorMessage className="error-message" name="currentPassword" component="span"/>
            </div>
            
            <div className="field-container">
              <label>New Password *</label>
              <Field className="input-field" type="password" autoComplete="off" name="newPassword"
                     placeholder="Enter your new password"/>
              <ErrorMessage className="error-message" name="newPassword" component="span"/>
            </div>
            
            <div className="footer-btn d-flex justify-content-end align-items-center">
              <Button className="close-modal" onClick={() => setShowChangePassword(false)} variant="secondary"
                      disabled={userData.isFirstLogin}>Close
              </Button>
              <Button variant="primary" type="submit" className="submit-modal"
                      disabled={isLoading}>{isLoading ? "Changing" : "Change"}</Button>
            </div>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};