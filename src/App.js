import React from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import 'antd/dist/antd.css'

export default class App extends React.Component {


  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/' element={<Navigate to='/login'/>}></Route>
        </Routes>
      </BrowserRouter>
    )
  }
} 