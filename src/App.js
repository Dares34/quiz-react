import React from 'react'

import Login from './pages/Login';
import Register from './pages/Register';

import Menu from './pages/Menu';

import Quiz from './pages/Quiz'


import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      
      {/* /profile
      /create-room
      /lobby */}

      <Route path='/menu' element={<Menu/>}/>

      <Route path='/quiz' element={<Quiz/>}/>
    </Routes> 
    </BrowserRouter>
  )
}

export default App