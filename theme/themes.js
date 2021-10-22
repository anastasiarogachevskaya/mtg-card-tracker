import { createGlobalStyle } from 'styled-components'

export const lightTheme = {
  body: "#FFF",
  fontColor: "#000000",
  inputFieldBGColor: "#f0f0f0",
  inputFieldBGColorHover: "#fafafa",
  inputFieldColor: "#666",
  componentContainerBGColor: '#FFF',
  boxShadowColor: '#000000',
};

export const darkTheme = {
  body: "#121212",
  fontColor: "#FFF",
  inputFieldBGColor: "#292929",
  inputFieldBGColorHover: "#4a4a4a",
  inputFieldColor: "#DDD",
  componentContainerBGColor: '#1E1E1E',
  boxShadowColor: '#664B86',
};

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.fontColor};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
`