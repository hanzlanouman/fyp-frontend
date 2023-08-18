import { createContext, useState } from 'react';

export const ApprovalContext = createContext();

export const ApprovalProvider = ({ children }) => {
  const [approvals, setApprovals] = useState([]);
  return (
    <ApprovalContext.Provider value={{ approvals, setApprovals }}>
      {children}
    </ApprovalContext.Provider>
  );
};
