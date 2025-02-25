import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormContext } from '../../contexts/FormContextProvider'; // Correct import path
import SidebarItem from "./details/component/Sidebar";
import InputField from "./InputField";
import ProgressBar from "./details/component/progress";
import { statesData } from './states'; // Ensure statesData contains capital city info
import { UserIcon, BvnIcon, SkillsIcon, PreviewIcon, SelectCenterIcon } from "../../pages/icons";
import { useMediaQuery } from 'react-responsive'; // For handling responsive behavior

const SelectCenter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(FormContext); // Access global state

  const [state, setState] = useState(formData.centerState || '');
  const [center, setCenter] = useState(formData.centerCity || '');
  const [skillCenter, setSkillCenter] = useState(formData.skillCenter || '');

  const isSmallDevice = useMediaQuery({ query: '(max-width: 768px)' }); // Check if device is small

  // Initialize center city based on the selected state
  useEffect(() => {
    if (formData.centerState) {
      setCenter(statesData[formData.centerState]?.capital || '');
    }
  }, [formData.centerState]);

  // Handle state selection to set the default city (capital)
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    setCenter(statesData[selectedState]?.capital || ''); // Set center city
  };

  // Sidebar items
      const sidebarItems = [
        { Icon: UserIcon, text: "Personal Details", path: "/personal-details" },
        { Icon: BvnIcon, text: "BVN", path: "/bvn" },
        { Icon: SkillsIcon, text: "Skills Selection", path: "/skills-selection" },
        { Icon: PreviewIcon, text: "Preview", path: "/preview" },
        { Icon: SelectCenterIcon, text: "Select Center", path: "/select-center" },
        { Icon: PreviewIcon, text: "Final Review", path: "/final-review" }, // Added Final Review
      ];
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Update global form data
    setFormData((prevData) => ({
      ...prevData,
      centerState: state,
      centerCity: center,
      skillCenter: skillCenter,
    }));

    // Navigate to Final Review page
    navigate('/final-review');
  };

  const activeSidebarItem = sidebarItems.find(item => location.pathname === item.path);

  return (
    <div className='flex gap-5 max-md:flex-col'>
      {/* Sidebar Section (Hidden on Small Devices) */}
      {!isSmallDevice && (
        <div className='flex flex-col w-[28%] max-md:w-full'>
          <div className='flex overflow-hidden flex-col grow items-start px-20 pt-8 w-full text-base text-black bg-indigo-50 pb-[512px] max-md:px-5 max-md:py-24'>
            <p className='pb-6 font-semibold'>Skills Portal</p>
            <div className='flex relative flex-col max-w-full w-[190px]'>
              <div className='absolute left-6 z-0 w-0 border border-solid border-neutral-300 bottom-[26px] min-h-[315px] top-[27px]' />
              {sidebarItems.map((item, index) => (
                <SidebarItem key={index} Icon={item.Icon} text={item.text} isActive={location.pathname === item.path} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className={`flex flex-col ml-5 w-[72%] max-md:ml-0 max-md:w-full ${isSmallDevice ? 'mt-0' : ''}`}>
        <div className='flex overflow-hidden flex-col grow px-20 pt-24 pb-14 w-full bg-white max-md:px-5 max-md:pt-6 max-md:max-w-full'>
          {/* Header for Small Devices */}
          {isSmallDevice && activeSidebarItem && (
            <div className='flex flex-col w-full'>
              <div className='flex items-center gap-1'>
                <activeSidebarItem.Icon className={`w-4 h-4 ${location.pathname === activeSidebarItem.path ? 'text-blue-600' : 'text-gray-500'}`} />
                <h1 className='text-sm font-semibold text-black'>{activeSidebarItem.text}</h1>
              </div>
              {/* Progress Bar for Small Devices */}
              <div className='mt-0 mb-8 w-full'>
                <ProgressBar />
              </div>
            </div>
          )}

          <div className='flex flex-col max-w-full w-[558px]'>
            <h1 className='text-xl md:text-3xl font-medium text-black max-md:max-w-full'>Select Skills Center</h1>

            <form onSubmit={handleSubmit} className='flex flex-col mt-3 md:mt-8 w-full max-md:max-w-full'>
              {/* State & Center City Selection */}
              <div className='grid grid-cols-2 gap-4 pt-4 max-md:grid-cols-1'>
                <div className='flex flex-col'>
                  <label htmlFor='state' className='text-zinc-900 text-sm'>Center State</label>
                  <select id='state' className='px-4 py-2 w-full border border-solid border-slate-300 rounded-md' value={state} onChange={handleStateChange}>
                    <option value='' disabled>Select State</option>
                    {Object.keys(statesData).map((stateName) => (
                      <option key={stateName} value={stateName}>{stateName}</option>
                    ))}
                  </select>
                </div>

                <div className='flex flex-col'>
                  <label htmlFor='center' className='text-zinc-900 text-sm'>Center City</label>
                  <input
                    id='center'
                    type='text'
                    className='px-4 py-2 w-full border border-solid border-slate-300 rounded-md bg-gray-100'
                    value={center}
                    readOnly // Prevent user modification
                  />
                </div>
              </div>

              {/* Skill Center Input */}
              <div className='flex flex-col mt-6 w-full'>
                <InputField
                  label='Skill Center'
                  type='text'
                  id='skillCenter'
                  placeholder='Enter the skill center'
                  value={skillCenter}
                  onChange={(e) => setSkillCenter(e.target.value)}
                />
              </div>

              {/* Button Container for Small Devices */}
              {isSmallDevice && (
                <div className='flex flex-col gap-4 mt-32'>
                  {/* Back Button */}
                  <button
                    type='button'
                    className='w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors'
                    onClick={() => navigate(-1)}
                  >
                    ← Back
                  </button>

                  {/* Proceed Button */}
                  <button
                    type='submit'
                    className='w-full px-4 py-2 text-base text-center text-white bg-blue-600 rounded hover:bg-blue-700'
                  >
                    Proceed
                  </button>
                </div>
              )}

              {/* Button Container for Medium and Large Screens */}
              {!isSmallDevice && (
                <div className='flex justify-end gap-4 mt-4'>
                  {/* Back Button */}
                  <button
                    type='button'
                    className='px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors'
                    onClick={() => navigate(-1)}
                  >
                    ← Back
                  </button>

                  {/* Proceed Button */}
                  <button type='submit' className='px-4 py-2 text-base text-center text-white bg-blue-600 rounded hover:bg-blue-700'>
                    Proceed
                  </button>
                </div>
              )}
            </form>

            {/* Progress Bar for Medium and Large Screens */}
            {!isSmallDevice && (
              <div className='mt-32 w-full'>
                <ProgressBar />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCenter;