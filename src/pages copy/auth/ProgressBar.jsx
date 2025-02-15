import React from 'react';

function ProgressBar() {
  return (
    <div className='flex gap-2 mx-4 mt-6 max-md:mx-2.5'>
      <div className='flex shrink-0 w-24 h-1.5 bg-blue-600 rounded-[31px]' />
      <div className='flex shrink-0 h-1.5 bg-neutral-300 rounded-[31px] w-[95px]' />
      <div className='flex shrink-0 w-24 h-1.5 bg-neutral-300 rounded-[31px]' />
      <div className='flex shrink-0 h-1.5 bg-neutral-300 rounded-[31px] w-[95px]' />
    </div>
  );
}

export default ProgressBar;
