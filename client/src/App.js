import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import MainContext from './Context/MainContext'

import Login from './Pages/Login'
import Register from './Pages/Register'
import Books from './Pages/Admin/List'
import AddBook from './Pages/Admin/Add'

import Header from './components/Header/Header'
import Alert from './components/Alert/Alert'
import './App.css';
import EditBook from './Pages/Admin/Edit'


const App = () => {

  const [alert, setAlert] = useState({
    message: '',
    status: ''
  })
  const [userInfo, setUserInfo] = useState({})

  const contextValues = { alert, setAlert, userInfo, setUserInfo }

  useEffect(() => {
    axios.get('/api/users/check-auth/')
      .then(resp => {
        setUserInfo(resp.data)
      })
  }, [])

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <div className="container">
          <Alert />
          <Routes>
            {/* Admin keliai */}
            {userInfo.role === 1 &&
              <Route path="admin">
                <Route path="admin/books/list" element={<Books />} />
                <Route path="admin/books/edit/:id" element={<EditBook />} />
                <Route path="amdin/books/add" element={<AddBook />} />
                {/* 
                <Route path="services" element={<Services />} />
                <Route path="services/new" element={<NewService />} />
                <Route path="services/edit/:id" element={<EditService />} />
                <Route path="workers" element={<Workers />} />
                <Route path="workers/new" element={<NewWorker />} />
                <Route path="workers/edit/:id" element={<EditWorker />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders/edit/:id" element={<EditOrder />} /> */}
              </Route>
            }



            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter >
  )
}

export default App;
