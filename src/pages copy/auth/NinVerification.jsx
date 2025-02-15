import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProgressBar from './ProgressBar.jsx';
import InputField from './InputField';
import Button from './Button';
import Footer from './Footer';

// Initialize toast notifications
toast.configure();

function Verification() {
  const [nin, setNin] = useState('');
  const [dob, setDob] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!nin.match(/^\d{11}$/)) {
      newErrors.nin = 'NIN must be an 11-digit number';
    }
    if (!dob) {
      newErrors.dob = 'Date of Birth is required';
    } else if (new Date(dob) > new Date()) {
      newErrors.dob = 'Invalid Date: Future dates are not allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      toast.success('Verification submitted successfully!'); // ✅ Replaced alert() with toast
      setLoading(false);
    }, 2000);
  };

  return (
    <div className='overflow-hidden justify-center pl-20 bg-white max-md:pl-5'>
      <div className='flex gap-5 max-md:flex-col'>
        {/* Left Panel */}
        <div className='flex flex-col w-[34%] max-md:w-full'>
          <div className='flex z-10 flex-col my-auto w-full max-md:mt-10'>
            <div className='flex gap-10 justify-between items-center mx-4 text-base text-zinc-600 max-md:mx-2.5'>
              <span>Stage 1: Verification</span>
              <span className='text-right'>1/4</span>
            </div>
            <ProgressBar />
            <div className='flex flex-col mx-4 mt-20 max-md:mx-2.5 max-md:mt-10'>
              <img
                loading='lazy'
                src='https://cdn.builder.io/api/v1/image/assets/TEMP/4da9ef6fd16d68c335b775b15c164f3d24afd8b9d34a2a096a6b2a23f9dfd1b6'
                className='object-contain w-16 aspect-square'
                alt='Verification icon'
              />
              <div className='flex flex-col mt-8 w-full'>
                <h1 className='text-4xl font-medium text-slate-900'>
                  Verification
                </h1>
                <p className='mt-4 text-base text-zinc-600'>
                  Please enter your NIN & DOB for Verification
                </p>
                <form
                  className='flex flex-col mt-12 w-full max-md:mt-10'
                  onSubmit={handleSubmit}
                >
                  <InputField
                    label='NIN Number'
                    type='text'
                    id='ninNumber'
                    placeholder='12345678901'
                    value={nin}
                    onChange={(e) => setNin(e.target.value)}
                    error={errors.nin}
                  />
                  <InputField
                    label='Date of Birth'
                    type='date'
                    id='dateOfBirth'
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    error={errors.dob}
                  />
                  <Button
                    text={loading ? 'Processing...' : 'Proceed'}
                    disabled={loading}
                  />
                </form>
              </div>
            </div>
            <Footer />
          </div>
        </div>

        {/* Right Panel */}
        <div className='flex flex-col ml-5 w-[66%] max-md:w-full'>
          <div className='flex flex-col items-end pt-14 pl-20 mx-auto w-full bg-blue-600 max-md:max-w-full'>
            <div className='mr-24 text-base font-semibold text-right text-neutral-800 max-md:mr-2.5'>
              Skills Portal
            </div>
            <div className='overflow-hidden px-20 pb-14 mt-40 max-w-full pt-[697px] w-[724px] max-md:px-5 max-md:pt-24 max-md:mt-10'>
              <div className='flex gap-5 max-md:flex-col'>
                <div className='flex flex-col w-[70%]'>
                  <a
                    href='/'
                    className='flex gap-2 items-center text-base font-semibold text-white'
                  >
                    <img
                      loading='lazy'
                      src='https://cdn.builder.io/api/v1/image/assets/TEMP/d22762fd8c8c14e434a819d488afac1ef1308e337b1c7c27935718b297bc31fa'
                      className='object-contain w-6 aspect-square'
                      alt='Back'
                    />
                    <span>Back to home</span>
                  </a>
                </div>
                <div className='flex flex-col ml-5 w-[30%]'>
                  <a
                    href='/login'
                    className='text-base font-semibold text-white'
                  >
                    Sign In
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verification;
