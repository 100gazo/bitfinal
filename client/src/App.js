import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import MainContext from './Context/MainContext'

import Header from './components/Header/Header'
import Alert from './components/Alert/Alert'

import Login from './Pages/Login'
import Register from './Pages/Register'

import Books from './Pages/Admin/Books'
import AddBook from './Pages/Admin/Add'
import EditBook from './Pages/Admin/Edit'
import Users from './Pages/Admin/Users'

import List from './Pages/List'


import './App.css';


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

            {userInfo.role === 1 &&
              <Route path="admin">
                <Route path="books/list" element={<Books />} />
                <Route path="books/add" element={<AddBook />} />
                <Route path="books/edit/:id" element={<EditBook />} />
                <Route path="users/list" element={<Users />} />

              </Route>
            }
            {/* {userInfo.role === 0 &&
              <Route path="api">
                <Route path="api/books/list" element={<List />} />


              </Route>
            } */}



            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="api/books/list" element={<List />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter >
  )
}

export default App;
