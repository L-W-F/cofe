import React, { Fragment } from 'react';

export const ObjectFieldTemplate = ({ title, description, properties }) => {
  return (
    <>
      {title}
      {properties.map(({ name, content }) => (
        <Fragment key={name}>{content}</Fragment>
      ))}
      {description}
    </>
  );
};

if (process.env.NODE_ENV === 'development') {
  ObjectFieldTemplate.displayName = 'ObjectFieldTemplate';
}
