import axios from 'axios';

const URL = 'http://localhost:5000';
export const login = async (loginData) => {
  console.log('Api Reached ', loginData);
  const response = await axios.post(`${URL}/login/student`, loginData);
  return response;
};

export const registerFYP = async (FYPData) => {
  console.log('Api Reached ', FYPData);
  const response = await axios.post(`${URL}/unregstudent`, FYPData);
  return response.data;
};

export const supervisorLogin = async (loginData) => {
  console.log('Api Reached ', loginData);
  const response = await axios.post(`${URL}/login/supervisor`, loginData);
  return response;
};

export const updateSupervisor = async (formData) => {
  console.log('Api Reached ', formData);
  const response = await axios.put(`${URL}/supervisor/update`, formData);
  return response;
};

export const updateStudent = async (formData) => {
  console.log('API Reached', formData);

  const response = await axios.put(`${URL}/student/updateStudent`, formData);
  return response;
};

export const addMilestone = async (formData) => {
  console.log('API Reached', formData);
  const response = await axios.post(`${URL}/regStudent/addMilestone`, formData);
  return response;
};

export const loadInbox = async (userID) => {
  console.log('API Reached', userID);
  const response = await axios.post(`${URL}/loadInbox`, { userID: userID });
  return response;
};

export const addMeeting = async (formData) => {
  console.log('API REached', formData);
  const response = await axios.post(`${URL}/addMeeting`, formData);
  return response;
};

export const loadSupervisorInbox = async (formData) => {
  console.log('SUPERVISOR INBOX API', formData);
  const response = await axios.post(`${URL}/loadSupervisorInbox`, {
    userID: formData,
  });
  return response;
};

export const loadApprovals = async (userID) => {
  console.log('API Reached', userID);
  const response = await axios.post(`${URL}/loadApprovals`, { userID: userID });
  return response;
};

export const approveFYP = async (project) => {
  console.log(project, 'Approve API');
  const response = await axios.post(`${URL}/FYP/approve`, project);
};

export const rejectFYP = async (project) => {
  console.log(project, 'Reject API');
  const response = await axios.post(`${URL}/FYP/reject`, project);
};

export const getAvbSupervisors = async () => {
  console.log('Get Supervisors API');
  const response = await axios.get(`${URL}/FYP/getAvbSupervisors`);
  return response;
};
