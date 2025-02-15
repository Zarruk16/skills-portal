import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { links, bottomLinks } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();
  const location = useLocation();
  const [activeNav, setActiveNav] = useState('dashboard'); // Default active to 'dashboard'

  // Close sidebar on small screens
  const handleCloseSideBar = () => {
    if (screenSize <= 900 && activeMenu) {
      setActiveMenu(false);
    }
  };

  // Handle Navigation Click
  const handleNavClick = (name) => {
    setActiveNav(name); // ✅ Set active link dynamically
    handleCloseSideBar();
  };

  // CSS classes for active and normal links
  const activeLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white bg-blue-500 text-md m-2';
  const normalLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 flex flex-col justify-between'>
      {activeMenu && (
        <>
          {/* Sidebar Top Section */}
          <div>
            <div className='flex justify-between items-center'>
              <NavLink
                to='/dashboard'
                onClick={() => handleNavClick('dashboard')}
                className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900'
              >
                <span style={{ color: currentColor }}>SKILLS PORTAL</span>
              </NavLink>
              <TooltipComponent content='Menu' position='BottomCenter'>
                <button
                  type='button'
                  onClick={() => setActiveMenu(!activeMenu)}
                  style={{ color: currentColor }}
                  className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'
                >
                  <MdOutlineCancel />
                </button>
              </TooltipComponent>
            </div>
            <div className='mt-10'>
              {links.map((section) => (
                <div key={section.title}>
                  {section.links.map((link) => {
                    const isDashboard = link.name === 'dashboard';
                    const isActive =
                      location.pathname === `/dashboard/${link.name}` ||
                      (isDashboard && location.pathname === '/dashboard');

                    return (
                      <NavLink
                        to={
                          isDashboard ? '/dashboard' : `/dashboard/${link.name}`
                        } // ✅ FIX: Ensures correct path
                        key={link.name}
                        onClick={() => handleNavClick(link.name)}
                        className={isActive ? activeLink : normalLink}
                        end // ✅ Prevents dashboard from always being active
                      >
                        {React.cloneElement(link.icon, {
                          color: isActive ? 'white' : '#007BFF',
                        })}
                        <span className='capitalize'>{link.name}</span>
                      </NavLink>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Bottom Section */}
          <div className='mt-auto'>
            <div className='dark:border-gray-700 pt-4'>
              {bottomLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={`/dashboard/${link.name}`}
                  onClick={() => handleNavClick(link.name)}
                  className={activeNav === link.name ? activeLink : normalLink}
                >
                  {React.cloneElement(link.icon, {
                    color: activeNav === link.name ? 'white' : '#007BFF',
                  })}
                  <span className='capitalize'>{link.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
