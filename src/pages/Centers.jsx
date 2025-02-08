import React from 'react';
import ListOfCenters from '../components/ListOfCenters';
// import { customersData, customersGrid } from '../data/dummy';
// import { Header } from '../components'; // If you're using Header in the future, otherwise remove this import.
import Banner from '../components/WelcomeBanner';

const Customers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className='mt-[60px] md:mt-30 lg:mt-5 max-w-7xl mx-auto p-4 space-y-8'>
      {/* Full-Width Section */}
      <Banner />

      <ListOfCenters />
    </div>
  );
};

export default Customers;
