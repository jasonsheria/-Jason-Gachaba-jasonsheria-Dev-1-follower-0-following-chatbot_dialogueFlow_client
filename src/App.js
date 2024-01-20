// Filename - App.js

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link,Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Chat from "./component/Chat";
import Login from "./component/Login";

import "./App.css";
function App() {
  // const navigate  = useNavigate();
  const [isLoggedIn, setisLoggedIn]=useState(false);

  useEffect(()=>{
    if(!isLoggedIn){
      // navigate('/', {replace: true})
    }else{
      // navigate('/login', {replace: true})
    }
  },[isLoggedIn]);
  
  return (
   
    <BrowserRouter>
      
      <Routes>
      <Route path="/" element={<Chat />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
        <Route path="/login" element={<Login />} />
       
      </Routes>
    </BrowserRouter>
  );
};
export default App;