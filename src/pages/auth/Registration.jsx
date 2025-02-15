import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputField from './InputField';
import Button from './Button';
import Footer from './Footer';
import hero from '../../data/hero.svg';
import icon1 from '../../data/icon2.svg';

function Registration() {
  const navigate = useNavigate();
  const [phonenumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value.trim());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!phonenumber) {
      toast.error('Please enter your phone number before proceeding.');
      return;
    }

    if (!email) {
      toast.error('Please enter your Email before proceeding.');
      return;
    }

    setLoading(true);

    // Simulate API request delay
    setTimeout(() => {
      setLoading(false);
      navigate('/otp', { state: { phonenumber } }); // 🔹 Pass phone number to OTP page
    }, 1500);
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
            <div className=' w-full '>
              <div className='flex gap-4 justify-between items-center mx-0 text-sm text-zinc-600 '>
                <span>Stage 2: Registration</span>
                <span className='text-right'>2/4</span>
              </div>
              <div className='flex gap-2 w-full mx-4 mt-6 max-md:mx-2.5'>
                <div className='w-24 h-1.5 bg-blue-600 rounded-[31px]' />
                <div className='w-24 h-1.5 bg-blue-600 rounded-[31px]' />
                <div className='h-1.5 bg-neutral-300 rounded-[31px] w-[95px]' />
                <div className='h-1.5 bg-neutral-300 rounded-[31px] w-[95px]' />
              </div>

              {/* ✅ Form Section */}
              <div className='mx-0 mt-20 items-start max-md:mx-0 max-md:mt-10'>
                <img
                  loading='lazy'
                  src={icon1}
                  className='object-contain w-16 aspect-square'
                  alt='Registration icon'
                />
                <div className='flex flex-col mt-8 w-full'>
                  <h1 className='text-4xl font-medium text-slate-900'>
                    Registration
                  </h1>
                  <p className='mt-4 text-base text-zinc-600'>
                    Please provide the necessary details.
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className='flex flex-col mt-12 w-full max-md:mt-10'
                  >
                    <InputField
                      label='Phone Number'
                      type='text'
                      id='phoneNumber'
                      placeholder='+2348012121212'
                      value={phonenumber}
                      onChange={handlePhoneNumberChange}
                    />
                    <InputField
                      required
                      label='Email Address'
                      type='email'
                      id='email'
                      placeholder='skillsportal@gmail.com'
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <div className='flex justify-end'>
                      <Button
                        text={loading ? 'Processing...' : 'Proceed'}
                        onClick={handleSubmit}
                        disabled={loading}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>

        {/* ✅ Right Panel (Fully Restored) */}
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

      <ToastContainer aria-live='polite' />
    </div>
  );
}

export default Registration;
