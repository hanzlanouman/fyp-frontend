import React, { useState } from 'react';
import Inbox from '../../other/Inbox';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react-v1/outline';
import { PresentationChartBarIcon } from '@heroicons/react-v1/outline';

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import {
  InboxIcon,
  UserCircleIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';

import StudentProfile from '../../forms/StudentProfile';
import { Routes, useNavigate, Route } from 'react-router-dom';
import { ProjectTimeline } from '../../other/ProjectTimeline';
import ArrangeMeetingForm from '../../forms/ArrangeMeetingForm';
import AddMilestoneForm from '../../forms/AddMilestoneForm';
const PlaceholderComponent = ({ title }) => (
  <div className='ml-[20rem] p-4'>
    <h1>{title}</h1>
  </div>
);

const RegStudentDashboard = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState(null);
  const logout = () => {
    // Clear Local Storage etc.
    navigate('/login');
  };

  return (
    <div className='flex'>
      <Card className='h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 ml-2'>
        <div className='mb-2 p-4'>
          <Typography variant='h5' color='blue-gray' className='mt-5'>
            Student FYP Dashboard
          </Typography>
        </div>
        <List>
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? 'rotate-180' : ''
                }`}
              />
            }
          >
            <ListItem className='p-0' selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className='border-b-0 p-3'
              >
                <ListItemPrefix>
                  <PresentationChartBarIcon className='h-5 w-5' />
                </ListItemPrefix>
                <Typography color='blue-gray' className='mr-auto font-normal'>
                  Dashboard
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className='py-1'>
              <List className='p-0'>
                <ListItem
                  onClick={() => setActiveComponent(<ProjectTimeline />)}
                >
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className='h-3 w-5' />
                  </ListItemPrefix>
                  Project Timeline
                </ListItem>
                <ListItem
                  onClick={() => setActiveComponent(<ArrangeMeetingForm />)}
                >
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className='h-3 w-5' />
                  </ListItemPrefix>
                  Arrange Meeting
                </ListItem>
                <ListItem
                  onClick={() => setActiveComponent(<AddMilestoneForm />)}
                >
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className='h-3 w-5' />
                  </ListItemPrefix>
                  Add a Milestone
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <hr className='my-2 border-blue-gray-50' />
          <ListItem onClick={() => setActiveComponent(<StudentProfile />)}>
            <ListItemPrefix>
              <UserCircleIcon className='h-5 w-5' />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem onClick={() => setActiveComponent(<Inbox />)}>
            <ListItemPrefix>
              <InboxIcon className='h-5 w-5' />
            </ListItemPrefix>
            Inbox
          </ListItem>
          <ListItem onClick={logout}>
            <ListItemPrefix>
              <PowerIcon className='h-5 w-5' />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
      {activeComponent && <PlaceholderComponent title={activeComponent} />}
    </div>
  );
};

export default RegStudentDashboard;
