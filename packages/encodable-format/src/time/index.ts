import { makeSingleton } from '@encodable/registry';
import TimeFormatterRegistry from './TimeFormatterRegistry';
import { TimeFormatInput } from '../types';

export const getTimeFormatterRegistry = makeSingleton(
  () =>
    new TimeFormatterRegistry({
      globalId: '@encodable/format:TimeFormatterRegistry',
    }),
);

export function getTimeFormatter(format?: string) {
  return getTimeFormatterRegistry().get(format);
}

export function formatTime(format: string | undefined, value: TimeFormatInput) {
  return getTimeFormatterRegistry().format(format, value);
}

export { TimeFormatterRegistry };
export { default as TimeFormats, LOCAL_TIME_PREFIX } from './TimeFormats';
export { default as createTimeFormatter } from './createTimeFormatter';
export { default as previewTime } from './previewTime';
export { default as createD3TimeFormatter } from './factories/createD3TimeFormatter';
export { default as createMultiTimeFormatter } from './factories/createMultiTimeFormatter';
export { default as smartDateFormatter } from './formatters/smartDate';
export { default as smartDateVerboseFormatter } from './formatters/smartDateVerbose';
