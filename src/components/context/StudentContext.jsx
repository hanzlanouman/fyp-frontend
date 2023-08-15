import { createContext, useState } from 'react';

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [studentData, setStudentData] = useState();
  const [project, setProject] = useState();

  return (
    <StudentContext.Provider
      value={{
        studentData,
        setStudentData,
        project,
        setProject,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
