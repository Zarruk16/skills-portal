import React from 'react';
import { CheckCircle, X } from 'lucide-react';

const VerificationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-2xl shadow-lg p-6 w-[400px]'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <CheckCircle className='text-green-500' size={24} />
            <h2 className='text-lg font-semibold text-gray-800'>
              NIN Verified
            </h2>
          </div>
          <button onClick={onClose}>
            <X className='text-gray-600 hover:text-gray-800' size={20} />
          </button>
        </div>
        <p className='text-gray-600 mt-2'>
          Your National Identification Number has been successfully verified.
        </p>
        <button
          className='mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default VerificationModal;
