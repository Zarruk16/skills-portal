import { useState } from 'react';
import { LuFilter } from 'react-icons/lu';
import { FaSort } from 'react-icons/fa';
import React from 'react';

const FilterSort = ({ onFilterChange, onSortChange }) => {
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    activityType: '',
    status: '',
    keyword: '',
  });

  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleFilterChange = (name, value) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      fromDate: '',
      toDate: '',
      activityType: '',
      status: '',
      keyword: '',
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  return (
    <div className='flex space-x-4 relative'>
      {/* Sort Button */}
      <div className='relative'>
        <button
          className='bg-white px-2 py-2 rounded-lg flex items-center space-x-2 border border-gray-300 shadow-md hover:bg-gray-100'
          onClick={() => toggleDropdown('sort')}
        >
          <FaSort className='text-gray-700' />
          <span className='font-medium text-gray-800'>Sort By</span>
        </button>

        {/* Sort Dropdown */}
        {activeDropdown === 'sort' && (
          <div className='absolute right-10 mt-2 bg-white p-2 rounded-lg shadow-lg w-48 z-50 border border-gray-200'>
            <ul className='space-y-2 text-sm text-gray-800'>
              {[
                'Last Updated',
                'First Updated',
                'A to Z',
                'Z to A',
                'Created Date',
                'Status',
              ].map((option) => (
                <li
                  key={option}
                  className='cursor-pointer hover:bg-gray-100 p-2 rounded-lg'
                  onClick={() => {
                    onSortChange(option);
                    setActiveDropdown(null);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Filter Button */}
      <div className='relative mr-1'>
        <button
          className='bg-white px-2 py-2 rounded-lg flex items-center space-x-2 border border-gray-300 shadow-md hover:bg-gray-100'
          onClick={() => toggleDropdown('filter')}
        >
          <LuFilter className='text-gray-700' />
          <span className='font-medium text-gray-800'>Filter</span>
        </button>

        {/* Filter Dropdown */}
        {activeDropdown === 'filter' && (
          <div className='absolute right-2 mt-2 bg-white p-2 rounded-lg shadow-lg w-96 z-50 border border-gray-200'>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>Filter</h2>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Date Range
              </label>
              <div className='flex space-x-2 mt-1'>
                <select
                  className='border p-2 rounded w-full bg-gray-50'
                  onChange={(e) =>
                    handleFilterChange('fromDate', e.target.value)
                  }
                >
                  <option>Select Option</option>
                </select>
                <select
                  className='border p-2 rounded w-full bg-gray-50'
                  onChange={(e) => handleFilterChange('toDate', e.target.value)}
                >
                  <option>Select Option</option>
                </select>
              </div>
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Activity Type
              </label>
              <select
                className='border p-2 rounded w-full bg-gray-50'
                onChange={(e) =>
                  handleFilterChange('activityType', e.target.value)
                }
              >
                <option>Select Option</option>
              </select>
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Status
              </label>
              <select
                className='border p-2 rounded w-full bg-gray-50'
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option>Select Option</option>
              </select>
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Keyword Search
              </label>
              <input
                type='text'
                className='border p-2 rounded w-full bg-gray-50'
                onChange={(e) => handleFilterChange('keyword', e.target.value)}
              />
            </div>
            <div className='flex justify-between'>
              <button className='text-sm text-blue-600' onClick={resetFilters}>
                Reset all
              </button>
              <button
                className='bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700'
                onClick={() => setActiveDropdown(null)}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSort;
