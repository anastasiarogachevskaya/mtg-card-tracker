import styled from "styled-components";

const Spacer = styled.div<{ size: string}>`
  margin: ${({ size }) => size + 'px' || "1em"};
`;

export default Spacer;
