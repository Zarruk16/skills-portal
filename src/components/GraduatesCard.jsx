import React from 'react';

const GraduatesCard = ({ title, value, newApplicants, color }) => {
    return (
        <div className='bg-transparent shadow-md rounded-2xl p-6 flex flex-col items-start justify-between border border-gray-300 dark:border-gray-600'>
            <div className='flex items-center space-x-3'>
                {/* Color box with small border radius */}
                <div 
                    className={`h-10 w-10 rounded-md border border-gray-400 ${color}`} 
                    aria-hidden='true'
                ></div>
                <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
                    {title}
                </h3>
            </div>
            <div className='flex items-end justify-between w-full mt-4'>
                <p className='text-4xl font-bold text-gray-900 dark:text-gray-100'>
                    {value}
                </p>
                {newApplicants > 0 && (
                    <span className='bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-sm px-2 py-1 rounded-lg'>
                        {newApplicants} new
                    </span>
                )}
            </div>
        </div>
    );
};

export default GraduatesCard;
