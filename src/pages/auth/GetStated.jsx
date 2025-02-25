import React, { useState } from 'react'; // Import useState
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import LeftImage from '../../data/left.svg'; // Adjust the path as needed
import RightImage from '../../data/right.svg';
import Footer from './Footer'; // Adjust the path as needed

const GetStarted = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const handleLoginClick = async (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsLoading(true); // Set loading state to true

    // Simulate a delay (e.g., for an API call or navigation)
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay

    console.log('Get Started button clicked!'); // Debugging
    navigate('/personal-details'); // Navigate to the personal details page
  };

  return (
    <div 
      className='relative w-screen h-screen flex flex-col items-center justify-center text-center'
      style={{
        background: `radial-gradient(circle, rgba(255, 255, 255, 0.9) 50%, rgba(0, 90, 186, 0.2) 100%)`,
      }}
    >
      {/* Main Content */}
      <div className='flex flex-col max-w-lg p-6 md:p-14 mt-0 md:mt-2 align-center text-center justify-center'>
        <h1 className='text-3xl md:text-5xl px-16 md:px-14 font-semibold'>Welcome to Skills Portal</h1>
        <p className='mt-4 px-8 md:px-0 text-sm md:text-base text-gray-700'>
          Please fill in the following forms to get started with our platform.
          Submit the form and get assigned a center to pursue your studies.
        </p>
        <div className='w-full mt-40 md:mt-8 md:w-auto'> {/* Full width on small screens, auto width on medium screens and larger */}
          {/* Proceed Button */}
          <button
            type='button' // Prevents form submission
            className={`w-full px-4 py-2 text-base text-center text-white bg-blue-600 rounded hover:bg-blue-700 cursor-pointer z-10 relative md:w-auto ${
              isLoading ? 'opacity-50 cursor-not-allowed' : '' // Disable button when loading
            }`}
            onClick={handleLoginClick}
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? (
              <div className='flex items-center justify-center'>
                <svg
                  className='animate-spin h-5 w-5 mr-3 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
                </svg>
                Loading...
              </div>
            ) : (
              'Get Started'
            )}
          </button>
        </div>
      </div>

      {/* Footer Section with Images - Hidden on small screens */}
      <div className='absolute bottom-0 w-full justify-between items-end px-0 hidden md:flex'> {/* Hidden on small screens, flex on medium screens and larger */}
        {/* Left Image */}
        <div className=''>
          <img src={LeftImage} alt='Left Illustration' className='w-full' />
        </div>

        {/* Footer */}
        <div className='flex-grow mx-4'>
          <Footer className='text-center' />
        </div>

        {/* Right Image */}
        <div className=''>
          <img src={RightImage} alt='Right Illustration' className='w-full' />
        </div>
      </div>
    </div>
  );
};

export default GetStarted;