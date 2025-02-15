import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import hero from '../../data/hero.svg';
import icon1 from '../../data/otp.svg';

function Otp() {
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phonenumber || ''; // Get phone number from Registration Page
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const correctOtp = '1212'; // Predefined OTP

  // Function to mask phone number (show last 2 digits)
  const maskPhoneNumber = (number) => {
    return number ? `***********${number.slice(-2)}` : 'your phone number';
  };

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp !== correctOtp) {
      toast.error('Invalid OTP. Please try again.');
      setOtp(['', '', '', '']); // Clear OTP inputs
      inputRefs.current[0].focus(); // Reset focus
      return;
    }

    toast.success('OTP Verified Successfully!');
    navigate('/createpassword', { state: { phonenumber: phoneNumber } });
  };

  return (
    <div className='relative min-h-screen bg-white flex flex-col lg:flex-row'>
      <div
        className='absolute bottom-0 right-0 w-[45%] h-[85%] bg-no-repeat bg-cover z-10 max-md:w-[200px] max-md:h-[200px]'
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: 'contain',
          backgroundPosition: 'bottom right',
        }}
      />

      <div className='relative flex flex-col lg:flex-row w-full'>
        <div className='flex flex-col items-center mt-10 w-full lg:w-[54%] min-h-screen bg-white'>
          <div className='w-full max-w-[64%] max-md:w-[90%] max-md:h-screen'>
            <div className='w-full'>
              <div className='flex gap-4 justify-between items-center mx-0 text-sm text-zinc-600'>
                <span>Stage 3: OTP</span>
                <span className='text-right'>3/4</span>
              </div>
              <div className='flex gap-2 w-full mx-4 mt-6'>
                <div className='w-24 h-1.5 bg-blue-600 rounded-[31px]' />
                <div className='w-24 h-1.5 bg-blue-600 rounded-[31px]' />
                <div className='w-24 h-1.5 bg-blue-600 rounded-[31px]' />
                <div className='h-1.5 bg-neutral-300 rounded-[31px] w-[95px]' />
              </div>

              <div className='mx-0 mt-20'>
                <img
                  src={icon1}
                  className='object-contain w-16 aspect-square'
                  alt='Otp icon'
                />
                <h1 className='text-4xl font-medium text-slate-900 mt-6'>
                  Verify Your Code
                </h1>
                <p className='mt-4 text-base text-zinc-600'>
                  We have sent a code to {maskPhoneNumber(phoneNumber)}
                </p>

                <form onSubmit={handleSubmit} className='flex flex-col mt-8'>
                  <div className='flex gap-2 sm:gap-4 text-center justify-center items-center mt-6'>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type='password'
                        value={digit}
                        onChange={(e) => handleChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        maxLength={1}
                        autoFocus={index === 0}
                        className='w-12 h-12 sm:w-16 sm:h-16 border border-gray-400 text-center text-xl sm:text-2xl font-medium rounded-lg focus:ring-blue-500 transition-all duration-300'
                      />
                    ))}
                  </div>
                  <div className='flex items-center justify-between mt-6'>
                    <p className='text-sm text-left text-zinc-600'>
                      Didn’t receive a code?{' '}
                      <span className='text-blue-600 cursor-pointer'>
                        Resend OTP
                      </span>
                    </p>
                    <button
                      type='submit'
                      className='bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-300'
                    >
                      Proceed
                    </button>
                  </div>
                </form>
              </div>
              <Footer />
            </div>
          </div>
        </div>

        <div className='relative flex flex-col w-full lg:w-[46%] mt-10 lg:mt-0'>
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

      <ToastContainer />
    </div>
  );
}

export default Otp;
