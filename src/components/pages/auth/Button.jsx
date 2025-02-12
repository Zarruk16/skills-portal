import React from 'react';

function Button({ text }) {
  return (
    <button type='button' className='gap-2 self-end px-4 py-3 mt-6 text-base text-center text-white whitespace-nowrap bg-blue-600 rounded'>
      {text}
    </button>
  );
}

export default Button;
