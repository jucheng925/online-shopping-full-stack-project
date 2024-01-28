import React from 'react'
import App from './components/App.jsx'
import Home from './pages/Home.jsx'
import Signup from './components/Signup'
import ErrorPage from './pages/error_page.jsx'
import Storelist from './components/Storelist.jsx'
import ItemsList from './components/ItemsList.jsx'

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
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
        path: "/stores",
        element: <Storelist/>
      },
      {
        path: "/stores/:id",
        element: <ItemsList/>
      }
    ]
  }
]

export default routes

