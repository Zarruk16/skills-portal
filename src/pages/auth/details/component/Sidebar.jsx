import React from "react";

const SidebarItem = ({ Icon, text, isActive }) => {
  console.log("SidebarItem:", text, "isActive:", isActive); // Debugging

  return (
    <div className='flex z-0 gap-4 items-center mt-8 w-full cursor-pointer'>
      <Icon
        isActive={isActive}
        className={`w-12 h-12 shrink-0 self-stretch my-auto rounded aspect-square ${
          isActive ? "text-blue-600" : "text-gray-500"
        }`}
      />
      
      <div className={`self-stretch my-auto text-sm ${isActive ? "text-gray-800 font-bold" : "text-gray-400"}`}>
        {text}
      </div>
    </div>
  );
};

export default SidebarItem;