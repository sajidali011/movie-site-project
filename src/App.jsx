import { useState } from 'react'
import './App.css'
import Home from './Components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Movie from './Components/Movie'
import Error from './Components/Error'
import { AppProvider } from './Components/Context';




function App() {

  return (
    <>
    <BrowserRouter>
    <AppProvider>
    <Routes>
      <Route path ='/' element = {<Home/>}/>
      <Route path ='/movie/:id' element = {<Movie/>}/>
      <Route path ='*' element = {<h1>404</h1>}/>
    </Routes>
    </AppProvider>
    </BrowserRouter>
    </>
  )
}

export default App
