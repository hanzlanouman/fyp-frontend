import React, { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from '@material-tailwind/react';
import { SupervisorContext } from '../context/SupervisorContext';
import { useContext } from 'react';
import { updateSupervisor } from '../../services/api';

const SupervisorProfile = () => {
  const { supervisorData } = useContext(SupervisorContext);
  console.log(supervisorData.supervisorData.name, 'Kitty');
  // Use the supervisorData for the initial state
  const [formData, setFormData] = useState({
    name: supervisorData.supervisorData.name,
    employeeId: supervisorData.supervisorData.empID,
    email: supervisorData.supervisorData.email,
    contact: supervisorData.supervisorData.phone,
    availability:
      supervisorData.supervisorData.avbStatus === 1 ? 'Available' : 'Busy',
  });

  const [errors, setErrors] = useState({ email: '', contact: '' });

  const handleInputChange = (e) => {
    let value;
    let name;

    if (e && e.target) {
      // For native input elements
      name = e.target.name;
      value = e.target.value;
    } else {
      // If e is the value itself (likely from the Select component)
      value = e;
      name = 'availability'; // hardcoded for the Select component
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    let valid = true;
    let tempErrors = { email: '', contact: '' };

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      valid = false;
      tempErrors.email = 'Invalid email address.';
    }

    // Validate contact (should be 11 digits without +)
    if (formData.contact.length !== 11 || isNaN(formData.contact)) {
      valid = false;
      tempErrors.contact = 'Contact should be 11 digits.';
    }

    setErrors(tempErrors);

    if (valid) {
      // Handle your form submission logic here, e.g., API call
      updateSupervisor(formData);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <Card className='p-6 w-[40rem] max-w-[50rem] shadow-blue-gray-50'>
        <Typography color='blue-gray' className='mb-6 font-normal text-center'>
          Supervisor Profile
        </Typography>

        {/* Display Fields */}
        <div className='mb-4 flex justify-between'>
          <strong>Name:</strong> {supervisorData.supervisorData.name}
        </div>
        <div className='mb-4 flex justify-between'>
          <strong>Employee ID:</strong> {supervisorData.supervisorData.empID}
        </div>
        <div className='mb-4 flex justify-between'>
          <strong>Designation:</strong>{' '}
          {supervisorData.supervisorData.designation}
        </div>
        <div className='mb-4 flex justify-between'>
          <strong>Department:</strong>{' '}
          {supervisorData.supervisorData.department}
        </div>

        {/* Editable fields */}
        <div className='mb-4'>
          <Input
            type='email'
            label='Email'
            color='blue-gray'
            size='lg'
            outline={true}
            name='email'
            value={formData.email}
            onChange={handleInputChange}
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
            name='contact'
            value={formData.contact}
            onChange={handleInputChange}
          />
          {errors.contact && (
            <span className='text-red-500 text-sm mt-1'>{errors.contact}</span>
          )}
        </div>

        <div className='mb-4'>
          <Select
            name='availability'
            placeholder='Availability'
            outline={true}
            onChange={handleInputChange}
            value={formData.availability}
          >
            <Option value='Available'>Available</Option>
            <Option value='Busy'>Busy</Option>
          </Select>
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

export default SupervisorProfile;
