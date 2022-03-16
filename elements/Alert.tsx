import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const error = css`
  color: ${({ theme }) => theme.colors.seiskaRed};
  background-color: #f8d7da;
  border-color: ${({ theme }) => theme.colors.seiskaRed};;
`;

const success = css`
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
`;

const warning = css`
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
`;

const info = css`
  color: #0c5460;
  background-color: #d1ecf1;
  border-color: #bee5eb;
`;

const types = {
  error, warning, success, info,
};

const BaseAlert = styled.div<{ width:Number, center: boolean, type: 'error' | 'warning' | 'success' | 'info'}>`
  position: relative;
  padding: .75rem 1.25rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  border: 1px solid transparent;
  border-radius: .25rem;
  color: #0c5460;
  background-color: #d1ecf1;
  border-color: #bee5eb;
  max-width: ${({ width }) => width && `${width}px`};
  ${({ center }) => center && `
    margin-left: auto;
    margin-right: auto;
  `};
  ${({ type }) => types[type]};
`;

export type AlertProps = {
  /**
   * The type of alert to display.
   * @default 'info'
   * error: red text with lighter red background;
   * warning: brownish text with yellow background;
   * success: green text with lighter green background;
   */
  type?: 'error' | 'warning' | 'success' | 'info';
  /**
   * Whether to center the alert.
   */
  center?: boolean;
  /**
   * The width of the alert.
   * @default 600
   */
  width?: number;
  testId?: string;
  children: React.ReactNode;
};

const Alert = ({
  type = 'info', center = false, width = 600, testId, children,
} : AlertProps) => (
  <BaseAlert
    type={type}
    data-testid={testId}
    center={center}
    width={width}
  >
    {children}
  </BaseAlert>
);

export default Alert;
