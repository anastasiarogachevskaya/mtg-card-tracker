import React from 'react';
import styled from 'styled-components';

import { FaPlus } from 'react-icons/fa';

const HiddenText = styled.span`
  position: absolute;
  width: 100px;
  left: -80px;
  color: transparent;
  transition: color .6s cubic-bezier(0.65, 0, 0, 1);
  font-weight: 700;
`;

const RoundButtonWrapper = styled.button`
  cursor: pointer;
  transition: all .3s ease;
  background: ${({ theme }) => theme.primary.main};
  padding: 18px 20px;
  color:  ${({ theme }) => theme.primary.invertedTextColor};
  border-radius: 50%;
  border: 0;
  position: fixed;
  right: 50px;
  bottom: 50px;
  line-height: 1;
  transition: all .3s ease;

  &:hover {
    padding-left: 100px;
    color:  ${({ theme }) => theme.primary.invertedTextColor};
    border-radius: 110px;
    ${HiddenText} {
      left: 5px;
      color: ${({ theme }) => theme.primary.invertedTextColor};
    }
  }
`;

const RoundButton = ({ onClick }: { onClick: () => void}) => {
  return (
    <RoundButtonWrapper onClick={onClick}>
      <HiddenText>Add to deck</HiddenText><FaPlus />
    </RoundButtonWrapper>
  )
}

export default RoundButton;
