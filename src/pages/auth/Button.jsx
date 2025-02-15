import React from 'react';

function Button({ text, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick} // ✅ Ensure the button can trigger events
      className='gap-2 self-end px-4 py-3 mt-6 text-base text-center text-white whitespace-nowrap bg-blue-600 rounded hover:bg-blue-700 transition'
    >
      {text}
    </button>
  );
}

export default Button;
