import { useCallback, useEffect } from 'react';
import { Schema } from '@cofe/core';
import { useDispatch, useValue } from '@cofe/store';
import { TemplateState } from '@/store/template';

export const useTemplate = () => {
  const schemas = useValue<TemplateState>('template');
  const actions = useTemplateActions();

  useEffect(() => {
    Schema.register(schemas);
  }, [schemas]);

  return {
    schemas,
    ...actions,
  };
};

export const useTemplateActions = () => {
  const dispatch = useDispatch();

  const createTemplate = useCallback(
    (payload) => {
      dispatch('CREATE_TEMPLATE')(payload);

      Schema.register(payload);
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
