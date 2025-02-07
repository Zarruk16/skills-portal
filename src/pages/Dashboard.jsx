import React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { LineChart } from '../components';
import WelcomeBanner from '../components/WelcomeBanner';
import Overview from '../components/Overview';
// import Graduates from '../components/Graduates';
import ListOfCenters from '../components/ListOfCenters';
import { dropdownData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: 'Time', value: 'Id' }}
      style={{ border: 'none', color: currentMode === 'Dark' && 'white' }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);
const recentApplications = [
  { name: 'Hamza Lawal', role: 'Project Manager', color: 'bg-yellow-200 text-yellow-800' },
  { name: 'James Agbo', role: 'QA Tester', color: 'bg-green-200 text-green-800' },
  { name: 'Faith Ada', role: 'UX/UI Designer', color: 'bg-blue-200 text-blue-800' },
  { name: 'Paul James', role: 'IT Support', color: 'bg-orange-200 text-orange-800' },
  { name: 'Umar Aminu', role: 'Graphic Designer', color: 'bg-indigo-200 text-indigo-800' },
];

const Ecommerce = () => {
  const { currentMode } = useStateContext();

  return (
    <div className="mt-[60px] md:mt-30 lg:mt-5 max-w-7xl mx-auto p-4 space-y-8">
      {/* Main Components */}
      <WelcomeBanner />
      <Overview />
      {/* <Graduates /> */}

      {/* Responsive Row with Two Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Line Chart - Takes 65% on large screens */}
        <div className="lg:col-span-8 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <p className="text-xl font-semibold">Application Received in 2024</p>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="w-full overflow-auto">
            <LineChart />
          </div>
        </div>

      {/* Recent Applications - Takes 35% on large screens */}
<div className="lg:col-span-4 bg-whitedark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-xl shadow-md">
  <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
  <ul className="divide-y divide-gray-300 w-full h-full mt-6">
    {recentApplications.map((applicant, index) => (
      <li key={index} className="flex items-center justify-between p-3 dark:bg-gray-700 mb-3" style={{ lineHeight: '1.8' }}>
        <span className="font-medium">{applicant.name}</span>
        <span className={`px-4 py-3 text-sm rounded-lg ${applicant.color}`}>{applicant.role}</span>
      </li>
    ))}
  </ul>
</div>
</div>

      {/* Full-Width Section */}
     
      <ListOfCenters />
    </div>
  );
};

export default Ecommerce;
