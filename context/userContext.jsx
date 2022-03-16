import React, { useState, createContext } from 'react';

const UserContext = createContext({user: {
  name: '',
  email: '',
  decks: [],
  // updateUser: () => {},
}});

export function UserContextProvider(props) {
  const [user, setUser] = useState();
  const context = {
    user,
  }

  // updateUser = (user) => {
  //   setUser(user);
  // }

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
