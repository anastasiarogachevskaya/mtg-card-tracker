import React, { useContext } from 'react';
import styled from "styled-components";
import { useRouter } from 'next/router';

import SearchForm from '../SearchForm';
import StyledLink from '../../elements/StyledLink';

import { BiUserCircle, BiSun,  BiMoon} from "react-icons/bi";

const Container = styled.div`
  padding: 1em;
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
`;

const FlexLink= styled(StyledLink)`
  font-size: 2rem;
  padding: 0 5px 0 25px;
  transition: all .3s ease-in;
  color: ${({ theme }) => theme.primary.textColor};
  &:hover,
  &:focus,
  &:active {
    color: #464646;
  }
`;

const Header = (
  { theme, toggleTheme }: { theme: string | (() => void), toggleTheme: any }) => {
  const router = useRouter();

  return (
    <Container>
      <SearchForm onSearch={(string: string) => router.push(`/search?q=${string}`)} />
      <FlexLink href="/signin"><BiUserCircle /></FlexLink>
      <FlexLink onClick={toggleTheme}>
        {theme === 'light' ? <BiSun /> : <BiMoon />}
      </FlexLink>
    </Container>
  );
};

export default Header;
