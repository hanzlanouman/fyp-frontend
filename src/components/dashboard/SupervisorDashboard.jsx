import React, { useContext, useState } from 'react';
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
  PowerIcon,
  CogIcon, // for updating the profile
  // ClipboardListIcon, // for projects selection
  // ChatAltIcon, // for interaction
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react-v1/outline';
import SupervisorProfile from '../forms/SupervisorProfile';
import Inbox from '../other/Inbox';
import { ProjectTimeline } from '../other/ProjectTimelineSupervisor';
import ArrangeMeetingForm from '../forms/ArrangeMeetingForm';
import ArrangeMeetingFormSupervisor from '../forms/ArrangeMeetingFormSupervisor';
import { SupervisorContext } from '../context/SupervisorContext';
import Approvals from '../other/Approvals';

const ClipboardListIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className='w-5 h-5'
  >
    <path
      fillRule='evenodd'
      d='M10.5 3A1.501 1.501 0 009 4.5h6A1.5 1.5 0 0013.5 3h-3zm-2.693.178A3 3 0 0110.5 1.5h3a3 3 0 012.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 01-3 3H6.75a3 3 0 01-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15z'
      clipRule='evenodd'
    />
  </svg>
);

const PlaceholderComponent = ({ title }) => (
  <div className='ml-[20rem] p-4'>
    <h1>{title}</h1>
  </div>
);

const SupervisorDashboard = () => {
  const [openProject, setOpenProject] = useState(null);

  const { projects } = useContext(SupervisorContext);

  console.log(projects);
  // const [projects] = useState([
  //   { id: 1, name: 'Project 1' },
  //   { id: 2, name: 'Project 2' },
  //   { id: 3, name: 'Project 3' },
  //   { id: 4, name: 'Project 4' },
  // ]);

  const handleProjectOpen = (projectId) => {
    setOpenProject(openProject === projectId ? null : projectId);
  };

  const [open, setOpen] = React.useState(0);
  const [activeComponent, setActiveComponent] = useState(null);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const navigate = useNavigate();

  const logout = () => {
    // Clear Local Storage etc.
    navigate('/supervisorlogin');
  };

  return (
    <div className='flex'>
      <Card className='h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 ml-2'>
        <div className='mb-2 p-4'>
          <Typography variant='h5' color='blue-gray' className='mt-5'>
            Supervisor Dashboard
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
                  <ClipboardListIcon className='h-5 w-5' />
                </ListItemPrefix>
                <Typography color='blue-gray' className='mr-auto font-normal'>
                  Projects
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className='py-1'>
              <List className='p-0'>
                {/* Here, options for all the projects the supervisor is supervising can be added */}
                {projects.map((project) => (
                  <Accordion
                    open={openProject === project.ProjectID}
                    key={project.ProjectID}
                  >
                    <ListItem className='p-0'>
                      <AccordionHeader
                        onClick={() => handleProjectOpen(project.ProjectID)}
                        className='border-b-0 p-3'
                      >
                        <ListItemPrefix>
                          <ChevronRightIcon
                            strokeWidth={3}
                            className='h-3 w-5'
                          />
                        </ListItemPrefix>
                        <Typography
                          color='blue-gray'
                          className='mr-auto font-normal'
                          variant='h6'
                        >
                          {project.ProjectName}
                        </Typography>
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`mx-auto h-4 w-4 transition-transform ${
                            openProject === project.id ? 'rotate-180' : ''
                          }`}
                        />
                      </AccordionHeader>
                    </ListItem>
                    <AccordionBody className='py-1'>
                      <List className='p-0 pl-5'>
                        <ListItem
                          onClick={() =>
                            setActiveComponent(
                              <ArrangeMeetingFormSupervisor
                                projectID={project.ProjectID}
                              />
                            )
                          }
                        >
                          <Typography
                            variant='line'
                            color='blue-gray'
                            className='mr-auto font-normal'
                          >
                            Arrange a Meeting
                          </Typography>
                        </ListItem>
                        <ListItem
                          onClick={() => {
                            setActiveComponent(
                              <ProjectTimeline timeline={project.timeline} />
                            );
                          }}
                        >
                          <Typography
                            variant='line'
                            color='blue-gray'
                            className='mr-auto font-normal'
                          >
                            View Timeline
                          </Typography>
                        </ListItem>
                      </List>
                    </AccordionBody>
                  </Accordion>
                ))}
              </List>
            </AccordionBody>
          </Accordion>
          <hr className='my-2 border-blue-gray-50' />
          <ListItem onClick={() => setActiveComponent(<SupervisorProfile />)}>
            <ListItemPrefix>
              <CogIcon className='h-5 w-5' />
            </ListItemPrefix>
            Update Profile
          </ListItem>
          <ListItem onClick={() => setActiveComponent(<Inbox />)}>
            <ListItemPrefix>
              <InboxIcon className='h-5 w-5' />
            </ListItemPrefix>
            Inbox
          </ListItem>
          <ListItem onClick={() => setActiveComponent(<Approvals />)}>
            <ListItemPrefix>
              <InboxIcon className='h-5 w-5' />
            </ListItemPrefix>
            Pending Approvals
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

export default SupervisorDashboard;
