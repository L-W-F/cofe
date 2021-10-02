import React from 'react';
import { Grid, GridItem, GridItemProps, GridProps } from '@chakra-ui/react';
import { ObjectFieldTemplateProps } from '@rjsf/core';

export const ObjectFieldTemplate = ({
  title,
  description,
  properties,
  gridGap = 2,
  templateColumns,
  spanMap,
}: ObjectFieldTemplateProps & {
  gridGap?: GridProps['gridGap'];
  templateColumns?: GridProps['templateColumns'];
  spanMap?: Record<string, GridItemProps['colSpan']>;
}) => {
  return (
    <>
      {title}
      <Grid gridGap={gridGap} templateColumns={templateColumns}>
        {properties.map(({ name, content }) => (
          <GridItem key={name} colSpan={spanMap?.[name]}>
            {content}
          </GridItem>
        ))}
      </Grid>
      {description}
    </>
  );
};

if (process.env.NODE_ENV === 'development') {
  ObjectFieldTemplate.displayName = 'ObjectFieldTemplate';
}
