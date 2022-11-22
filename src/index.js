import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Test from '@pages/Test'

export const AppContext = createContext()

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
        },
        {
            path: '/go',
            element: <Test />,
        },
    ]
    /* {
        basename: '/cothi',
    }*/
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <AppContext.Provider value={{ test: 1234 }}>
        <RouterProvider router={router} />
    </AppContext.Provider>
)
