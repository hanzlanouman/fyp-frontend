import React, { useState } from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react';
import {
  InboxIcon,
  UserCircleIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';
import FYPRegForm from '../../forms/FYPRegForm';
import StudentProfile from '../../forms/StudentProfile';
import Inbox from '../../other/Inbox';
import { useNavigate } from 'react-router-dom';
// import {
//   InboxIcon,
//   UserCircleIcon,
//   PowerIcon,
// } from '@heroicons/react/24/solid';

const PlaceholderComponent = ({ title }) => (
  <div className='ml-[20rem] p-4'>
    <h1>{title}</h1>
  </div>
);

const UnRegStudentDashboard = () => {
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
          <ListItem onClick={() => setActiveComponent(<FYPRegForm />)}>
            <ListItemPrefix>
              <Typography color='blue-gray' className='mr-auto font-'>
                Apply For FYP
              </Typography>
            </ListItemPrefix>
          </ListItem>
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

export default UnRegStudentDashboard;
