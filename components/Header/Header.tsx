import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  padding: 1em;
`;

const Header = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default Header;
