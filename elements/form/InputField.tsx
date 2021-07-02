import styled from "styled-components";

type InputField = {
  withButton?: boolean;
}

const InputField = styled.input<InputField>`
  background: #f0f0f0;
  border: none;
  border-radius: ${({ withButton }) => withButton ? '5px 0 0 5px' : '5px'};
  box-shadow: inset 0 1px 3px 0 rgb(0 0 0 / 8%);
  color: #666;
  font-size: 16px;
  font-family: inherit;
  margin: 0;
  line-height: 50px;
  outline: none;
  padding: 0 20px;
  transition: all .4s ease;
  width: 100%;
  
  &:hover,
  &:active,
  &:focus,
  &:target {
    background: #fafafa;
  }
`;

export default InputField;
