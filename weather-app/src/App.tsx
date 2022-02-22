import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"

import './App.css'
import {Header} from "./components/header/Header"
import {Footer} from "./components/footer/Footer"
import {MainPage} from "./pages/main/MainPage"
import {CityPage} from "./pages/city/CityPage"

export const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Header/><MainPage/></>}></Route>
        <Route path="cities/:country/:city" element={<><Header main={false}/><CityPage/></>}></Route>
      </Routes>
    </BrowserRouter>
    <Footer/>
  </div>
)
