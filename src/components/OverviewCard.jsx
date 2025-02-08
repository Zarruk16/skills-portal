import React, { useState } from 'react'; // Changed to single quotes

// Function to determine progress circle color
const getProgressColor = (percentage) => {
  if (percentage >= 75) return 'stroke-green-500'; // Green for 75% - 100%
  if (percentage >= 30) return 'stroke-orange-500'; // Orange for 30% - 74%
  return 'stroke-red-500'; // Red for 0% - 29%
};

function OverviewCard({ title, totalApplications, totalAmount, percentage }) {
  const [isHovered, setIsHovered] = useState(false);
  const progressColor = percentage !== undefined ? getProgressColor(percentage) : null;

  // Check if the card should be centered
  const isCentered = percentage === undefined;

  return (
    <div className={`bg-card-bg p-8 w-full h-full dark:border dark:border-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-lg transform transition-all hover:shadow-xl hover:-translate-y-1 
      ${isCentered ? 'flex flex-col items-center justify-center text-center' : 'flex items-center justify-between'}
    `}>
      {/* Title & Data */}
      <div className="flex flex-col gap-4">
        <h2 className="text-gray-700 dark:text-gray-200 text-base font-semibold">{title}</h2>
        <div className="text-gray-900 dark:text-gray-200 text-3xl font-bold">
          {totalAmount ? `${totalAmount.toLocaleString()}` : totalApplications}
        </div>
      </div>

      {/* Right Side - Circular Progress (Only if percentage exists) */}
      {!isCentered && percentage !== undefined && (
        <div
          className='relative w-20 h-20'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx='50%'
              cy='50%'
              r='30'
              strokeWidth='10'
              fill='none'
              className='stroke-gray-300'
            />
            <circle
              cx='50%'
              cy='50%'
              r='30'
              strokeWidth='10'
              fill='none'
              strokeDasharray='188'
              strokeDashoffset={(188 * (100 - percentage)) / 100}
              className={`transition-all duration-700 ease-out ${progressColor}`}
              strokeLinecap='round'
            />
          </svg>
          {/* Percentage in center */}
          <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-800">
            {percentage}%
          </div>

          {/* Tooltip on Hover */}
          {isHovered && (
            <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black text-white text-xs rounded-md shadow-lg">
              {percentage}% Completed
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OverviewCard;
