import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
// import { LuFilter } from 'react-icons/lu';
import Filter from './Filter';

const ReportTable = () => {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showSearch, setShowSearch] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [filter, setFilter] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const applicantsData = [
    { id: '#12594', name: 'Hamza Lawal', skill: 'Project Manager', amount: 'N150,000', date: '10/2/2024' },
    { id: '#12595', name: 'Abuullahi Suleiman', skill: 'Product Design', amount: 'N150,000', date: '10/2/2024' },
    { id: '#12596', name: 'James Agbo', skill: 'QA Tester', amount: 'N150,000', date: '10/2/2024' },
    { id: '#12597', name: 'Umar Aminu', skill: 'Graphic Designer', amount: 'N150,000', date: '10/2/2024' },
    { id: '#12598', name: 'Paul James', skill: 'IT Support', amount: 'N150,000', date: '10/2/2024' },
    { id: '#12599', name: 'Faith Ada', skill: 'UX/UI Designer', amount: 'N', date: '10/2/2024' },
  ];

  const filteredApplicants = applicantsData
    .filter(
      (applicant) =>
        (filter === 'all' || applicant.skill === filter) &&
        applicant.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  return (
    <div className='bg-white p-6 rounded-2xl shadow-md'>
      <div className='text-lg md:text-xl font-semibold mb-4'>Applicant List Report</div>

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
            <th className='text-left py-2 px-4'>ID</th>
            <th className='text-left py-2 px-4'>Name</th>
            <th className='text-left py-2 px-4'>Skill Type</th>
            <th className='text-left py-2 px-4'>Amount</th>
            <th className='text-left py-2 px-4'>Date</th>
            <th className='text-left py-2 px-4'>Student Profile</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplicants.map((applicant) => (
            <tr key={applicant.id} className='border-b'>
              <td className='py-4 px-4'>{applicant.id}</td>
              <td className='py-4 px-4'>{applicant.name}</td>
              <td className='py-4 px-4'>{applicant.skill}</td>
              <td className='py-4 px-4'>{applicant.amount}</td>
              <td className='py-4 px-4'>{applicant.date}</td>
              <td className='py-4 px-4'>
                <button className='border text-blue-600 border-blue-600 px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white'>
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
