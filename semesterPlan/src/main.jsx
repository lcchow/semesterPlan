import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProvider } from './AppProvider.jsx';
import { createBrowserRouter, createRoutesFromElements, Navigate, RouterProvider, Route} from "react-router-dom";
import Home from './pages/Home';
import Summary from './pages/Summary';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/Login';
import Layout from './components/Layout.jsx';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

//React Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      }, 
      {
        path: "/login",
        element: <Login />,
      }, 
      {
        path: "/home",
        element:< Home/>
        // element: (<ProtectedRoute element={<Home />} />)
      }, 
      {
        path: "/summary",
        element:< Summary/>
        // element: (<ProtectedRoute element={<Summary />}/>),
      }, 
    ]
  }
])

createRoot(document.getElementById('root')).render(

  <GoogleOAuthProvider clientId={clientId}>
    <StrictMode>
      <AppProvider>
          <RouterProvider router={router} />
      </AppProvider>
    </StrictMode>
  </GoogleOAuthProvider>

)
