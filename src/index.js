import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyles } from 'twin.macro';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import AdminPage from './pages/AdminPage';
import IdePage from './pages/IdePage';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import Forgot from './pages/ResetPasswordPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/ide',
    element: <IdePage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/forgot',
    element: <Forgot />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <GlobalStyles />
    <RouterProvider router={router} />
  </>,
);
