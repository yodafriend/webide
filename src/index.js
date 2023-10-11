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
import ProtectedRoute from './Route/ProtectedRoute';
import { AuthProvider } from './auth/AuthContext';

const router = createBrowserRouter([
  {
    path: 'ide/:projectId',
    element: (
      <ProtectedRoute>
        <IdePage />
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin',
    element: (
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/forgot',
    element: <Forgot />,
  },
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <GlobalStyles />
    <RouterProvider router={router} />
  </AuthProvider>,
);
