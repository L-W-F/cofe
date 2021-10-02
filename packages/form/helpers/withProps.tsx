import React from 'react';

export const withProps = (options) => (Component) => {
  return (props) => <Component {...options} {...props} />;
};
