import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
} from '@material-tailwind/react';

import { useContext, useState } from 'react';
import { StudentContext } from '../context/StudentContext';
import ProjectDetails from './ProjectDetails';

export function ProjectTimeline() {
  const { project } = useContext(StudentContext);
  console.log(project, 'Kitty');

  const [projects] = useState(project.timeline);
  return (
    <div className='w-[32rem] py-[5rem] mx-[5rem]'>
      <ProjectDetails />
      {projects.map((project) => {
        return (
          <Timeline>
            <TimelineItem>
              <TimelineConnector />
              <TimelineHeader className='h-3'>
                <TimelineIcon />
                <Typography
                  variant='h6'
                  color='blue-gray'
                  className='leading-none'
                >
                  {project.TimelineTitle}
                </Typography>
              </TimelineHeader>
              <TimelineBody className='h-3 pb-5'>
                <Typography variant='small' color='gray'>
                  Added by {project.studentName}
                </Typography>
              </TimelineBody>
              <TimelineBody className='pb-8'>
                <Typography
                  variant='small'
                  color='gray'
                  className='font-normal text-gray-600'
                >
                  {project.timelineDescription}
                </Typography>
              </TimelineBody>
            </TimelineItem>
          </Timeline>
        );
      })}
    </div>
  );
}
