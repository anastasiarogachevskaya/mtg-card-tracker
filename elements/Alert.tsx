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

const types = { error, warning, success };

const BaseAlert = styled.div`
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

const Alert = ({
  type, center, width, testId, children,
}) => (
  <BaseAlert
    type={type}
    data-testid={testId}
    center={center}
    width={width}
  >
    {children}
  </BaseAlert>
);

Alert.propTypes = {
  type: PropTypes.string,
  center: PropTypes.bool,
  width: PropTypes.number,
  testId: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Alert.defaultProps = {
  type: '',
  center: false,
  width: 600,
  testId: '',
};

export default Alert;
