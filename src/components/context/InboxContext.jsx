import { createContext, useState } from 'react';

export const InboxContext = createContext();

export const InboxProvider = ({ children }) => {
  const [messages, setMessages] = useState();
  return (
    <InboxContext.Provider value={{ messages, setMessages }}>
      {children}
    </InboxContext.Provider>
  );
};
