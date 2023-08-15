import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  Typography,
  Option,
} from '@material-tailwind/react';

const ArrangeMeetingFormSupervisor = () => {
  const [formData, setFormData] = useState({
    // set date to todays date in yyyy-mm-dd format
    date: new Date().toISOString().slice(0, 10),
    // Set time to current time as hh:mm
    time: new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
    }),

    supervisor: '',
    topic: '',
    description: '',
  });

  const handleInputChange = (e) => {
    let value;
    let name;

    if (typeof e === 'object' && e.target) {
      // For native input elements
      name = e.target.name;
      value = e.target.value;
    } else {
      // If e is the value itself
      value = e;
      name = 'supervisor'; // hardcoded for the Select component
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Submit logic here
  };

  return (
    <Card className='mx-20 my-[9.5rem] w-full'>
      <CardBody>
        <Typography variant='h4' className='text-center mb-6'>
          Arrange a Meeting
        </Typography>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <Input
              type='date'
              color='blue-gray'
              name='date'
              value={formData.date}
              onChange={handleInputChange}
              size='regular'
            />
          </div>

          <div className='mb-4'>
            <Input
              type='time'
              color='blue-gray'
              name='time'
              value={formData.time}
              onChange={handleInputChange}
              size='regular'
            />
          </div>

          <div className='mb-4'>
            <Input
              type='text'
              color='blue-gray'
              placeholder='Meeting Topic'
              name='topic'
              value={formData.topic}
              onChange={handleInputChange}
              size='regular'
            />
          </div>

          <div className='mb-4'>
            <Input
              type='text'
              color='blue-gray'
              placeholder='Meeting Description'
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              size='regular'
            />
          </div>

          <div className='flex justify-center'>
            <Button color='' type='submit' ripple='light'>
              Schedule Meeting
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default ArrangeMeetingFormSupervisor;
