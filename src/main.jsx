import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Screen from './components/Screen.jsx'
import Home from './components/Home.jsx'
import Create from './components/Create.jsx'
import Test from './components/Welcome.jsx'
import Grid from './components/Grid.jsx'
import SignupForm from './components/SignupForm.jsx'
import Signupprofile from './components/Signupprofile.jsx'
import PostPage from './components/PostPage.jsx'
import Profile from './components/Profile.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <Screen/>
      },
      {
        path: "Login",
        element: <Login/>
      },
      {
        path: "Signup",
        element: <Signup/>,
        children: [
            {
              path: "",
              element: <SignupForm/>
            },
            {
              path: "profile",
              element: <Signupprofile/>
            }
        ]
      },
      {
        path: "Home",
        element: <Home/>,
        children: [
          {
            path: "",
            element: <Grid/>
          },
          {
            path: "Create",
            element: <Create/>
          },
          {
            path: "Grid",
            element:<Grid/>
          },
          {
            path: "Post",
            element: <PostPage/>
          },
          {
            path: "User",
            element: <Profile/>
          }
        ]
        
      }
      
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/> 
  </React.StrictMode>,
)
