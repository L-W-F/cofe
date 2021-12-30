import { useCallback } from 'react';
import { CofeMolecule } from '@cofe/types';
import { omit } from 'lodash-es';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

export interface MoleculeState extends Record<CofeMolecule['type'], CofeMolecule> {}

export const moleculeState = atom({
  key: 'molecule',
  default: null,
});

export const useMoleculeValue = () => {
  return useRecoilValue(moleculeState);
};

export const useMoleculeActions = () => {
  const setMolecule = useSetRecoilState(moleculeState);

  return {
    create: useCallback(
      (payload) =>
        setMolecule((molecules) => ({
          ...molecules,
          ...payload,
        })),
      [setMolecule],
    ),
    remove: useCallback(
      (payload) =>
        setMolecule((molecules) => omit(molecules, payload.type ?? payload)),
      [setMolecule],
    ),
  };
};
