import styled from "styled-components";

type Button = {
  withInput?: boolean;
}

const Button = styled.button<Button>`
  background: #000;
  color: #FFF;
  border: 0;
  border-radius: ${({ withInput }) => withInput ? '0 5px 5px 0' : '5px'};
  padding: 10px 20px;
`;

export default Button;
