import React from 'react';

const Footer = () => (
  <footer className='mt-24 text-center px-4 sm:px-4 lg:px-16'>
     <p className='dark:text-gray-200 text-gray-700 my-10 text-sm sm:text-sm'>
      All rights reserved - Skills Portal © {new Date().getFullYear()} || build by 
      <span className='text-sm font-semibold'> Blumentech</span>
    </p>
  </footer>
);

export default Footer;
