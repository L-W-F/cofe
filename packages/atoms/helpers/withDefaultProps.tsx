import React from 'react';

export const withDefaultProps = (defaultProps) => (Component) => {
  return (props) => <Component {...defaultProps} {...props} />;
};
