import React, { useContext, useState } from 'react';
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
  Textarea,
} from '@material-tailwind/react';
import { StudentContext } from '../context/StudentContext';
import { addMilestone } from '../../services/api';

const AddMilestoneForm = () => {
  const { studentData, project, setProject } = useContext(StudentContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDateTime = new Date();
    const formattedDate = currentDateTime.toISOString().slice(0, 10);
    const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
    });

    const finalData = {
      ...formData,
      projectID: project.ProjectID,
      date: formattedDate,
      time: formattedTime,
      addedBy: studentData.regNo,
    };
    // setProject((prevProject) => ({
    //   ...prevProject,
    //   timeline: [...prevProject.timeline, finalData],
    // }));

    if (formData.title === '' || formData.description === '') {
      alert('Please fill all the fields');
    } else {
      addMilestone(finalData).then((res) => {
        res.status === 200 && setProject(res.data);
      });
    }
    // Reset the form
    setFormData({
      title: '',
      description: '',
    });
  };

  return (
    <Card className='mx-[6rem] my-[10rem] w-full'>
      <CardBody>
        <Typography variant='h4' className='text-center mb-6' color='blue-gray'>
          Add a Milestone
        </Typography>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <Input
              type='text'
              color='blue-gray'
              label='Milestone Title'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
              size='regular'
            />
          </div>

          <div className='mb-4'>
            <Textarea
              type='text'
              color='blue-gray'
              label='Milestone Description'
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              size='regular'
            />
          </div>

          <div className='flex justify-center'>
            <Button color='' type='submit' ripple='light'>
              Add Milestone
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default AddMilestoneForm;
