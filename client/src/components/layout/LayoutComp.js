import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {adminRoutes, mainRoutes} from "configs/routes";

const LayoutComp = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const accessToken = localStorage.getItem("accessToken");
  const renderComponent = (isLogged, module, isPrivate) => {
    if (isPrivate) {
      return (isLogged || accessToken) ? module : <Navigate to="/login"/>;
    }
    return module;
  };
  return (
    <Routes>
      {
        mainRoutes.map((val, index) => (
          <Route key={index} path={val.path} element={val.module}/>
        ))
      }
      {
        <Route path={adminRoutes.path} element={renderComponent(isLogged, adminRoutes.module, adminRoutes.isPrivate)}>
          {
            adminRoutes.children.map((val, index) => (
              <Route index={!val.path} key={index} path={val.path} element={val.module}/>
            ))
          }
        </Route>
      }
    </Routes>
  );
};

export default LayoutComp;