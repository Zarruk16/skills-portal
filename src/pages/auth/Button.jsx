import React from 'react';

function Button({ text, onClick, type = 'button', fullWidth = false, className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`gap-2 self-end px-4 py-3 mt-6 text-base text-center text-white whitespace-nowrap bg-blue-600 rounded hover:bg-blue-700 transition ${
        fullWidth ? 'w-full' : 'w-auto'
      } ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
