import React, { useContext, useState } from 'react';
import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  Typography,
  Option,
} from '@material-tailwind/react';
import { addMeeting } from '../../services/api';
import { StudentContext } from '../context/StudentContext';
import { InboxContext } from '../context/InboxContext';

const ArrangeMeetingForm = () => {
  const { project } = useContext(StudentContext);
  const { setMessages } = useContext(InboxContext);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add project id to the form data
    formData.projectID = project.ProjectID;
    console.log(formData);

    // Transform the meeting data to a message-like format
    const meetingAsMessage = {
      messageID: new Date().getTime(), // Generate a temporary unique ID
      messageTitle: formData.topic,
      message: formData.description,
      userID: project.ProjectID, // Set the ProjectID as the userID in this case
      messageType: 'meeting', // Add a property to differentiate the message type
    };

    // Update messages in the InboxContext
    setMessages((prev) => [...prev, meetingAsMessage]);

    // Simulate a call to the API to save the meeting
    console.log(formData);
    await addMeeting(formData);
  };

  return (
    <Card className='mx-20 my-[9.5rem] w-full border border-gray-200'>
      <CardBody>
        <Typography variant='h4' className='text-center mb-6'>
          Arrange a Meeting
        </Typography>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <Input
              type='date'
              label='Date'
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
              label='Time'
              value={formData.time}
              onChange={handleInputChange}
              size='regular'
            />
          </div>

          <div className='mb-4'>
            <Select
              name='supervisor'
              label='Choose Supervisor'
              placeholder='Choose Supervisor'
              outline={true}
              onChange={handleInputChange}
              value={formData.supervisor}
            >
              <Option value='Principle Supervisor'>Principle Supervisor</Option>
              <Option value='Co-Supervisor'>Co-Supervisor</Option>
            </Select>
          </div>

          <div className='mb-4'>
            <Input
              type='text'
              color='blue-gray'
              label='Meeting Topic'
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
              label='Meeting Description'
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              size='regular'
            />
          </div>

          <div className='flex justify-center mt-10 px-5'>
            <Button color='black' type='submit' ripple='true' size='lg'>
              Schedule Meeting
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default ArrangeMeetingForm;
