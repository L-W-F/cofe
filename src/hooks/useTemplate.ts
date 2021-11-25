import { useCallback, useEffect } from 'react';
import { Schema } from '@cofe/core';
import { templateStore } from '@/store';
import { TemplateState } from '@/store/template';

export const useTemplate = () => {
  const schemas = useTemplateValues();
  const actions = useTemplateActions();

  return {
    schemas,
    ...actions,
  };
};

export const useTemplateValues = () => {
  const schemas = templateStore.useValue<TemplateState>('template');

  useEffect(() => {
    Object.values(schemas).forEach((schema) => {
      Schema.add(schema);
    });
  }, [schemas]);

  return schemas;
};

export const useTemplateActions = () => {
  const dispatch = templateStore.useDispatch();

  const createTemplate = useCallback(
    (payload) => {
      dispatch('CREATE_TEMPLATE')(payload);

      Schema.add(payload);
    },
    [dispatch],
  );

  const deleteTemplate = useCallback(
    (payload) => {
      dispatch('DELETE_TEMPLATE')(payload);

      Schema.del(payload.type ?? payload);
    },
    [dispatch],
  );

  return {
    createTemplate,
    deleteTemplate,
  };
};
