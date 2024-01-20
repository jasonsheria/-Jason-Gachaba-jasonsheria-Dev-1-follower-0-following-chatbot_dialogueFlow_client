import React from 'react'
import './styles.css'
import { redirect } from 'react-router-dom';
import { Route, Routes, useNavigate } from 'react-router-dom';
function Index() { 
  const navigate = useNavigate();

  function handmeIndex(){
    navigate('/')
  }
  return ( 
     <div> 
         <div class="flex-container">
  <div class="text-center">
    <h1>
      <span class="fade-in" id="digit1">4</span>
      <span class="fade-in" id="digit2">0</span>
      <span class="fade-in" id="digit3">4</span>
    </h1>
    <h3 class="fadeIn">PAGE NOT FOUND</h3>
    <button type="button" name="button" onClick={()=>handmeIndex()}>Return To Index</button>
  </div>
</div>
    </div> 
  ); 
} 
export default Index; 