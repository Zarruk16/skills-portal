import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    gender: '',
    dob: null,
    state: '',
    lga: '',
    email: '',
    phoneNumber: '',
    address: '',
    bvn: '',
    accountno: '',
    bank: '',
    skill: '',
    proficiency: '',
    frequency: '',
    motivation: '',
    centerState: '',
    centerCity: '',
    skillCenter: '',
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};