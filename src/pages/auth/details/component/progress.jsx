import React from 'react';
import { useLocation } from 'react-router-dom';

const ProgressBar = () => {
  const location = useLocation();

  // Define the order of the pages
  const pages = ['/personal-details', '/bvn', '/skills-selection', '/preview', '/select-center', '/final-review'];
  
  // Determine the current step based on the route
  const currentStep = pages.indexOf(location.pathname) + 1;

  return (
    <div className='flex flex-wrap gap-2 items-center'>
      {pages.map((_, index) => (
        <div 
          key={index} 
          className={`flex flex-1 shrink self-stretch my-auto h-1.5 basis-0 rounded-[31px] w-[105px] 
          ${index < currentStep ? 'bg-blue-600' : 'bg-neutral-300'}`} 
        />
      ))}
    </div>
  );
};

export default ProgressBar;
