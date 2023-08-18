import React, { useContext } from 'react';
import { Card, Typography } from '@material-tailwind/react';
import { InboxContext } from '../context/InboxContext';

const Inbox = () => {
  // Consume messages from InboxContext
  const { messages, setMessages } = useContext(InboxContext);
  console.log(messages);
  console.log('here Messages');

  return (
    <div className='flex flex-col items-center justify-center space-y-6 h-screen'>
      {messages.map((notification, index) => (
        <Card
          key={index}
          className={`w-[40rem] max-w-[50rem] max-h-[20] p-6 transition-transform transform hover:scale-105 ${
            notification.messageType === 'meeting' ? 'bg-blue-100' : 'bg-white'
          }`}
        >
          <Typography color='blue-gray' className='mb-4 font-bold' variant='h5'>
            Meeting Topic:{`  `}
            {notification.messageTitle}
          </Typography>
          <Typography color='blue-gray' className='font-normal'>
            Meeting Description: <br />
            {notification.message}
          </Typography>
          {notification.action && (
            <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'>
              {notification.action}
            </button>
          )}
        </Card>
      ))}
    </div>
  );
};

export default Inbox;
