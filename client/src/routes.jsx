import React from 'react'
import App from './components/App.jsx'
import Home from './components/Home.jsx'
import Signup from './components/Signup'
import ErrorPage from './components/ErrorPage.jsx'
import Storelist from './components/Storelist.jsx'
import StorePage from './components/StorePage.jsx'
import StoreEditForm from './components/StoreEditForm.jsx'
import ItemEditForm from './components/ItemEditForm.jsx'
import MyPurchases from './components/MyPurchases.jsx'
import StorePurchases from './components/StorePurchases.jsx'
import StorePerformance from './components/StorePerformance.jsx'


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
        element: <StorePage/>,
      },
      {
        path: "/stores/:id/edit",
        element: <StoreEditForm />
      },
      {
        path: "/stores/:id/edititem",
        element: <ItemEditForm />
      },
      {
        path: "/mypurchases",
        element: <MyPurchases/>
      },
      {
        path: "/storepurchases",
        element: <StorePurchases/>,
        children: [
          {
            path: "/storepurchases/:id",
            element: <StorePerformance />
          }
        ]
      }
    ]
  }
]

export default routes

