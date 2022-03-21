import React, { createContext, useState } from 'react';

const UserContext = createContext({
  name: '',
  email: '',
  decks: [],
});

export function UserContextProvider(props) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    decks: [],
  });
  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
