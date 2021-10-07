import { useEffect } from 'react';
import { get } from '@cofe/io';
import { useDispatch, useStore } from '@cofe/store';
import { TemplateState } from '@/store/template';

let loaded = false;

export const useTemplates = () => {
  const templates = useStore<TemplateState>('template');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loaded) {
      loaded = true;
      dispatch('SET_TEMPLATES')(get('/api/templates'));
    }
  });

  return templates;
};
