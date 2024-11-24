import React from 'react'

import Login from './pages/Login';
import Register from './pages/Register';

import Menu from './pages/Menu';

import CreateRoom from './pages/CreateRoom';

import Quiz from './pages/Quiz'


import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/create-room' element={<CreateRoom/>}/>
      
      {/* /profile
      /lobby */}

      <Route path='/menu' element={<Menu/>}/>

      <Route path='/quiz' element={<Quiz/>}/>
    </Routes> 
    </BrowserRouter>
  )
}

export default App