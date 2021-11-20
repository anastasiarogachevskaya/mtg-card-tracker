import styled from "styled-components";

type InputField = {
  withButton?: boolean;
  width?: string;
}

const InputField = styled.input<InputField>`
  background: ${({ theme }) => theme.inputFieldBGColor};
  border: none;
  border-radius: ${({ withButton }) => withButton ? '5px 0 0 5px' : '5px'};
  box-shadow: inset 0 1px 3px 0 rgb(0 0 0 / 8%);
  color: ${({ theme }) => theme.inputFieldColor};
  font-size: 16px;
  font-family: inherit;
  margin: 0;
  line-height: 50px;
  outline: none;
  padding: 0 20px;
  transition: all .4s ease;
  width: ${({ width }) => width || '100%'}; 
  
  &:hover,
  &:active,
  &:focus,
  &:target {
    background:  ${({ theme }) => theme.inputFieldBGColorHover};
  }
`;

export default InputField;
