import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormContext } from '../../contexts/FormContextProvider';
import SidebarItem from './details/component/Sidebar';
import ProgressBar from './details/component/progress';
import { UserIcon, BvnIcon, SkillsIcon, PreviewIcon, SelectCenterIcon } from "../../pages/icons";
import { useMediaQuery } from 'react-responsive';

const FinalReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = useContext(FormContext);
  const [isAgreed, setIsAgreed] = useState(false);

  const isSmallDevice = useMediaQuery({ query: '(max-width: 768px)' });

  // Personal details
  const personalDetails = [
    { label: "First Name", value: formData.firstName },
    { label: "Last Name", value: formData.surname },
    { label: "Gender", value: formData.gender },
    { label: "DOB", value: formData.dob },
    { label: "Address", value: formData.address },
    { label: "State", value: formData.state },
    { label: "LGA", value: formData.lga },
    { label: "Email", value: formData.email },
    { label: "Phone number", value: formData.phoneNumber }
  ];

  // Bank details
  const bankDetails = [
    { label: "BVN", value: formData.bvn },
    { label: "Account number", value: formData.accountno },
    { label: "Bank", value: formData.bank }
  ];

  // Skill details
  const skillDetails = [
    { label: "Selected Skill", value: formData.skill },
    { label: "Center", value: formData.skillCenter }
  ];

  // Component to render a single detail item
  const DetailItem = ({ label, value }) => (
    <div className='flex flex-col shrink basis-0 min-w-[240px]'>
      <div className='text-gray-400 text-sm'>{label}</div>
      <div className='mt-2'>{value}</div>
    </div>
  );

  // Component to render a section with a title and details
  const Section = ({ title, details }) => {
    const firstRow = details.slice(0, 4);
    const secondRow = details.slice(4, 7);
    const thirdRow = details.slice(7);

    return (
      <div className='flex flex-col w-full max-md:max-w-full'>
        <h2 className='text-base font-medium text-black max-md:max-w-full'>
          {title}
        </h2>
        <div className='grid text-sm text-grey-400 grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-6 items-start mt-8 w-full max-md:max-w-full'>
          {firstRow.map((detail, index) => (
            <DetailItem key={index} label={detail.label} value={detail.value} />
          ))}
        </div>
        <div className='grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 text-sm text-grey-400 gap-4 md:gap-20  items-start mt-4 w-full max-md:max-w-full'>
          {secondRow.map((detail, index) => (
            <DetailItem key={index} label={detail.label} value={detail.value} />
          ))}
        </div>
        <div className='grid sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 text-sm text-grey-400 gap-6 items-start mt-6 w-full max-md:max-w-full'>
          {thirdRow.map((detail, index) => (
            <DetailItem key={index} label={detail.label} value={detail.value} />
          ))}
        </div>
      </div>
    );
  };

  // Divider component
  const Divider = () => (
    <div className='mt-4 mb-4 w-full min-h-[1px] bg-repeat-x bg-gradient-to-r from-gray-400 via-gray-400 to-transparent bg-[length:9px_1px] max-md:max-w-full' />
  );

  // Terms and conditions component with checkbox
  const TermsAndConditions = () => (
    <div className='flex flex-col gap-3 items-start mt-8 w-full text-base text-black max-md:max-w-full'>
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          id='agreement'
          checked={isAgreed}
          onChange={(e) => setIsAgreed(e.target.checked)}
          className='w-5 h-5 rounded border border-gray-300 cursor-pointer focus:ring-blue-500'
        />
        <label htmlFor='agreement' className='italic text-sm'>
          By using this service, you agree to be bound by our Terms and Conditions. Please read them carefully before proceeding.
        </label>
      </div>
    </div>
  );

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
  const handleSubmit = () => {
    if (!isAgreed) {
      alert('You must agree to the terms and conditions before proceeding.');
      return;
    }
    navigate('/welcome');
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

      {/* Main Content Section */}
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
            <h1 className='text-xl md:text-3xl font-medium text-black max-md:max-w-full'>
              Final Review
            </h1>
            <div className='flex flex-col mt-8 w-full max-md:max-w-full'>
              {/* Personal Details Section */}
              <Section title='Personal Details' details={personalDetails} />
              <Divider />

              {/* Bank Verification Section */}
              <Section title='Bank Verification' details={bankDetails} />
              <Divider />

              {/* Skills Selection Section */}
              <Section title='Skills Selection' details={skillDetails} />
              <Divider />

              {/* Terms and Conditions */}
              <TermsAndConditions />

              {/* Button Container for Small Devices */}
              {isSmallDevice && (
                <div className='flex flex-col gap-4 mt-32'>
                  <button
                    className='w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors'
                    onClick={() => navigate(-1)}
                  >
                    ← Back
                  </button>
                  <button
                    type='button'
                    className='w-full px-4 py-2 text-base text-center text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
                    onClick={handleSubmit}
                    disabled={!isAgreed}
                  >
                    Proceed
                  </button>
                </div>
              )}

              {/* Button Container for Medium and Large Screens */}
              {!isSmallDevice && (
                <div className='flex justify-end gap-4 mt-4'>
                  <button
                    className='px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors'
                    onClick={() => navigate(-1)}
                  >
                    ← Back
                  </button>
                  <button
                    type='button'
                    className='px-4 py-2 text-base text-center text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
                    onClick={handleSubmit}
                    disabled={!isAgreed}
                  >
                    Proceed
                  </button>
                </div>
              )}
            </div>

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

export default FinalReview;