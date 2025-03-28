import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Filter from './Filter';

const ListOfCenters = () => {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showSearch, setShowSearch] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [activeDropdown, setActiveDropdown] = useState(null);

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
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

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
      <div className='text-lg md:text-xl font-semibold mb-4'>
        List of Centers
      </div>

      <div className='flex flex-col sm:flex-row justify-between mb-4 gap-2 sm:gap-0'>
        <div className='relative flex items-center w-full sm:w-auto'>
          {screenWidth > 600 || showSearch ? (
            <div className='relative w-full sm:w-auto'>
              <input
                id='search-input'
                type='text'
                placeholder='Search applicants...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='border text-sm md:text-base rounded-lg bg-gray-100 dark:text-gray-200 dark:border-none dark:bg-main-dark-bg py-2 px-4 pl-4 pr-10 w-full sm:w-[250px] md:w-[400px] focus:outline-none'
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
        <div className='flex justify-end w-full sm:w-auto'>
          <Filter
            onSortChange={setSortOrder}
            activeDropdown={activeDropdown}
            toggleDropdown={toggleDropdown}
          />
        </div>
      </div>

      <table className='w-full border-collapse text-sm'>
        <thead>
          <tr className='border-b font-medium text-gray-600 uppercase'>
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
