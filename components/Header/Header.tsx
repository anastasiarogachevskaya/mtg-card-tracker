import React from 'react';
import styled from "styled-components";
import { useRouter } from 'next/router';
import SearchForm from '../SearchForm';

const Container = styled.div`
  padding: 1em;
`;

const Header = () => {
  const router = useRouter();

  return (
    <Container>
      <SearchForm  onSearch={(string: string) => router.push(`/search?q=${string}`)} />
    </Container>
  );
};

export default Header;
