import React from 'react'

import Home from './pages/_Home'

import Login from './pages/Login';
import Register from './pages/Register';

import Menu from './pages/Menu';

import Profile from './pages/Profile';

import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom'
import Lobby from './pages/Lobby';

import Quiz from './pages/Quiz'

import Winner from './pages/Winner'


import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}/>

      <Route path='/login/' element={<Login/>}/>
      <Route path='/register/' element={<Register/>}/>

      <Route path='/create-room/' element={<CreateRoom/>}/>
      <Route path='/lobby/:lobbyCode' element={<Lobby/>}/>
      <Route path='/join-room/' element={<JoinRoom/>}/>

      <Route path='/menu/' element={<Menu/>}/>

      <Route path='/profile/' element={<Profile/>}/>

      <Route path='/quiz/:lobbyCode' element={<Quiz/>}/>

      <Route path='/winner/:lobbyCode' element={<Winner/>}/>
    </Routes> 
    </BrowserRouter>
  )
}

export default App