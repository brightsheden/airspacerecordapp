import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.jsx';
import Login from './screens/Login.jsx';
import Register from './screens/Register.jsx';
import AddRecord from './screens/AddRecord.jsx';
import AdminRecordList from './screens/AdminRecordList.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import RecordDetails from './screens/RecordDetailsPage.jsx';
import EditRecord from './screens/EditRecord.jsx';
import { App as CapacitorApp } from '@capacitor/app';
import { useNavigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeScreen />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/addrecord',
    element: <AddRecord />
  },
  {
    path: '/editrecord/:id',
    element: <EditRecord />
  },
  {
    path: '/record/:id',
    element: <RecordDetails />
  },
  {
    path: '/adminrecords',
    element: <AdminRecordList />
  },
]);

const queryClient = new QueryClient();


const BackButtonHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButton = () => {
      if (window.location.pathname === '/') {
        CapacitorApp.exitApp();
      } else {
        navigate(-1);
      }
    };

    const backButtonListener = CapacitorApp.addListener('backButton', handleBackButton);

    return () => {
      backButtonListener.remove();
    };
  }, [navigate]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}>
      <BackButtonHandler />
    </RouterProvider>
  </QueryClientProvider>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <App />
</React.StrictMode>
);
