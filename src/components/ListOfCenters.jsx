import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const ListOfCenters = () => {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showSearch, setShowSearch] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const centersData = [
    {
      id: '#12594A',
      name: 'Co-Creation Hub, Lagos',
      applicants: 346,
      newApplicants: 33,
    },
    {
      id: '#12594B',
      name: 'IT Hub Central, Kano',
      applicants: 230,
      newApplicants: 78,
    },
    {
      id: '#12594C',
      name: 'Colab Innovation Hub, Kaduna',
      applicants: 320,
      newApplicants: 105,
    },
    {
      id: '#12594D',
      name: 'IDEA Hub, Abuja',
      applicants: 102,
      newApplicants: 32,
    },
    {
      id: '#12594E',
      name: 'Spark Incubator, Port Harcourt',
      applicants: 204,
      newApplicants: 56,
    },
    {
      id: '#12594F',
      name: 'Decagon, Lagos',
      applicants: 789,
      newApplicants: 112,
    },
  ];

  const filteredCenters = centersData
    .filter((center) =>
      center.name.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) =>
      sortOrder === 'asc'
        ? a.applicants - b.applicants
        : b.applicants - a.applicants,
    );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showSearch &&
        event.target.id !== 'search-input' &&
        event.target.id !== 'search-icon'
      ) {
        setShowSearch(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showSearch]);

  return (
    <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl shadow-md'>
      <div className='text-lg md:text-xl font-semibold mb-2'>
        List of Centers
      </div>

      <div className='flex flex-col sm:flex-row justify-between mb-4 gap-2 sm:gap-0'>
        {/* Search Input (Toggle for small screens) */}
        <div className='relative flex items-center'>
          {screenWidth > 600 || showSearch ? (
            <div className='relative'>
              <input
                id='search-input'
                type='text'
                placeholder='Search centers...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='border text-sm md:text-base rounded-lg bg-gray-100 dark:text-gray-200 dark:border-none dark:bg-main-dark-bg py-2 px-4 pl-4 pr-10 w-[250px] md:w-[400px] focus:outline-none'
                autoFocus
              />
              <FaSearch className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            </div>
          ) : (
            <FaSearch
              id='search-icon'
              className='text-gray-400 text-xl cursor-pointer'
              onClick={() => setShowSearch(true)}
            />
          )}
        </div>

        {/* Filter Button */}
        <button
          type='button'
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className='bg-gray-100 text-sm md:text-base dark:text-gray-200 dark:bg-main-dark-bg px-4 py-2 rounded-lg flex items-center'
        >
          <FaFilter className='mr-2' />
        </button>
      </div>

      {/* Centers Table */}
      <table className='w-full border-collapse text-sm md:text-base'>
        <thead>
          <tr className='border-b'>
            <th className='text-left py-2 uppercase'>ID</th>
            <th className='text-left py-2 uppercase'>Center Name</th>
            <th className='text-left py-2 uppercase'>Total no of Applicants</th>
          </tr>
        </thead>
        <tbody>
          {filteredCenters.map((center) => (
            <tr key={center.id} className='border-b'>
              <td className='py-4'>{center.id}</td>
              <td className='py-4'>{center.name}</td>
              <td className='py-4 font-semibold flex items-center'>
                {center.applicants}
                <span className='ml-2 bg-green-300 text-green-900 text-[9px] md:text-[11px] font-semibold px-2 py-1 rounded-full'>
                  {center.newApplicants} new
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfCenters;
