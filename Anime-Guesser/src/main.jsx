import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import ArchivedDay from './components/ArchivedDay.jsx';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";


const router = createBrowserRouter([
    {path:"/", element: <App />},
    {path:"/Archive/:dayNumber", element: <ArchivedDay/>}
])

createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router}/>
  
)
