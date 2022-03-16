import React from 'react';
import styled from "styled-components";
// import Link from 'next/link';
import { signIn, signOut, useSession } from "next-auth/client";

const Container = styled.div`
  background-color: #ddd;
  padding: 1em;
`;

const Nav = () => {
  const [session, loading] = useSession();
  return (
    <Container>
      {!session && (
        <>
          Not signed in <br/>
          {/* <button onClick={signIn}>Sign in</button> */}
        </>
      )}
      {session && (
        <>
          Signed in as {session.user?.email} <br/>
          {/* <button onClick={signOut}>Sign out</button> */}
        </>
      )}
    </Container>
  );
};

export default Nav;
