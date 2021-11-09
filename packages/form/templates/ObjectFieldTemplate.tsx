import React from 'react';
import { Grid, GridItem, GridItemProps, GridProps } from '@chakra-ui/react';
import { ObjectFieldTemplateProps, utils } from '@rjsf/core';
import { AddButton } from '../components/AddButton';

export const ObjectFieldTemplate = ({
  TitleField,
  title,
  DescriptionField,
  description,
  uiSchema,
  idSchema,
  schema,
  formData,
  onAddClick,
  properties,
  required,
  disabled,
  readonly,
  gridGap = 4,
  templateColumns,
  spanMap,
}: ObjectFieldTemplateProps & {
  gridGap?: GridProps['gridGap'];
  templateColumns?: GridProps['templateColumns'];
  spanMap?: Record<string, GridItemProps['colSpan']>;
}) => {
  return (
    <>
      {(uiSchema['ui:title'] || title) && (
        <TitleField
          id={`${idSchema.$id}-title`}
          title={uiSchema['ui:title'] || title}
          required={required}
        />
      )}
      {(uiSchema['ui:description'] || description) && (
        <DescriptionField
          id={`${idSchema.$id}-description`}
          description={uiSchema['ui:description'] || description}
        />
      )}
      <Grid gridGap={gridGap} templateColumns={templateColumns}>
        {properties.map(({ name, content }) => {
          const colSpan = spanMap?.[name];

          return colSpan === undefined ? (
            content
          ) : (
            <GridItem key={name} colSpan={colSpan}>
              {content}
            </GridItem>
          );
        })}
        {utils.canExpand(schema, uiSchema, formData) && (
          <Grid container justify="flex-end">
            <Grid item={true}>
              <AddButton
                className="object-property-expand"
                onClick={onAddClick(schema)}
                disabled={disabled || readonly}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

if (process.env.NODE_ENV === 'development') {
  ObjectFieldTemplate.displayName = 'ObjectFieldTemplate';
}
