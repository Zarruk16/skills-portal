import React from "react";

// 👤 User Icon
export const UserIcon = ({ isActive }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
    <rect width='48' height='48' rx='4' fill='white' />
    <path
      d='M16 34C16 29.5817 19.5817 26 24 26C28.4183 26 32 29.5817 32 34H30C30 30.6863 27.3137 28 24 28C20.6863 28 18 30.6863 18 34H16ZM24 25C20.685 25 18 22.315 18 19C18 15.685 20.685 13 24 13C27.315 13 30 15.685 30 19C30 22.315 27.315 25 24 25ZM24 23C26.21 23 28 21.21 28 19C28 16.79 26.21 15 24 15C21.79 15 20 16.79 20 19C20 21.21 21.79 23 24 23Z'
      fill={isActive ? "#3B82F6" : "#999999"}
    />
  </svg>
);

// 🏦 BVN Icon (Updated)
export const BvnIcon = ({ isActive }) => (
    <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
      <rect width='48' height='48' rx='4' fill='white' />
      <path
        d='M22.0076 14.1033C20.6059 13.6496 19.0823 14.2807 18.412 15.5926L17.6063 17.1697C17.5105 17.3571 17.3581 17.5096 17.1707 17.6053L15.5935 18.4111C14.2816 19.0813 13.6505 20.605 14.1043 22.0065L14.6497 23.6915C14.7145 23.8917 14.7145 24.1073 14.6497 24.3075L14.1043 25.9925C13.6505 27.3941 14.2817 28.9177 15.5935 29.5879L17.1707 30.3937Z'
        fill={isActive ? '#3B82F6' : '#999999'}
      />
    </svg>
  );

// 🛠 Skills Icon
export const SkillsIcon = ({ isActive }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
    <rect width='48' height='48' rx='4' fill='white' />
    <path
      d='M16 17V28H32V17H16ZM14 16.0075C14 15.4511 14.4553 15 14.9918 15H33.0082C33.556 15 34 15.4489 34 16.0075V30H14V16.0075ZM13 31H35V33H13V31Z'
      fill={isActive ? '#3B82F6' : '#999999'}
    />
  </svg>
);

// 👁 Preview Icon
export const PreviewIcon = ({ isActive }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
    <rect width='48' height='48' rx='4' fill='white' />
    <path
      d='M24.0003 15C29.3924 15 33.8784 18.8798 34.8189 24C33.8784 29.1202 29.3924 33 24.0003 33C18.6081 33 14.1222 29.1202 13.1816 24C14.1222 18.8798 18.6081 15 24.0003 15ZM24.0003 31C28.2359 31 31.8603 28.052 32.7777 24C31.8603 19.948 28.2359 17 24.0003 17C19.7646 17 16.1402 19.948 15.2228 24C16.1402 28.052 19.7646 31 24.0003 31Z'
      fill={isActive ? '#3B82F6' : '#999999'}
    />
  </svg>
);

// 📍 Select Center Icon (Updated)
export const SelectCenterIcon = ({ isActive }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
    <rect width='48' height='48' rx='4' fill='white' />
    <path
      d='M33 31H35V33H13V31H15V16C15 15.4477 15.4477 15 16 15H26C26.5523 15 27 15.4477 27 16V31H31V23H29V21H32C32.5523 21 33 21.4477 33 22V31ZM17 17V31H25V17H17ZM19 23H23V25H19V23ZM19 19H23V21H19V19Z'
      fill={isActive ? '#3B82F6' : '#999999'}
    />
  </svg>
);
