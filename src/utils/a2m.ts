export const a2m = (a: Array<{ id: number; [key: string]: any }>) => {
  return a.reduce(
    (o, i) => ({
      ...o,
      [i.id]: i,
    }),
    {},
  );
};
