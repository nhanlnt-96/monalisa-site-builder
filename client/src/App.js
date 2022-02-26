import React, {useEffect} from "react";
import Swiper from 'swiper';
import LayoutComp from "./components/layout/LayoutComp";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.scss";

function App() {
  useEffect(() => {
    new Swiper();
  }, []);
  return (
    <LayoutComp/>
  );
}

export default App;
