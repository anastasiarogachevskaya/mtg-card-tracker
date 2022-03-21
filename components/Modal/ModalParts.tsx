import styled from 'styled-components';

const StyledDarkBg = styled.div`
  background-color: ${({ theme }) => theme.modalBGColor};
  width: 100vw;
  height: 100vh;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 1;
`;

const StyledCentered = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const StyledModal = styled.div`
  width: 300px;
  height: 250px;
  background: ${({ theme }) => theme.primary.underBgColor};
  border-radius: 16px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
  z-index: 2;
`;

const StyledModalHeader = styled.div`
  height: 50px;
  background: ${({ theme }) => theme.primary.underBgColor};
  overflow: hidden;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const StyledHeading = styled.h5`
  margin: 0;
  padding: 10px;
  color: ${({ theme }) => theme.primary.textColor};
  font-weight: 700;
  font-size: 18px;
  text-align: center;
`;

const StyledContent = styled.div`
  padding: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.primary.textColor};
  text-align: center;
`;

const StyledActions = styled.div`
  position: absolute;
  bottom: 2px;
  margin-bottom: 10px;
  width: 100%;
`;

const StyledActionsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledCloseButton = styled.button`
  cursor: pointer;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  color: ${({ theme }) => theme.primary.textColor};
  background: ${({ theme }) => theme.primary.underBgColor};
  transition: all 0.25s ease;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.06);
  position: absolute;
  right: 0;
  top: 0;
  align-self: flex-end;
  margin-top: -7px;
  margin-right: -7px;

  &:hover {
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
    transform: translate(-4px, 4px);
  }
`;

const StyledAddButton = styled.button`
  margin-top: 10px;
  cursor: pointer;
  font-weight: 700;
  padding: 11px 28px;
  border-radius: 12px;
  font-size: 0.8rem;
  border: none;
  color: #fff;
  background: ${({ theme }) => theme.invertedInputFieldBGColor};
  transition: all 0.25s ease;
  &:hover {
    box-shadow: 0 10px 20px -10px #333;
    transform: translateY(-5px);
    background: ${({ theme }) => theme.invertedInputFieldBGColor};
  }
`;

const StyledCancelButton = styled.button`
  margin-top: 10px;
  cursor: pointer;
  font-weight: 700;
  padding: 11px 28px;
  border-radius: 12px;
  font-size: 0.8rem;
  border: none;
  color: #2c3e50;
  background: #fcfcfc;
  transition: all 0.25s ease;
  &:hover {
    box-shadow: none;
    transform: none;
    background: whitesmoke;
  }
`;

const StyledCheckboxWrapper = styled.div`
  display: block;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  margin: 0 auto;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  display: block;
  padding: 0 30px 10px;
`;

export {
  StyledDarkBg,
  StyledCentered,
  StyledModal,
  StyledModalHeader,
  StyledHeading,
  StyledContent,
  StyledActions,
  StyledActionsContainer,
  StyledCloseButton,
  StyledAddButton,
  StyledCancelButton,
  StyledCheckboxWrapper,
  StyledLabel,
};