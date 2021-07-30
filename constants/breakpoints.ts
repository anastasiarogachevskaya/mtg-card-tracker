export const breakpoints = {
  tiny: 350,
  mobile: 576,
  tablet: 768,
  laptop: 992,
  desktop: 1200,
};

export const device = {
  mobile: `(min-width: ${breakpoints.mobile}px)`,
  tabletS: `(max-width: ${breakpoints.tablet - 1}px)`,
  tablet: `(min-width: ${breakpoints.tablet}px)`,
  laptopS: `(max-width: ${breakpoints.laptop - 1}px)`,
  laptop: `(min-width: ${breakpoints.laptop}px)`,
  desktopS: `(max-width: ${breakpoints.desktop - 1}px)`,
  desktop: `(min-width: ${breakpoints.desktop}px)`,
};