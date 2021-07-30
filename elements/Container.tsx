import styled from "styled-components";
import { device } from '../constants/breakpoints';

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  @media ${device.tabletS} {
    padding: 1em;
  }
`;

export default Container;
