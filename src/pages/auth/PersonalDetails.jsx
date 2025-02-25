import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormContext } from '../../contexts/FormContextProvider'; // Correct import path
import SidebarItem from './details/component/Sidebar';
import InputField from './InputField';
import ProgressBar from './details/component/progress';
import { statesData } from './states';
import { UserIcon, BvnIcon, SkillsIcon, PreviewIcon, SelectCenterIcon } from "../../pages/icons";
import { useMediaQuery } from 'react-responsive'; // For handling responsive behavior

const PersonalDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(FormContext); // Use FormContext

  const [firstName, setFirstName] = useState(formData.firstName);
  const [surname, setSurname] = useState(formData.surname);
  const [gender, setGender] = useState(formData.gender);
  const [dob, setDob] = useState(formData.dob);
  const [state, setState] = useState(formData.state);
  const [lga, setLga] = useState(formData.lga);
  const [lgas, setLgas] = useState([]);
  const [email, setEmail] = useState(formData.email);
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber);
  const [address, setAddress] = useState(formData.address);

  const isSmallDevice = useMediaQuery({ query: '(max-width: 768px)' }); // Check if device is small

    // Sidebar items
    const sidebarItems = [
      { Icon: UserIcon, text: "Personal Details", path: "/personal-details" },
      { Icon: BvnIcon, text: "BVN", path: "/bvn" },
      { Icon: SkillsIcon, text: "Skills Selection", path: "/skills-selection" },
      { Icon: PreviewIcon, text: "Preview", path: "/preview" },
      { Icon: SelectCenterIcon, text: "Select Center", path: "/select-center" },
      { Icon: PreviewIcon, text: "Final Review", path: "/final-review" }, // Added Final Review
    ];

  const activeSidebarItem = sidebarItems.find(item => location.pathname === item.path);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    setLgas(statesData[selectedState]?.lgas || []);
    setLga('');
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    setDob(formattedDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update global form data
    setFormData({
      firstName,
      surname,
      gender,
      dob,
      state,
      lga,
      email,
      phoneNumber,
      address,
    });

    // Navigate to BVN page
    navigate('/bvn');
  };

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
            <h1 className='text-xl md:text-3xl font-medium text-black max-md:max-w-full'>Personal Details</h1>

            <form onSubmit={handleSubmit} className='flex flex-col mt-3 md:mt-8 w-full max-md:max-w-full'>
              {/* First Name & Surname */}
              <div className='grid grid-cols-2 gap-4 max-md:grid-cols-1'>
                <InputField label='First Name' type='text' id='first-name' placeholder='Enter First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <InputField label='Surname' type='text' id='surname' placeholder='Enter Surname' value={surname} onChange={(e) => setSurname(e.target.value)} />
              </div>

              {/* Gender & DOB */}
              <div className='grid grid-cols-2 gap-4 pt-2 max-md:grid-cols-2'>
                <InputField label='Gender' type='text' id='gender' placeholder='Enter Gender' value={gender} onChange={(e) => setGender(e.target.value)} />
                <InputField
                  label='DOB'
                  type='date'
                  id='dob'
                  placeholder='DD/MM/YYYY'
                  value={dob}
                  onChange={handleDateChange} // Use the custom handler
                />
              </div>

              {/* Address */}
              <div className='flex flex-col mt-4 w-full'>
                <label htmlFor='address' className='text-zinc-900 text-sm'>Address</label>
                <textarea
                  id='address'
                  className='px-4 pt-3 pb-16 w-full bg-white rounded-md border border-solid border-slate-300 min-h-[99px] shadow-md'
                  placeholder='Enter Address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* State & LGA */}
              <div className='grid grid-cols-2 gap-4 pt-4 max-md:grid-cols-1'>
                <div className='flex flex-col'>
                  <label htmlFor='state' className='text-zinc-900 text-sm'>State</label>
                  <select
                    id='state'
                    className='px-4 py-2 w-full border border-solid border-slate-300 rounded-md'
                    value={state}
                    onChange={handleStateChange}
                  >
                    <option value='' disabled>Select State</option>
                    {Object.keys(statesData).map((stateName) => (
                      <option key={stateName} value={stateName}>{stateName}</option>
                    ))}
                  </select>
                </div>

                <div className='flex flex-col'>
                  <label htmlFor='lga' className='text-zinc-900 text-sm'>L.G.A</label>
                  <select
                    id='lga'
                    className='px-4 py-2 w-full border border-solid border-slate-300 rounded-md'
                    value={lga}
                    onChange={(e) => setLga(e.target.value)}
                    disabled={!state}
                  >
                    <option value='' disabled>Select LGA</option>
                    {lgas.map((lgaName) => (
                      <option key={lgaName} value={lgaName}>{lgaName}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Email & Phone Number */}
              <div className='grid grid-cols-2 gap-4 pt-6 max-md:grid-cols-1'>
                <InputField label='Email' type='email' id='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputField label='Phone Number' type='tel' id='phoneNumber' placeholder='Enter Phone Number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>

              {/* Proceed Button */}
              <button type='submit' className='w-full md:w-auto md:self-end px-4 py-3 mt-8 text-base text-center text-white bg-blue-600 rounded'>
                Proceed
              </button>
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

export default PersonalDetails;