import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputField from './InputField';
import Button from './Button';
import Footer from './Footer';
import { Eye, EyeOff } from 'lucide-react'; // Icons for password toggle
import hero from '../../data/hero.svg';
import icon1 from '../../data/icon3.svg';

function Createpassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phonenumber || ''; // Retrieve phone number from OTP page

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Toggle password visibility
  const togglePassword = () => setShowPassword(!showPassword);

  // Password strength validation
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error('Both password fields are required.');
      return;
    }

    if (!validatePassword(newPassword)) {
      toast.error(
        'Password must include uppercase, lowercase, number & special character.',
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);

    // 🔹 Store phone number & password in local storage as login credentials
    localStorage.setItem('userPhoneNumber', phoneNumber);
    localStorage.setItem('userPassword', newPassword);

    setTimeout(() => {
      setLoading(false);
      toast.success('Password created successfully!');
      navigate('/login'); // Redirect to login page
    }, 1500);
  };

  return (
    <div className='relative min-h-screen bg-white flex flex-col lg:flex-row'>
      {/* Background Image - Hidden on small screens */}
      <div className='hidden md:block'>
        <div
          className='absolute bottom-0 right-0 w-[45%] h-[85%] bg-no-repeat bg-cover z-10 max-md:w-[200px] max-md:h-[200px]'
          style={{
            backgroundImage: `url(${hero})`,
            backgroundSize: 'contain',
            backgroundPosition: 'bottom right',
          }}
        />
      </div>

      <div className='relative flex flex-col lg:flex-row w-full'>
        <div className='flex flex-col items-center mt-10 w-full lg:w-[54%] min-h-screen bg-white'>
          {/* Main container - No padding or margin on small screens */}
          <div className='w-full max-w-[64%] max-md:w-full max-md:px-0 max-md:mx-0 max-md:h-screen'>
            <div className='w-full'>
              <div className='flex gap-4 justify-between items-center mx-0 text-sm text-zinc-600 max-md:mx-0'>
                <span>Stage 4: Create Password</span>
                <span className='text-right'>4/4</span>
              </div>
              <div className='flex gap-2 w-full mt-6 max-md:mx-0'>
                <div className='w-32 h-1.5 bg-blue-600 rounded-[31px]' />
                <div className='w-32 h-1.5 bg-blue-600 rounded-[31px]' />
                <div className='w-32 h-1.5 bg-blue-600 rounded-[31px]' />
                <div className='w-32 h-1.5 bg-blue-600 rounded-[31px]' />
              </div>

              <div className='mx-0 mt-20 max-md:mx-0 max-md:mt-10'>
                <img
                  src={icon1}
                  className='object-contain w-16 aspect-square'
                  alt='Create password icon'
                />
                <h1 className='text-4xl font-medium text-slate-900'>
                  Create Password
                </h1>
                <p className='mt-4 text-base text-zinc-600'>
                  Make sure your password is secured with different string
                  letters, numbers and symbols
                </p>
                <form onSubmit={handleSubmit} className='flex flex-col mt-12'>
                  <div className='relative'>
                    <InputField
                      label='New Password'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Create a new password'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type='button'
                      onClick={togglePassword}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2'
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  <InputField
                    label='Confirm Password'
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <div className='flex justify-end max-md:mt-40'>
                    <Button
                      type='submit'
                      text={loading ? 'Processing...' : 'Proceed'}
                      disabled={loading}
                      className='w-full md:w-auto' // Full width on small screens
                    />
                  </div>
                </form>
              </div>
              {/* Footer - Hidden on small screens */}
              <Footer className='hidden md:block' />
            </div>
          </div>
        </div>

        {/* Right Panel - Hidden on small screens */}
        <div className='relative flex flex-col w-full lg:w-[46%] mt-10 lg:mt-0 hidden md:block'>
          <div
            className='flex flex-col items-center lg:items-end pt-14 px-4 lg:px-0 mx-auto w-full'
            style={{
              background:
                'radial-gradient(circle at top right, rgba(195, 224, 255, 1), rgba(0, 123, 255, 1) 70%)',
            }}
          >
            <div className='text-base font-semibold px-10 text-right text-neutral-800'>
              Skills Portal
            </div>
            <div className='overflow-hidden pb-14 items-center justify-between mt-10 lg:mt-40 max-w-full z-20 pt-10 lg:pt-[697px] w-full lg:w-[724px]'>
              <div className='flex flex-col lg:flex-row gap-5 text-center items-center'>
                <div className='flex flex-col w-full justify-between gap-6'>
                  <a
                    href='/'
                    className='flex gap-2 items-center justify-center lg:justify-center text-base font-semibold text-white'
                  >
                    <span>Back to home</span>
                  </a>
                </div>
                <div className='flex flex-col lg:pl-20 w-full'>
                  <a
                    href='/login'
                    className='text-base font-semibold text-white text-center lg:text-center'
                  >
                    Sign In
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer aria-live='polite' />
    </div>
  );
}

export default Createpassword;