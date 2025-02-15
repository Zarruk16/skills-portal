import React from 'react';
import GraduatesCard from './GraduatesCard';
import { Header } from '../components';

const Overview = () => {
  const graduatesData = [
    {
      id: 1,
      title: 'UX Designer',
      value: 64,
      newApplicants: 6,
      color: 'bg-blue-500',
    },
    {
      id: 2,
      title: 'Project Manager',
      value: 164,
      newApplicants: 12,
      color: 'bg-orange-500',
    },
    {
      id: 3,
      title: 'React Developer',
      value: 27,
      newApplicants: 7,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className='max-w-7xl mx-auto p-6 space-y-8'>
      <Header category='' title='Total Number Of Graduates' />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {graduatesData.map((data) => (
          <GraduatesCard
            key={data.id}
            title={data.title}
            value={data.value}
            newApplicants={data.newApplicants}
            color={data.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Overview;
