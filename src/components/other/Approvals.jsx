import React, { useContext } from 'react';
import { ApprovalContext } from '../context/ApprovalContext';
import { Card, Typography, Button } from '@material-tailwind/react';
import { approveFYP, rejectFYP } from '../../services/api';
const Approvals = () => {
  const { approvals } = useContext(ApprovalContext);
  console.log(approvals, 'Approvals');

  const handleReject = (project) => {
    console.log('Rejected');
    rejectFYP(project);
  };

  const handleApprove = (project) => {
    approveFYP(project);
  };
  return (
    <div className='flex flex-col items-center justify-center space-y-6 h-screen'>
      {approvals.pendingProjects.map((approval, index) => (
        <Card
          className={`w-[40rem] max-w-[50rem] max-h-[20] p-6 transition-transform transform hover:scale-105 bg-white
    `}
        >
          <Typography color='blue-gray' className='mb-4 font-bold'>
            Project Name:{`  `}
            {approval.ProjectName}
          </Typography>
          <hr className='max-w-[20rem] ' />
          <Typography color='blue-gray' className='font-normal'>
            Project Requirements: {approval.ProjectReqs}
          </Typography>
          <Typography color='blue-gray' className='font-normal'>
            <b> Brief:</b> <br />
            {`   ${approval.Brief}`}
          </Typography>
          <Typography color='blue-gray' className='font-normal'>
            <b>Additional Comments:</b> <br />
            {approval.Add_Comments}
          </Typography>

          <Button
            className='mt-4 px-4 py-3 max-w-[12rem] ml-0 bg-green-900 text-white rounded-lg '
            onClick={(e) => handleApprove(approval)}
          >
            Approve
          </Button>
          <Button
            className='mt-4 px-4 py-3 max-w-[12rem] ml-0 bg-red-500 text-white rounded-lg'
            onClick={(e) => handleReject(approval)}
          >
            Reject
          </Button>

          <Typography
            color='blue-gray'
            className='mt-4 text-xs uppercase font-semibold'
          >
            <br />
            {approval.messageType}
          </Typography>
        </Card>
      ))}
    </div>
  );
};

export default Approvals;
