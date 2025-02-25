import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useRoutes,
} from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider'; // Correct path
import { FormContextProvider } from './contexts/FormContextProvider'; // Correct path
import NinVerification from './pages/auth/NinVerification';
import Registration from './pages/auth/Registration';
import Otp from './pages/auth/Otp';
import Createpassword from './pages/auth/CreatePassword';
import Login from './pages/auth/Login';
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Dashboard, Centers, Applicants, Reports } from './pages';
import './App.css';
import PersonalDetails from './pages/auth/PersonalDetails';
import Bvn from './pages/auth/Bvn';
import SkillSelect from './pages/auth/SkillSelect';
import Preview from './pages/auth/Preview';
import SelectCenter from './pages/auth/SelectCenter';
import FinalReview from './pages/auth/FinalReview';
import Welcome from './pages/auth/Welcome';
import GetStarted from './pages/auth/GetStated';

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
          {/* ✅ Redirect root URL to Verification Page */}
          <Route path='/' element={<Navigate to='/verification' />} />

          {/* Public Routes */}
          <Route path='/verification' element={<NinVerification />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/otp' element={<Otp />} />
          <Route path='/createpassword' element={<Createpassword />} />
          <Route path='/login' element={<Login />} />
          <Route path='/get-started' element={<GetStarted />} />

          {/* Wrap the specified routes with FormContextProvider */}
          <Route
            path='/personal-details'
            element={
              <FormContextProvider>
                <PersonalDetails />
              </FormContextProvider>
            }
          />
          <Route
            path='/bvn'
            element={
              <FormContextProvider>
                <Bvn />
              </FormContextProvider>
            }
          />
          <Route
            path='/skills-selection'
            element={
              <FormContextProvider>
                <SkillSelect />
              </FormContextProvider>
            }
          />
          <Route
            path='/preview'
            element={
              <FormContextProvider>
                <Preview />
              </FormContextProvider>
            }
          />
          <Route
            path='/select-center'
            element={
              <FormContextProvider>
                <SelectCenter />
              </FormContextProvider>
            }
          />
          <Route
            path='/Final-review'
            element={
              <FormContextProvider>
                <FinalReview />
              </FormContextProvider>
            }
          />
          <Route
            path='/welcome'
            element={
              <FormContextProvider>
                <Welcome />
              </FormContextProvider>
            }
          />

          {/* ✅ Fixed Protected Route */}
          <Route path='/dashboard/*' element={<ProtectedRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

// ✅ Fix ProtectedRoute to ensure proper authentication check
const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? <DashboardLayout /> : <Navigate to='/login' />;
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