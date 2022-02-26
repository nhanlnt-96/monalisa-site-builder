import React, {useEffect} from "react";
import {Alert, Col, Container, Row} from "react-bootstrap";
import BgLogin from "../../assets/imgs/bgLogin.png";
import * as Yup from "yup";
import {ErrorMessage, Form, Formik, Field} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "redux/auth/authAction";

import "./LoginPage.scss";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAuth = useSelector((state) => state.auth);
  const {
    isLoading,
    errorMsg,
    isLogged
  } = userAuth;
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (isLogged || token) navigate("/admin");
  }, [isLogged, token]);
  const initialValues = {
    username: "",
    password: ""
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().min(5).required()
  });
  const onLoginBtnClick = async (data) => {
    dispatch(login(data, navigate));
  };
  return (
    <Container fluid className="login-page">
      <Row className="login-page-container">
        <Col lg={6} md={12} sm={12} className="login-form-container d-flex justify-content-center align-items-center">
          <div className="login-form-box">
            <div className="login-form-title">
              <h2 className="title">Welcome back</h2>
              <p className="subtitle">Welcome back! Please enter you details!</p>
            </div>
            {
              errorMsg && (
                <Alert style={{}} variant="danger" dismissible>
                  <Alert.Heading>Login failed</Alert.Heading>
                  <p>{errorMsg}</p>
                </Alert>
              )
            }
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onLoginBtnClick}>
              <Form className="form-container">
                <div className="field-container">
                  <label>Username *</label>
                  <Field className="input-field" autoComplete="off" name="username" placeholder="Enter your username"/>
                  <ErrorMessage className="error-message" name="username" component="span"/>
                </div>
                
                <div className="field-container">
                  <label>Password *</label>
                  <Field className="input-field" type="password" autoComplete="off" name="password"
                         placeholder="Enter your password"/>
                  <ErrorMessage className="error-message" name="password" component="span"/>
                </div>
                
                <button disabled={isLoading} className="login-button"
                        type="submit">{isLoading ? "Logging..." : "Login"}</button>
              </Form>
            </Formik>
          </div>
        </Col>
        <Col lg={6} md={12} sm={12} className="login-page-bg d-flex justify-content-center align-items-end">
          <img src={BgLogin} alt=""/>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;