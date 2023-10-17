import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AddUser from './AddUser.jsx'
import UpdateUser from './UpdateUser.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    loader: () => fetch('https://user-management-server-mml8y4pzs-devavi.vercel.app/users')
  },
  {
    path: '/addUser',
    element: <AddUser></AddUser>
  },
  {
    path: '/updateUser/:id',
    element: <UpdateUser></UpdateUser>,
    loader: ({params}) => fetch(`https://user-management-server-mml8y4pzs-devavi.vercel.app/users/${params.id}`)
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
