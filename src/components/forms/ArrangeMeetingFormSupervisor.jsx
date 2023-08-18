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
import { SupervisorContext } from '../context/SupervisorContext';
import { InboxContext } from '../context/InboxContext';
import { addMeeting } from '../../services/api';

const ArrangeMeetingFormSupervisor = ({ projectID }) => {
  // console.log(projectID, 'Zoom');
  const { supervisorData } = useContext(SupervisorContext);
  const { setMessages } = useContext(InboxContext);
  // console.log(supervisorData.supervisorData.empID);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Transform the meeting data to a message-like format
    const meetingAsMessage = {
      messageID: new Date().getTime(), // Generate a temporary unique ID
      messageTitle: formData.topic,
      message: formData.description,
      userID: supervisorData.supervisorData.empID, // Set the supervisor ID in this case
      messageType: 'meeting', // Add a property to differentiate the message type
      projectID: projectID,
    };

    // Log the transformed meeting data to the console
    formData.projectID = projectID;
    addMeeting(formData).then((res) => {
      setMessages((prev) => [...prev, meetingAsMessage]);
    });
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
              color='blue-gray'
              name='date'
              label='Date'
              value={formData.date}
              onChange={handleInputChange}
              size='regular'
            />
          </div>

          <div className='mb-4'>
            <Input
              type='time'
              color='blue-gray'
              label='Time'
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

          <div className='flex justify-center px-5'>
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
