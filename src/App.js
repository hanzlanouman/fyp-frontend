import './App.css';
import SupervisorDashboard from './components/dashboard/SupervisorDashboard';
import RegStudentDashboard from './components/dashboard/studentDash/RegStudentDashboard';
import UnRegStudentDashboard from './components/dashboard/studentDash/UnRegStudentDashboard';

import Login from './components/forms/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import SupervisorLogin from './components/forms/SupervisorLogin';
import Inbox from './components/other/Inbox';

// Simulate session storage
const isSessionStored = () => {
  // Implement your own logic to check if session is stored
  return Boolean(localStorage.getItem('userSession'));
};

function App() {
  return (
    <div>
      <Routes>
        <Route path='/'>
          {isSessionStored() ? (
            <Route index element={<Navigate to='/dashboard' />} />
          ) : (
            <Route index element={<Navigate to='/login' />} />
          )}
          <Route path='login' element={<Login />} />
        </Route>
        <Route path='/supervisor' element={<SupervisorDashboard />} />
        <Route path='/student' element={<RegStudentDashboard />} />
        <Route path='/supervisorlogin' element={<SupervisorLogin />} />
        <Route path='/unregstudent' element={<UnRegStudentDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
