import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormContext } from '../../contexts/FormContextProvider'; // Correct import path
import SidebarItem from './details/component/Sidebar';
import InputField from './InputField';
import ProgressBar from './details/component/progress';
import { statesData } from './states'; // Import statesData
import { UserIcon, BvnIcon, SkillsIcon, PreviewIcon, SelectCenterIcon } from "../../pages/icons";
import { useMediaQuery } from 'react-responsive'; // For handling responsive behavior

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(FormContext); // Access global state

  // Define state variables for editable fields
  const [firstName, setFirstName] = useState(formData.firstName || '');
  const [surname, setSurname] = useState(formData.surname || '');
  const [gender, setGender] = useState(formData.gender || '');
  const [dob, setDob] = useState(formData.dob || '');
  const [state, setState] = useState(formData.state || '');
  const [lga, setLga] = useState(formData.lga || '');
  const [lgas, setLgas] = useState([]);
  const [email, setEmail] = useState(formData.email || '');
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber || '');
  const [address, setAddress] = useState(formData.address || '');
  const [bvn, setBvn] = useState(formData.bvn || '');
  const [accountno, setAccountno] = useState(formData.accountno || '');
  const [bank, setBank] = useState(formData.bank || '');
  const [skill, setSkill] = useState(formData.skill || '');
  const [surveyResponses, setSurveyResponses] = useState({
    proficiency: formData.proficiency || "Average",
    frequency: formData.frequency || "Frequently",
    motivation: formData.motivation || "",
  });

  const isSmallDevice = useMediaQuery({ query: '(max-width: 768px)' }); // Check if device is small

  // Initialize LGAs based on the selected state
  useEffect(() => {
    if (formData.state) {
      setLgas(statesData[formData.state]?.lgas || []);
    }
  }, [formData.state]);

  // Sidebar items
  const sidebarItems = [
    { Icon: UserIcon, text: "Personal Details", path: "/personal-details" },
    { Icon: BvnIcon, text: "BVN", path: "/bvn" },
    { Icon: SkillsIcon, text: "Skills Selection", path: "/skills-selection" },
    { Icon: PreviewIcon, text: "Preview", path: "/preview" },
    { Icon: SelectCenterIcon, text: "Select Center", path: "/select-center" },
    { Icon: PreviewIcon, text: "Final Review", path: "/final-review" }, // Added Final Review
  ];

  // List of major Nigerian banks
  const nigerianBanks = [
    "Access Bank",
    "Citibank Nigeria",
    "Ecobank Nigeria",
    "Fidelity Bank",
    "First Bank of Nigeria",
    "First City Monument Bank",
    "Globus Bank",
    "Guaranty Trust Bank",
    "Heritage Bank",
    "Keystone Bank",
    "Polaris Bank",
    "Providus Bank",
    "Stanbic IBTC Bank",
    "Standard Chartered Bank",
    "Sterling Bank",
    "Suntrust Bank",
    "Union Bank of Nigeria",
    "United Bank for Africa",
    "Unity Bank",
    "Wema Bank",
    "Zenith Bank",
  ];

  // Skill options
  const skillOptions = [
    "Product Design",
    "Software Development",
    "Data Science",
    "Cybersecurity",
    "Project Management",
    "Marketing",
    "Finance",
    "Customer Support"
  ];

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

  // Handle survey responses
  const handleSurveyChange = (question, value) => {
    setSurveyResponses((prev) => ({ ...prev, [question]: value }));
  };

  // Handle motivation textarea
  const handleMotivationChange = (event) => {
    setSurveyResponses((prev) => ({ ...prev, motivation: event.target.value }));
  };

  // Handle form submission
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
      bvn,
      accountno,
      bank,
      skill,
      proficiency: surveyResponses.proficiency,
      frequency: surveyResponses.frequency,
      motivation: surveyResponses.motivation,
    });

    // Navigate to Select Center page
    navigate('/select-center');
  };

  const surveyQuestions = [
    {
      question: "proficiency",
      label: "How would you rate your proficiency in the selected skill?",
      options: ["Very Poor", "Poor", "Average", "Good", "Excellent"]
    },
    {
      question: "frequency",
      label: "How frequently do you apply the selected skill in your daily tasks?",
      options: ["Never", "Rarely", "Occasionally", "Frequently", "Always"]
    }
  ];

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
            <h1 className='text-xl md:text-3xl font-medium text-black max-md:max-w-full'>Preview Selection</h1>

            <form onSubmit={handleSubmit} className='flex flex-col mt-3 md:mt-8 w-full max-md:max-w-full'>
              {/* Personal Details Section */}
              <h2 className='text-lg font-medium mb-4 text-black max-md:max-w-full'>Personal Details</h2>
              <div className='grid grid-cols-2 gap-4 max-md:grid-cols-1'>
                <InputField label='First Name' type='text' id='first-name' placeholder='Enter First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <InputField label='Surname' type='text' id='surname' placeholder='Enter Surname' value={surname} onChange={(e) => setSurname(e.target.value)} />
              </div>
              <div className='grid grid-cols-2 gap-4 pt-2 max-md:grid-cols-1'>
                <InputField label='Gender' type='text' id='gender' placeholder='Enter Gender' value={gender} onChange={(e) => setGender(e.target.value)} />
                <InputField
                  label='Date of Birth'
                  type='date'
                  id='dob'
                  placeholder='DD/MM/YYYY'
                  value={dob}
                  onChange={handleDateChange} // Use the custom handler
                />
              </div>
              <div className='flex flex-col mt-4 w-full'>
                <label htmlFor='address' className='text-zinc-900 text-sm'>Address</label>
                <textarea id='address' className='px-4 pt-3 pb-16 w-full bg-white rounded-md border border-solid border-slate-300 min-h-[99px] shadow-md' placeholder='Enter Address' value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className='grid grid-cols-2 gap-4 pt-4 max-md:grid-cols-1'>
                <div className='flex flex-col'>
                  <label htmlFor='state' className='text-zinc-900 text-sm'>State</label>
                  <select id='state' className='px-4 py-2 w-full border border-solid border-slate-300 rounded-md' value={state} onChange={handleStateChange}>
                    <option value='' disabled>Select State</option>
                    {Object.keys(statesData).map((stateName) => (
                      <option key={stateName} value={stateName}>{stateName}</option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='lga' className='text-zinc-900 text-sm'>L.G.A</label>
                  <select id='lga' className='px-4 py-2 w-full border border-solid border-slate-300 rounded-md' value={lga} onChange={(e) => setLga(e.target.value)} disabled={!state}>
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

              {/* Bank Verification Section */}
              <div className='flex flex-col max-w-full mt-6 w-[558px] min-h-[1px] bg-repeat-x bg-gradient-to-r from-gray-400 via-gray-400 to-transparent bg-[length:9px_1px] max-md:max-w-full'>
                <h2 className='text-lg font-medium mt-6 mb-4 text-black max-md:max-w-full'>Bank Verification</h2>
                <div className='flex flex-col mt-2 w-full'>
                  <InputField label='BVN' type='text' id='bvn' placeholder='2233344717' value={bvn} onChange={(e) => setBvn(e.target.value)} />
                </div>
                <div className='grid grid-cols-2 gap-4 pt-2 max-md:grid-cols-1'>
                  <InputField label='Account Number' type='text' id='accountno' placeholder='0005555557' value={accountno} onChange={(e) => setAccountno(e.target.value)} />
                  <div className='flex flex-col'>
                    <label htmlFor='bank' className='text-sm font-medium text-gray-700 mb-1'>Select Bank</label>
                    <select id='bank' value={bank} onChange={(e) => setBank(e.target.value)} className='w-full px-3 py-2 text-base text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none'>
                      <option value='' disabled className='text-gray-400 text-sm'>Select a bank</option>
                      {nigerianBanks.map((bankName, index) => (
                        <option key={index} value={bankName} className='text-gray-900'>{bankName}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Skills Selection Section */}
              <div className='flex flex-col max-w-full mt-6 w-[558px] min-h-[1px] bg-repeat-x bg-gradient-to-r from-gray-400 via-gray-400 to-transparent bg-[length:9px_1px] max-md:max-w-full'>
                <h2 className='text-lg font-medium mt-6 mb-4 text-black max-md:max-w-full'>Skills Selection</h2>
                <div className='flex flex-col mt-2 w-full'>
                  <label htmlFor='skills' className='mb-2 text-sm font-medium text-gray-700'>Select your skill type</label>
                  <select id='skills' value={skill} onChange={(e) => setSkill(e.target.value)} className='p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'>
                    <option value='' disabled>Select a skill</option>
                    {skillOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                {skill && (
                  <>
                    <div className='mt-8 w-full min-h-[1px] bg-repeat-x bg-gradient-to-r from-gray-400 via-gray-400 to-transparent bg-[length:9px_1px] max-md:max-w-full' />
                    <div className='flex flex-col mt-8 w-full max-md:max-w-full'>
                      <h2 className='text-2xl text-black max-md:max-w-full'>Take a quick survey about your selected skill</h2>
                      <div className='flex flex-col mt-8 w-full max-md:max-w-full'>
                        {surveyQuestions.map(({ question, label, options }) => (
                          <div key={question} className='flex flex-col mb-8 w-full max-md:max-w-full'>
                            <div className='text-sm text-black max-md:max-w-full'>{label}</div>
                            <div className='flex flex-wrap gap-9 justify-between items-start mt-4 w-full max-md:flex-col max-md:gap-4'>
                              {options.map((option, index) => (
                                <div key={index} className='flex gap-1 items-center'>
                                  <div className='flex flex-col justify-center self-stretch p-1.5 my-auto w-6'>
                                    <div
                                      className={`flex shrink-0 w-4 h-4 rounded-full border-2 border-solid border-zinc-200 cursor-pointer transition-colors ${
                                        option === surveyResponses[question] ? 'bg-blue-600 border-blue-600' : 'bg-gray-50'
                                      }`}
                                      onClick={() => handleSurveyChange(question, option)}
                                      role='radio'
                                      aria-checked={option === surveyResponses[question]}
                                      tabIndex={0}
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                          handleSurveyChange(question, option);
                                        }
                                      }}
                                    />
                                  </div>
                                  <div className='self-stretch my-auto text-sm leading-none text-black'>{option}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        <div className='flex flex-col mt-8 w-full max-md:max-w-full'>
                          <label htmlFor='motivation' className='text-sm text-black max-md:max-w-full'>Tell us what motivates you to learn this skill?</label>
                          <div className='flex flex-col mt-4 w-full text-sm text-black max-md:max-w-full'>
                            <textarea
                              id='motivation'
                              value={surveyResponses.motivation}
                              onChange={handleMotivationChange}
                              className='flex overflow-hidden flex-wrap gap-10 justify-between items-start px-4 pt-3 pb-16 w-full bg-white rounded-md border border-solid border-slate-300 min-h-[99px] shadow-[0px_1px_2px_rgba(0,0,0,0.08)] max-md:max-w-full'
                              placeholder='Placeholder text'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
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

export default Preview;