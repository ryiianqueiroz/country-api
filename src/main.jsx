import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import CountryPage from './components/CountryPage/CountryPage.jsx';
import Country from "./components/Country/Country"

const router = createBrowserRouter([
  {
    path: "/country-api",
    element: <App/>,
    children: [
      {
        path: "/country-api",
        element: <Country/>
      },
      {
        path: "/country-api/:id",
        element: <CountryPage/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
