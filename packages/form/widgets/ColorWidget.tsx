import React from 'react';
import { TextWidget, TextWidgetProps } from './TextWidget';

export const ColorWidget = (props: TextWidgetProps) => {
  return (
    <TextWidget
      {...props}
      InputProps={{
        type: 'color',
      }}
    />
  );
};

if (process.env.NODE_ENV === 'development') {
  ColorWidget.displayName = 'ColorWidget';
}
