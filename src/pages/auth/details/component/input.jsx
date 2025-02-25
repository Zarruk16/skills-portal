import React from 'react';

const Input = ({ label, value }) => {
  return (
    <div className='flex flex-col flex-1 shrink self-stretch my-auto basis-0 min-w-[240px]'>
      <label htmlFor={label.toLowerCase().replace(' ', '-')} className='text-black'>
        {label}
      </label>
      <div className='flex flex-col mt-1 w-full text-black whitespace-nowrap'>
        <input
          type='text'
          id={label.toLowerCase().replace(' ', '-')}
          className='flex overflow-hidden gap-10 justify-between items-center px-4 py-3 w-full bg-white rounded-md border border-solid border-slate-300 min-h-[40px] shadow-[0px_1px_2px_rgba(0,0,0,0.08)]'
          defaultValue={value}
        />
      </div>
    </div>
  );
};

export default Input;
