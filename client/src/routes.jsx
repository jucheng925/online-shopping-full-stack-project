import React from 'react'
import App from './components/App.jsx'
import Home from './pages/Home.jsx'
import Signup from './components/Signup'
import NoMatch from './pages/NoMatch.jsx'

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/signup",
        element: <Signup/>
      },
      {
        path: "*",
        element: <NoMatch/>
      }
    ]
  }
]

export default routes

