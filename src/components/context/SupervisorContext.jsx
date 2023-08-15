import { createContext, useState } from 'react';

export const SupervisorContext = createContext();

export const SupervisorProvider = ({ children }) => {
  const [supervisorData, setSupervisorData] = useState();
  const [projects, setProjects] = useState([]);

  return (
    <SupervisorContext.Provider
      value={{ supervisorData, setSupervisorData, projects, setProjects }}
    >
      {children}
    </SupervisorContext.Provider>
  );
};
