import { useCallback } from 'react';
import { CofeSchema } from '@cofe/types';
import { omit } from 'lodash-es';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

export interface TemplateState extends Record<CofeSchema['type'], CofeSchema> {}

export const templateState = atom({
  key: 'template',
  default: null,
});

export const useTemplateValue = () => {
  return useRecoilValue(templateState);
};

export const useTemplateActions = () => {
  const setTemplates = useSetRecoilState(templateState);

  return {
    create: useCallback(
      (payload) =>
        setTemplates((templates) => ({
          ...templates,
          ...payload,
        })),
      [setTemplates],
    ),
    remove: useCallback(
      (payload) =>
        setTemplates((templates) => omit(templates, payload.type ?? payload)),
      [setTemplates],
    ),
  };
};
