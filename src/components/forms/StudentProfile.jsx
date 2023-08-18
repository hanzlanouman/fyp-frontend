import React, { useState } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { StudentContext } from '../context/StudentContext';
import { useContext } from 'react';
import { updateStudent } from '../../services/api';
const StudentProfile = () => {
  const { studentData } = useContext(StudentContext);

  const [studentProfile, setStudentProfile] = useState(studentData);

  const [errors, setErrors] = useState({ email: '', contact: '' });

  const handleUpdate = () => {
    let valid = true;
    let tempErrors = { email: '', contact: '' };

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(studentProfile.email)) {
      valid = false;
      tempErrors.email = 'Invalid email address.';
    }

    // Validate contact (should be 11 digits without +)
    if (studentProfile.Phone.length !== 11 || isNaN(studentProfile.contact)) {
      valid = false;
      tempErrors.contact = 'Contact should be 11 digits.';
    }

    setErrors(tempErrors);

    if (valid) {
      const stdInfo = {
        regNo: studentProfile.regNo,
        email: studentProfile.email,
        phone: studentProfile.Phone,
      };
      console.log(stdInfo);
      updateStudent(stdInfo);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <Card className='p-6 w-[40rem] max-w-[50rem] shadow-blue-gray-50 border border-gray-200'>
        <Typography color='blue-gray' className='mb-6 font-normal text-center'>
          Student Profile
        </Typography>

        {/* Display Fields from studentProfile state */}
        <div className='mb-4 flex justify-between'>
          <strong>Name:</strong> {studentProfile.name}
        </div>
        <div className='mb-4 flex justify-between'>
          <strong>Registration Number:</strong> {studentProfile.regNo}
        </div>
        <div className='mb-4 flex justify-between'>
          <strong>Date of Birth:</strong> {studentProfile.DOB}
        </div>
        <div className='mb-4 flex justify-between'>
          <strong>CNIC:</strong> {studentProfile.CNIC}
        </div>
        <div className='mb-4 flex justify-between'>
          <strong>Department:</strong> {studentProfile.Department}
        </div>
        <div className='mb-4 flex justify-between'>
          <strong>Semester:</strong> {studentProfile.Semester}
        </div>
        <div className='mb-6 flex justify-between'>
          <strong>Section:</strong> {studentProfile.Section}
        </div>

        {/* Editable fields */}
        <div className='mb-4'>
          <Input
            type='email'
            label='Email'
            color='blue-gray'
            size='lg'
            outline={true}
            value={studentProfile.email}
            onChange={(e) =>
              setStudentProfile((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          />
          {errors.email && (
            <span className='text-red-500 text-sm mt-1'>{errors.email}</span>
          )}
        </div>

        <div className='mb-4'>
          <Input
            type='text'
            color='blue-gray'
            label='Phone'
            size='lg'
            outline={true}
            value={studentProfile.Phone}
            onChange={(e) =>
              setStudentProfile((prevState) => ({
                ...prevState,
                contact: e.target.value,
              }))
            }
          />
          {errors.contact && (
            <span className='text-red-500 text-sm mt-1'>{errors.contact}</span>
          )}
        </div>

        <Button
          color='blue-gray'
          buttonType='filled'
          size='lg'
          block={false}
          iconOnly={false}
          ripple='dark'
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Card>
    </div>
  );
};

export default StudentProfile;
