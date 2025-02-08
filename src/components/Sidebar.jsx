import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { links, bottomLinks } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();
  const location = useLocation();
  const [activeBottomLink, setActiveBottomLink] = useState(null);

  // Function to close the sidebar on small screens
  const handleCloseSideBar = () => {
    if (screenSize <= 900 && activeMenu !== undefined) {
      setActiveMenu(false);
    }
  };

  // Reset bottom links when a top link is clicked
  const handleTopLinkClick = () => {
    setActiveBottomLink(null);
    handleCloseSideBar();
  };

  // CSS classes for active and normal links
  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
  const normalLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 flex flex-col justify-between'>
      {activeMenu && (
        <>
          {/* Sidebar Top Section */}
          <div>
            <div className='flex justify-between items-center'>
              <Link
                to='/'
                onClick={handleCloseSideBar}
                className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900'
              >
                <span style={{ color: currentColor }}>SKILLS PORTAL</span>
              </Link>
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
              {links.map((item, index) => (
                <div key={item.name}>
                  <p className='text-gray-400 capitalize dark:text-gray-400 m-3 mt-4 uppercase'>{item.name}</p>
                  {item.links.map((link, linkIndex) => {
                    const isFirstLink = index === 0 && linkIndex === 0;
                    return (
                      <NavLink
                        to={`/${link.name}`}
                        key={link.name}
                        onClick={handleTopLinkClick}
                        style={({ isActive }) => ({
                          backgroundColor: isActive || (isFirstLink && location.pathname === '/') ? currentColor : '',
                        })}
                        className={({ isActive }) =>
                          isActive || (isFirstLink && location.pathname === '/') ? activeLink : normalLink
                        }
                      >
                        {React.cloneElement(link.icon, {
                          color: activeBottomLink === link.name ? 'white' : '#007BFF',
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
                  to={`/${link.name}`}
                  onClick={() => setActiveBottomLink(link.name)} // Track which bottom link was clicked
                  className={({ isActive }) =>
                    `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md m-2 
                    ${link.name === 'logout' 
                      ? 'text-red-600 hover:text-red-700' // Red text for logout link
                      : activeBottomLink === link.name // Active background for selected link
                        ? 'text-white bg-blue-500 dark:bg-blue-600' // Active background
                        : 'text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray'}`
                  }
                >
                  {React.cloneElement(link.icon, {
                    color: activeBottomLink === link.name ? 'white' : '#007BFF',
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
