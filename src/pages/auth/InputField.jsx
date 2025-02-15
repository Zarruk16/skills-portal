import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function InputField({ label, type, id, placeholder, value, onChange }) {
  return (
    <div className='flex flex-col mb-4 w-full text-sm'>
      <label htmlFor={id} className='text-zinc-900 mb-1'>
        {label}
      </label>
      <div className='flex flex-col w-full whitespace-nowrap text-zinc-400'>
        {type === 'date' ? (
          <DatePicker
            selected={value}
            onChange={onChange}
            dateFormat='yyyy-MM-dd'
            maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))} // 18+ restriction
            showYearDropdown
            showMonthDropdown
            dropdownMode='select'
            placeholderText={placeholder}
            className='px-4 py-3 w-full bg-white rounded-md border border-solid border-slate-300 min-h-[40px] shadow-[0px_1px_2px_rgba(0,0,0,0.08)]'
          />
        ) : (
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className='px-4 py-3 w-full bg-white rounded-md border border-solid border-slate-300 min-h-[40px] shadow-[0px_1px_2px_rgba(0,0,0,0.08)]'
            aria-label={label}
          />
        )}
      </div>
    </div>
  );
}

export default InputField;
