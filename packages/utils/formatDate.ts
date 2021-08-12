export const formatDate = (
  ts: Date | number,
  {
    locales = 'zh-CN',
    dateStyle = 'long',
    timeStyle = 'long',
    hourCycle = 'h24',
    ...options
  }: Intl.DateTimeFormatOptions & {
    locales?: string | string[];
  } = {},
) =>
  new Intl.DateTimeFormat(locales, {
    dateStyle,
    timeStyle,
    hourCycle,
  }).format(ts);
