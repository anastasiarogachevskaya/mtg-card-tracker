import { createGlobalStyle } from 'styled-components'

const colors = {
  white: '#fff',
  black: '#000',
  gray: '#fafafa',
  lightGray: '#f5f5f5',
  darkGray: '#121212',
  violet: '#673ab7',
  teal: '#009688',
}

export const lightTheme = {
  inputFieldBGColor: "#f0f0f0",
  inputFieldBGColorHover: "#fafafa",
  inputFieldColor: "#666",
  invertedInputFieldBGColor: "#000",
  componentContainerBGColor: '#FFF',
  boxShadowColor: '#000000',
  modalBGColor: 'rgba(0, 0, 0, 0.2)',
  primary: {
    main: colors.violet,
    textColor: colors.black,
    inverted: colors.teal,
    invertedTextColor: colors.white,
    underBgColor: colors.white,
  },
};

export const darkTheme = {
  inputFieldBGColor: "#292929",
  inputFieldBGColorHover: "#4a4a4a",
  inputFieldColor: "#DDD",
  invertedInputFieldBGColor: "#292929",
  componentContainerBGColor: '#1E1E1E',
  boxShadowColor: '#664B86',
  modalBGColor: 'rgb(255 255 255 / 0.2)',
  primary: {
    main: colors.teal,
    textColor: colors.white,
    inverted: colors.violet,
    invertedTextColor: colors.black,
    underBgColor: colors.darkGray,
  },
};

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    background: ${({ theme }) => theme.primary.underBgColor};
    color: ${({ theme }) => theme.primary.textColor};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
`