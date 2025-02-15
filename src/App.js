import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useRoutes,
} from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';
import NinVerification from './pages/auth/NinVerification';
import Registration from './pages/auth/Registration';
import Otp from './pages/auth/Otp';
import Createpassword from './pages/auth/CreatePassword';
import Login from './pages/auth/Login';
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Dashboard, Centers, Applicants, Reports } from './pages';
import './App.css';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode } = useStateContext();

  useEffect(() => {
    setCurrentColor(localStorage.getItem('colorMode') || '#007BFF');
    setCurrentMode(localStorage.getItem('themeMode') || 'Light');
  }, [setCurrentColor, setCurrentMode]);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/verification' element={<NinVerification />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/otp' element={<Otp />} />
          <Route path='/createpassword' element={<Createpassword />} />
          <Route path='/login' element={<Login />} />

          {/* ✅ Fixed Protected Route */}
          <Route
            path='/dashboard/*'
            element={<ProtectedRoute element={<DashboardLayout />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

// ✅ Fix ProtectedRoute to ensure proper authentication check
const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? element : <Navigate to='/login' />;
};

// ✅ Fix `DashboardLayout` to correctly render pages using `useRoutes`
const DashboardLayout = () => {
  const { activeMenu, themeSettings, currentMode } = useStateContext();

  // ✅ Fix: Ensure nested routes work correctly
  const dashboardRoutes = useRoutes([
    { path: '/', element: <Dashboard /> },
    { path: 'centers', element: <Centers /> },
    { path: 'applicants', element: <Applicants /> },
    { path: 'report', element: <Reports /> },
  ]);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className='flex relative dark:bg-main-dark-bg'>
        {activeMenu ? (
          <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
            <Sidebar />
          </div>
        ) : (
          <div className='w-0 dark:bg-secondary-dark-bg'>
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full'
              : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'
          }
        >
          <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}
            {dashboardRoutes} {/* ✅ Render Nested Routes */}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
