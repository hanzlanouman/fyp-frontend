import React from 'react';
import { useState, useEffect } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Stepper,
  Step,
  Select,
  Option,
} from '@material-tailwind/react';
import { getAvbSupervisors, registerFYP } from '../../services/api';

const FYPRegForm = () => {
  // ... All your previous constants and logic ...
  // (Remove the `showSecondForm` state as we're not using it anymore)
  const [avbSupervisors, setAvbSupervisors] = useState([]);

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await getAvbSupervisors();
        setAvbSupervisors(response.data.supervisors);
      } catch (error) {
        console.error('An error occurred while fetching the data: ', error);
      }
    };

    fetchSupervisors();
  }, []);
  console.log('Available Supervisor', avbSupervisors);
  const departments = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Business Administration',
    'Economics',
    'English',
    'Information Technology',
  ];

  const [studentInfo, setStudentInfo] = useState({
    names: ['', '', ''],
    registrationNumbers: ['', '', ''],
    department: '',
    phone: '',
    projectTitle: '',
    principalSupervisor: '',
    coSupervisor: '',
    projectRequirements: '',
    projectBrief: '',
    additionalComments: '',
    formTitle: 'fypreg',
  });
  const [focusedField, setFocusedField] = useState(null);

  const [isFirstFormValid, setIsFirstFormValid] = useState(true);
  const [isSecondFormValid, setIsSecondFormValid] = useState(true);

  const handleRegNumberChange = (e, index) => {
    let value = e.target.value;
    const pattern = /^[0-9]{0,2}(-[A-Z]{0,2}(-[0-9]{0,5})?)?$/;

    if (pattern.test(value)) {
      if (value.length === 2 || value.length === 5) {
        value += '-';
      }

      const newRegNums = [...studentInfo.registrationNumbers];
      newRegNums[index] = value;
      setStudentInfo((prev) => ({ ...prev, registrationNumbers: newRegNums }));
    }
  };

  const validateSecondForm = () => {
    const validTitle = studentInfo.projectTitle.length >= 3;
    const validPrincipalSupervisor = !!studentInfo.principalSupervisor;
    const validRequirements = !!studentInfo.projectRequirements;
    const validBrief = !!studentInfo.projectBrief;

    if (
      validTitle &&
      validPrincipalSupervisor &&
      validRequirements &&
      validBrief
    ) {
      setIsSecondFormValid(true);
      // You can add logic here to handle the form submission, such as sending it to an API.
      registerFYP(studentInfo)
        .then((res) => {
          alert(res.message);
          console.log(res);
        })
        .catch((e) => alert(e.response.data.error));
    } else {
      setIsSecondFormValid(false);
    }
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((cur) => cur + 1);
  const handlePrev = () => setActiveStep((cur) => cur - 1);

  const validateFirstForm = () => {
    const validNames = studentInfo.names[0].length >= 3;
    const validRegNums = /^(\d{2}-[A-Z]{2}-\d{5})$/.test(
      studentInfo.registrationNumbers[0]
    );
    const validDepartment = !!studentInfo.department;
    const validPhone = /^\d{11}$/.test(studentInfo.phone);

    if (validNames && validRegNums && validDepartment && validPhone) {
      setIsFirstFormValid(true);
      setActiveStep(1); // This will transition to the second form.
    } else {
      setIsFirstFormValid(false);
    }
  };

  return (
    <div className='grid justify-center content-center text-center my-[8rem] mx-[8rem]'>
      <Card color='transparent' shadow={false}>
        <Typography variant='h2' color='blue-gray' className='mb-5'>
          FYP Application Form
        </Typography>

        <Stepper activeStep={activeStep} className='mb-8'>
          <Step onClick={() => setActiveStep(0)}>1</Step>
          <Step onClick={() => setActiveStep(1)}>2</Step>
        </Stepper>

        {activeStep === 0 ? (
          // ... Your first form contents ...
          <>
            {Array(3)
              .fill()
              .map((_, index) => (
                <div key={index} className='mb-4 flex gap-4'>
                  <Input
                    size='lg'
                    label={`Student Name ${index + 1} ${
                      index === 0 ? '*' : ''
                    }`}
                    error={
                      !isFirstFormValid && studentInfo.names[index].length < 3
                    }
                    onChange={(e) => {
                      const newNames = [...studentInfo.names];
                      newNames[index] = e.target.value;
                      setStudentInfo((prev) => ({ ...prev, names: newNames }));
                    }}
                    value={studentInfo.names[index]}
                  />

                  <Input
                    size='lg'
                    label={`Reg. Number ${index + 1} ${index === 0 ? '*' : ''}`}
                    error={
                      !isFirstFormValid &&
                      !/^(\d{2}-[A-Z]{2}-\d{5})$/.test(
                        studentInfo.registrationNumbers[index]
                      )
                    }
                    onFocus={() => setFocusedField(index)} // Set the focusedField here
                    onBlur={() => setFocusedField(null)} // Clear the focusedField here
                    onChange={(e) => handleRegNumberChange(e, index)}
                    value={studentInfo.registrationNumbers[index]}
                    placeholder={focusedField === index ? 'XX-AB-XXXXX' : ''} // Set placeholder conditionally here
                  />
                </div>
              ))}

            <div className='mb-4'>
              <label className='block mb-2 text-sm font-medium text-gray-600'>
                Department *
              </label>
              <select
                className={`border rounded w-full p-2 ${
                  !isFirstFormValid && !studentInfo.department
                    ? 'border-red-500'
                    : ''
                }`}
                name='department'
                value={studentInfo.department}
                onChange={(e) => {
                  setStudentInfo((prev) => ({
                    ...prev,
                    department: e.target.value,
                  }));
                }}
              >
                <option value='' disabled>
                  Select your department
                </option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>

            <Input
              size='lg'
              label='Phone No. *'
              className='mb-4' // Adding some margin bottom for spacing
              error={!isFirstFormValid && !/^\d{11}$/.test(studentInfo.phone)}
              onChange={(e) =>
                setStudentInfo((prev) => ({ ...prev, phone: e.target.value }))
              }
              value={studentInfo.phone}
            />

            <Button className='mt-8 p-4' fullWidth onClick={validateFirstForm}>
              Next
            </Button>
          </>
        ) : (
          <div className='space-y-4'>
            <div className='space-y-4'>
              <Input
                size='lg'
                label='Project Title *'
                error={
                  !isSecondFormValid && studentInfo.projectTitle.length < 3
                }
                onChange={(e) =>
                  setStudentInfo((prev) => ({
                    ...prev,
                    projectTitle: e.target.value,
                  }))
                }
                value={studentInfo.projectTitle}
              />

              <div className='mb-4'>
                <Select
                  className={`border rounded w-full p-2 ${
                    !isSecondFormValid && !studentInfo.principalSupervisor
                      ? 'border-red-500'
                      : ''
                  }`}
                  name='principalSupervisor'
                  label='Select Supervisor'
                  placeholder='Select Supervisor'
                  value={studentInfo.principalSupervisor}
                  onChange={(e) => {
                    const value = e.target ? e.target.value : e;
                    setStudentInfo((prev) => ({
                      ...prev,
                      principalSupervisor: value,
                    }));
                  }}
                >
                  {/* <Option value='' disabled>
                    Select your Principal Supervisor
                  </Option> */}
                  {avbSupervisors.map((supervisor) =>
                    supervisor.department === studentInfo.department ? (
                      <Option key={supervisor.id} value={supervisor.name}>
                        {supervisor.name}
                      </Option>
                    ) : (
                      <Option disabled>No Department Selected</Option>
                    )
                  )}
                </Select>
              </div>

              <Textarea
                size='lg'
                label='Project Requirements *'
                rows='4'
                error={!isSecondFormValid && !studentInfo.projectRequirements}
                onChange={(e) =>
                  setStudentInfo((prev) => ({
                    ...prev,
                    projectRequirements: e.target.value,
                  }))
                }
                value={studentInfo.projectRequirements}
              />

              <Textarea
                size='lg'
                label='Brief of the project *'
                rows='4'
                error={!isSecondFormValid && !studentInfo.projectBrief}
                onChange={(e) =>
                  setStudentInfo((prev) => ({
                    ...prev,
                    projectBrief: e.target.value,
                  }))
                }
                value={studentInfo.projectBrief}
              />

              <Textarea
                size='lg'
                label='Additional Comments'
                rows='4'
                onChange={(e) =>
                  setStudentInfo((prev) => ({
                    ...prev,
                    additionalComments: e.target.value,
                  }))
                }
                value={studentInfo.additionalComments}
              />
            </div>
            <Button className='mt-4 p-4' fullWidth onClick={handlePrev}>
              Back
            </Button>
            <Button className='mt-4 p-4' fullWidth onClick={validateSecondForm}>
              Submit
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FYPRegForm;

// DML FOR adding a password field to supervisor
// ALTER TABLE supervisors ADD COLUMN password VARCHAR(255) NOT NULL;
