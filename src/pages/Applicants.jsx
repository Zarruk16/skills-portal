import React from 'react';
import Applicants from '../components/tables/Applicants';
// import { customersData, customersGrid } from '../data/dummy';
// import { Header } from '../components'; // If you're using Header in the future, otherwise remove this import.
import Banner from '../components/WelcomeBanner';

const ApplicantsPage = () => (
  <div className='mt-[60px] md:mt-30 lg:mt-5 max-w-7xl mx-auto p-4 space-y-8'>
    <Banner />
    <Applicants />
  </div>
);

export default ApplicantsPage;
