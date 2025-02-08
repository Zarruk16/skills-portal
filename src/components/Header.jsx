import React from 'react';

const Header = ({ category, title }) => (
  <div className='mb-10'>
    <p className='text-lg text-gray-400 dark:text-gray-200'>{category}</p>
    <p className='text-xl font-semibold tracking-tight text-slate-900 dark:text-gray-200'>
      {title}
    </p>
  </div>
);

export default Header;
