import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegCircleCheck } from 'react-icons/fa6';

import InputField from './InputField';
import Button from './Button';
import Footer from './Footer';
import hero from '../../data/hero.svg';
import icon1 from '../../data/icon1.svg';

function Verification() {
  const navigate = useNavigate();
  const [nin, setNin] = useState('');
  const [dob, setDob] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleProceed = () => {
    setIsModalOpen(false);
    navigate('/registration');
  };

  const handleNinChange = (e) => {
    setNin(e.target.value.trim());
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nin) {
      toast.error('Please enter your NIN before proceeding.');
      return;
    }

    if (!dob) {
      toast.error('Please enter your Date of Birth before proceeding.');
      return;
    }

    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (age < 18 || (age === 18 && monthDiff < 0)) {
      toast.error('You must be at least 18 years old to proceed.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(true);
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
            <div className='my-auto w-full max-md:mt-10'>
              <div className='flex gap-2 justify-between items-center mx-0 text-sm text-zinc-600 max-md:mx-2.5'>
                <span>Stage 1: Verification</span>
                <span className='text-right'>1/4</span>
              </div>
              <div className='flex gap-2 w-full mx-4 mt-6 max-md:mx-2.5'>
                <div className='w-24 h-1.5 bg-blue-600 rounded-[31px]' />
                <div className='h-1.5 bg-neutral-300 rounded-[31px] w-[95px]' />
                <div className='w-24 h-1.5 bg-neutral-300 rounded-[31px]' />
                <div className='h-1.5 bg-neutral-300 rounded-[31px] w-[95px]' />
              </div>

              <div className='mx-0 mt-20 items-start max-md:mx-0 max-md:mt-10'>
                <img
                  loading='lazy'
                  src={icon1}
                  className='object-contain w-16 aspect-square'
                  alt='Verification icon'
                />
                <div className='flex flex-col mt-8 w-full'>
                  <h1 className='text-4xl font-medium text-slate-900'>
                    Verification
                  </h1>
                  <p className='mt-4 text-base text-zinc-600'>
                    Please enter your NIN for verification. Date of Birth is
                    required.
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className='flex flex-col mt-12 w-full max-md:mt-10'
                  >
                    <InputField
                      label='NIN Number'
                      type='text'
                      id='ninNumber'
                      placeholder='12345678901'
                      value={nin}
                      onChange={handleNinChange}
                    />
                    <InputField
  label='Date of Birth (required)'
  type='date'
  id='dateOfBirth'
  placeholder='Select your birth date'
  value={dob}
  onChange={setDob}
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

      {/* ✅ Modal - Opens on successful submission */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4'>
          <div className='bg-white rounded-lg shadow-lg p-4 md:p-6 w-full max-w-[90%] sm:max-w-[400px] flex flex-col'>
            <div className='flex justify-between items-center mb-4'>
              <div className='flex items-center gap-2'>
                <FaRegCircleCheck className='w-6 h-6 text-green-600' />
                <h2 className='text-lg font-bold text-gray-800'>
                  NIN Verified
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className='text-gray-600 hover:text-gray-800 text-xl'
              >
                ✖
              </button>
            </div>
            <p className='text-sm md:text-base text-gray-600'>
              Your National Identification Number has been successfully
              confirmed.
            </p>
            <div className='flex justify-end mt-6'>
              <button
                className='bg-blue-600 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg w-full sm:w-auto hover:bg-blue-700'
                onClick={handleProceed}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Verification;
