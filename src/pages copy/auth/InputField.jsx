import React from 'react';

function InputField({ label, type, id, placeholder }) {
  return (
    <div className='flex flex-col mb-4 w-full text-sm'>
      <label htmlFor={id} className='text-zinc-900 mb-1'>{label}</label>
      <div className='flex flex-col w-full whitespace-nowrap text-zinc-400'>
        <div className='flex overflow-hidden gap-10 justify-between items-center px-4 py-3 w-full bg-white rounded-md border border-solid border-slate-300 min-h-[40px] shadow-[0px_1px_2px_rgba(0,0,0,0.08)]'>
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            className='gap-2 self-stretch my-auto w-full text-zinc-600'
            aria-label={label}
          />
          {type === 'date' && (
            <img
              loading='lazy'
              src='https://cdn.builder.io/api/v1/image/assets/TEMP/fe852f3a5617db69b106aaf34b37ce76f28dd0863de78d14b52370c99911e5ac?placeholderIfAbsent=true&apiKey=887aea4ac6424945b4e26c02f12da1bf'
              className='object-contain shrink-0 self-stretch my-auto w-4 aspect-square'
              alt=''
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default InputField;
