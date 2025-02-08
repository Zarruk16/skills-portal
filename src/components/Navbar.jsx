import React, { useEffect, useState } from 'react';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import  Notification from './Notification';
import UserProfile from './UserProfile'
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position='BottomCenter'>
    <button
      type='button'
      onClick={() => customFunc()}
      style={{ color }}
      className='relative text-xl rounded-full p-3 hover:bg-light-gray'
    >
      {dotColor && (
        <span
          style={{ background: dotColor }}
          className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'
        />
      )}
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setActiveMenu(screenSize > 900);
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className='flex justify-between p-2 md:ml-6 md:mr-6 relative'>
      {/* Left Side: Menu + Search */}
      <div className='flex items-center'>
        {/* Menu Button */}
        <NavButton
          title='Menu'
          customFunc={handleActiveMenu}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />

        {/* Search Bar (5px margin-left) */}
        <div className='relative flex items-center ml-[5px]'>
          <AiOutlineSearch className='absolute left-3 text-gray-400 text-xl' />
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-400 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white'
          />
        </div>
      </div>

      {/* Right Side: Notification + Profile */}
      <div className='flex'>
        <NavButton
          title='Notification'
          dotColor='rgb(254, 201, 15)'
          customFunc={() => handleClick('notification')}
          color={currentColor}
          icon={<RiNotification3Line />}
        />

        <TooltipComponent content='Profile' position='BottomCenter'>
          <div
            className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
            onClick={() => handleClick('userProfile')}
          >
            <img className='rounded-full w-8 h-8' src={avatar} alt='user-profile' />
            <p>
              <span className='text-gray-400 text-14'>Hi,</span>{' '}
              <span className='text-gray-400 font-bold ml-1 text-14'>Admin</span>
            </p>
            <MdKeyboardArrowDown className='text-gray-400 text-14' />
          </div>
        </TooltipComponent>

        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
