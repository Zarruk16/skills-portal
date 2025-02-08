import React from 'react';

const Footer = () => (
  <footer className='mt-24 text-center'>
    <p className='dark:text-gray-200 text-gray-700 m-20'>
      © {new Date().getFullYear()} All rights reserved by <span className='font-semibold'>YourCompany</span>
    </p>
  </footer>
);

export default Footer;
