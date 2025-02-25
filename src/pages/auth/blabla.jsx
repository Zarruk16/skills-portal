import React, { useState } from "react";

function SkillSelection() {
  const [selectedSkill, setSelectedSkill] = useState("Product Design");
  const [surveyResponses, setSurveyResponses] = useState({
    proficiency: "Average",
    frequency: "Frequently",
    motivation: ""
  });

  const handleSkillChange = (event) => {
    setSelectedSkill(event.target.value);
  };

  const handleSurveyChange = (question, value) => {
    setSurveyResponses(prev => ({ ...prev, [question]: value }));
  };

  const handleMotivationChange = (event) => {
    setSurveyResponses(prev => ({ ...prev, motivation: event.target.value }));
  };

  const surveyQuestions = [
    {
      question: "proficiency",
      label: "How would you rate your proficiency in the selected skill?",
      options: ["Very Poor", "Poor", "Average", "Good", "Excelent"]
    },
    {
      question: "frequency",
      label: "How frequently do you apply the selected skill in your daily tasks?",
      options: ["Never", "Rarely", "Occasionally", "Frequently", "Always"]
    }
  ];

  return (
    <div className='flex overflow-hidden flex-col items-center px-20 pt-36 pb-14 bg-white max-md:px-5 max-md:pt-24'>
      <div className='flex flex-col max-w-full w-[558px]'>
        <div className='flex flex-col max-md:max-w-full'>
          <h1 className='text-3xl font-medium text-black max-md:max-w-full'>
            Skills Selection
          </h1>
          <div className='flex flex-col mt-8 w-full max-md:max-w-full'>
            <div className='flex flex-col w-full text-sm max-md:max-w-full'>
              <div className='flex flex-col w-full min-h-[61px] max-md:max-w-full'>
                <label htmlFor='skillType' className='text-black'>Select your skill type</label>
                <div className='flex flex-col mt-1 w-full text-black max-md:max-w-full'>
                  <div className='flex overflow-hidden flex-wrap gap-10 justify-between items-center px-4 py-3 w-full bg-white rounded-md border border-solid border-slate-300 min-h-[40px] shadow-[0px_1px_2px_rgba(0,0,0,0.08)] max-md:max-w-full'>
                    <select
                      id='skillType'
                      value={selectedSkill}
                      onChange={handleSkillChange}
                      className='gap-2 self-stretch my-auto w-[131px] appearance-none bg-transparent border-none'
                    >
                      <option value='Product Design'>Product Design</option>
                      <option value='UX Design'>UX Design</option>
                      <option value='UI Design'>UI Design</option>
                    </select>
                    <img
                      loading='lazy'
                      src='https://cdn.builder.io/api/v1/image/assets/TEMP/62b6310d7b792b5e0dedfa12a31aa7c8b0938163d51daa1b8376eb917652eee6?placeholderIfAbsent=true&apiKey=b255d67f834a40fb9a71b620f710fd15'
                      className='object-contain shrink-0 self-stretch my-auto aspect-square w-[15px]'
                      alt=''
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-8 w-full border border-dashed bg-neutral-400 border-neutral-400 min-h-[1px] max-md:max-w-full' />
            <div className='flex flex-col mt-8 w-full max-md:max-w-full'>
              <h2 className='text-2xl text-black max-md:max-w-full'>
                Take a quick survey about your selected skill
              </h2>
              <div className='flex flex-col mt-8 w-full max-md:max-w-full'>
                {surveyQuestions.map(({ question, label, options }) => (
                  <div key={question} className='flex flex-col mb-8 w-full max-md:max-w-full'>
                    <div className='text-base text-black max-md:max-w-full'>{label}</div>
                    <div className='flex flex-wrap gap-9 justify-between items-start mt-4 w-full max-md:max-w-full'>
                      {options.map((option, index) => (
                        <div key={index} className='flex overflow-hidden gap-1 items-center'>
                          <div className='flex flex-col justify-center self-stretch p-1.5 my-auto w-6 fill-white fill-opacity-0'>
                            {option === surveyResponses[question] ? (
                              <img
                                loading='lazy'
                                src={`http://b.io/ext_${index + 2}-`}
                                className='object-contain shrink-0 self-stretch my-auto w-6 aspect-square fill-white fill-opacity-0'
                                alt=''
                              />
                            ) : (
                              <div
                                className='flex shrink-0 w-3.5 h-3.5 bg-gray-50 rounded border-2 border-solid border-zinc-200 cursor-pointer'
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
                            )}
                          </div>
                          <div className='self-stretch my-auto text-base leading-none text-black'>
                            {option}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className='flex flex-col mt-8 w-full max-md:max-w-full'>
                  <label htmlFor='motivation' className='text-base text-black max-md:max-w-full'>
                    Tell us what motivates you to learn this skill?
                  </label>
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
            <div className='flex gap-4 items-start self-end mt-8 text-base text-center whitespace-nowrap'>
              <button className='gap-2 px-4 py-3 text-black rounded border border-blue-600 border-solid'>
                Back
              </button>
              <button className='gap-2 px-4 py-3 text-black bg-blue-600 rounded'>
                Proceed
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap gap-2 items-center mt-44 max-md:mt-10'>
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`flex flex-1 shrink self-stretch my-auto h-1.5 basis-0 rounded-[31px] w-[105px] ${
                index < 3 ? "bg-blue-600" : "bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillSelection;