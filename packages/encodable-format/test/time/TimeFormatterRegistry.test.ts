import TimeFormatterRegistry from '../../src/time/TimeFormatterRegistry';
import TimeFormats from '../../src/time/TimeFormats';
import { PREVIEW_TIME } from '../../src/time/previewTime';

describe('TimeFormatterRegistry', () => {
  let registry: TimeFormatterRegistry;
  beforeEach(() => {
    registry = new TimeFormatterRegistry();
  });
  describe('.get(format)', () => {
    it('creates and returns a new formatter if does not exist', () => {
      const formatter = registry.get(TimeFormats.DATABASE_DATETIME);
      expect(formatter(PREVIEW_TIME)).toEqual('2017-02-14 11:22:33');
    });
    it('returns an existing formatter if already exists', () => {
      const formatter = registry.get(TimeFormats.TIME);
      const formatter2 = registry.get(TimeFormats.TIME);
      expect(formatter).toBe(formatter2);
    });
    it('falls back to default format if format is not specified', () => {
      registry.setDefaultKey(TimeFormats.INTERNATIONAL_DATE);
      const formatter = registry.get();
      expect(formatter(PREVIEW_TIME)).toEqual('14/02/2017');
    });
    it('falls back to default format if format is null', () => {
      registry.setDefaultKey(TimeFormats.INTERNATIONAL_DATE);
      // @ts-ignore
      const formatter = registry.get(null);
      expect(formatter(PREVIEW_TIME)).toEqual('14/02/2017');
    });
    it('falls back to default format if format is undefined', () => {
      registry.setDefaultKey(TimeFormats.INTERNATIONAL_DATE);
      const formatter = registry.get(undefined);
      expect(formatter(PREVIEW_TIME)).toEqual('14/02/2017');
    });
    it('falls back to default format if format is empty string', () => {
      registry.setDefaultKey(TimeFormats.INTERNATIONAL_DATE);
      const formatter = registry.get('');
      expect(formatter(PREVIEW_TIME)).toEqual('14/02/2017');
    });
    it('removes leading and trailing spaces from format', () => {
      const formatter = registry.get(' %Y ');
      expect(formatter(PREVIEW_TIME)).toEqual('2017');
    });
  });
  describe('.format(format, value)', () => {
    it('return the value with the specified format', () => {
      expect(registry.format(TimeFormats.US_DATE, PREVIEW_TIME)).toEqual('02/14/2017');
      expect(registry.format(TimeFormats.TIME, PREVIEW_TIME)).toEqual('11:22:33');
    });
    it('falls back to the default formatter if the format is undefined', () => {
      expect(registry.format(undefined, PREVIEW_TIME)).toEqual('2017-02-14 11:22:33');
    });
  });
});
