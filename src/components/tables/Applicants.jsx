import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Filter from './Filter';

const ListOfApplicants = () => {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showSearch, setShowSearch] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [filter, setFilter] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const applicantsData = [
    { id: '#12594', name: 'Hamza Lawal', skill: 'Project Manager', location: 'Abuja', status: 'Verified' },
    { id: '#12595', name: 'Abuullahi Suleiman', skill: 'Product Design', location: 'Kano', status: 'Pending' },
    { id: '#12596', name: 'James Agbo', skill: 'QA Tester', location: 'Port Harcourt', status: 'Verified' },
    { id: '#12597', name: 'Umar Aminu', skill: 'Graphic Designer', location: 'Kaduna', status: 'Pending' },
    { id: '#12598', name: 'Paul James', skill: 'IT Support', location: 'Lagos', status: 'Verified' },
    { id: '#12599', name: 'Faith Ada', skill: 'UX/UI Designer', location: 'Kaduna', status: 'Pending' },
  ];

  const filteredApplicants = applicantsData.filter((applicant) =>
    (filter === 'all' || applicant.skill.toLowerCase() === filter.toLowerCase()) &&
    applicant.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedApplicants = [...filteredApplicants].sort((a, b) =>
    sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
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
      if (showSearch && !event.target.closest('#search-input, #search-icon')) {
        setShowSearch(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showSearch]);

  return (
    <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl shadow-md'>
      <div className='text-lg md:text-xl font-semibold mb-4'>Applicants List</div>

      <div className='flex flex-col sm:flex-row justify-between items-center mb-4 gap-4'>
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
          <Filter onFilterChange={setFilter} onSortChange={setSortOrder} activeDropdown={activeDropdown} toggleDropdown={toggleDropdown} />
        </div>
      </div>

      <table className='w-full border-collapse text-sm'>
        <thead>
          <tr className='border-b font-medium text-gray-600 uppercase'>
            <th className='text-left py-2 uppercase'>ID</th>
            <th className='text-left py-2 uppercase'>Name</th>
            <th className='text-left py-2 uppercase'>Skill</th>
            <th className='text-left py-2 uppercase'>Location</th>
            <th className='text-left py-2 uppercase'>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedApplicants.map((applicant) => (
            <tr key={applicant.id} className='border-b'>
              <td className='py-4'>{applicant.id}</td>
              <td className='py-4'>{applicant.name}</td>
              <td className='py-4'>{applicant.skill}</td>
              <td className='py-4'>{applicant.location}</td>
              <td className='py-4'>
                <span className='flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg'>
                  <span className={`w-2 h-2 rounded-full mr-2 ${applicant.status === 'Verified' ? 'bg-green-500' : 'bg-orange-500'}`} />
                  {applicant.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfApplicants;
