import React from 'react';
import styled from "styled-components";
import { useRouter } from 'next/router';
import SearchForm from '../SearchForm';
import Nav from './Nav';
import Button from '../../elements/form/Button';

const Container = styled.div`
  padding: 1em;
`;

const Header = () => {
  const router = useRouter();

  return (
    <Container>
      {/* <Nav /> */}
      <SearchForm  onSearch={(string: string) => router.push(`/search?q=${string}`)} />
      <Button href="/signin">Log in</Button>
    </Container>
  );
};

export default Header;
