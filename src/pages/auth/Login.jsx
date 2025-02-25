import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputField from './InputField';
import Button from './Button';
import Footer from './Footer';
import login from '../../data/login.svg'; // Hero image for right panel
import icon1 from '../../data/icon4.svg'; // Small icon for branding

function Login() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Simulated authentication (Replace this with an API call)
    const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
    const storedPassword = localStorage.getItem('userPassword');

    if (!phoneNumber || !password) {
      toast.error('Please enter both phone number and password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (phoneNumber === storedPhoneNumber && password === storedPassword) {
        localStorage.setItem('isLoggedIn', 'true'); // ✅ Store login state
        toast.success('Login successful!');
        navigate('/get-started'); // ✅ Redirect to dashboard immediately
      } else {
        toast.error('Invalid phone number or password.');
        setLoading(false); // ✅ Re-enable the button if login fails
      }
    }, 1000);
  };

  return (
    <div className='relative min-h-screen bg-white flex flex-col lg:flex-row'>
      {/* Background Image - Hidden on small screens */}
      <div className='hidden md:block'>
        <div
          className='absolute bottom-0 right-0 w-[45%] h-[85%] bg-no-repeat bg-cover z-10 max-md:w-[200px] max-md:h-[200px]'
          style={{
            backgroundImage: `url(${login})`,
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
              <div className='mx-0 mt-20 max-md:mx-0 max-md:mt-10'>
                <img
                  src={icon1}
                  className='object-contain mb-8 w-16 aspect-square'
                  alt='Login icon'
                />
                <h1 className='text-3xl md:text-4xl font-medium text-slate-900'>
                  Welcome Back
                </h1>
                <p className='mt-4 text-base text-zinc-600'>
                  Please enter your details
                </p>

                <form className='mt-6 w-full space-y-4' onSubmit={handleSubmit}>
                  <InputField
                    type='text'
                    placeholder='Phone Number'
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                  <InputField
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <div className='flex justify-between items-center text-[12px] md:text-sm'>
                    <label className='flex items-center'>
                      <input type='checkbox' className='mr-2 text-[9px]' />
                      Remember Me
                    </label>
                    <button type='button' className='text-blue-500'>
                      Forgot Password?
                    </button>
                  </div>
                  <div className='w-full flex max-md:mt-40'>
                    <Button
                      type='submit'
                      text={loading ? 'Processing...' : 'Sign In'}
                      disabled={loading}
                      className='w-full' // Full width on small screens
                    />
                  </div>
                </form>

                <p className='mt-4 text-center text-sm'>
                  Don't have an account?{' '}
                  <a href='/signup' className='text-blue-500'>
                    Create Account
                  </a>
                </p>
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

export default Login;