// ProtectedRoute.js (Create a new file inside `components` or `utils`)
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isVerified = localStorage.getItem('isVerified') === 'true';
  const hasRegistered = localStorage.getItem('hasRegistered') === 'true';
  const hasEnteredOtp = localStorage.getItem('hasEnteredOtp') === 'true';
  const hasCreatedPassword =
    localStorage.getItem('hasCreatedPassword') === 'true';

  // Step 1: Check if the user has verified their NIN
  if (!isVerified) {
    return <Navigate to='/verification' />;
  }

  // Step 2: Check if the user has completed registration
  if (!hasRegistered) {
    return <Navigate to='/registration' />;
  }

  // Step 3: Check if the user has entered OTP
  if (!hasEnteredOtp) {
    return <Navigate to='/otp' />;
  }

  // Step 4: Check if the user has created a password
  if (!hasCreatedPassword) {
    return <Navigate to='/createpassword' />;
  }

  // Step 5: Final Check - Only allow access if logged in
  return isLoggedIn ? element : <Navigate to='/login' />;
};

export default ProtectedRoute;
