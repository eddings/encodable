import { TimeLocaleDefinition } from 'd3-time-format';
import createD3TimeFormatter from '../../../src/time/factories/createD3TimeFormatter';
import { PREVIEW_TIME } from '../../../src/time/previewTime';
import TimeFormats from '../../../src/time/TimeFormats';

const thLocale: TimeLocaleDefinition = {
  dateTime: '%a %e %b %Y %X',
  date: '%d/%m/%Y',
  time: '%H:%M:%S',
  periods: ['AM', 'PM'],
  days: ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัส', 'วันศุกร์', 'วันเสาร์'],
  shortDays: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ', 'ศ.', 'ส.'],
  months: [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ],
  shortMonths: [
    'ม.ค.',
    'ก.พ.',
    'มี.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
    'ก.ค.',
    'ส.ค.',
    'ก.ย.',
    'ต.ค.',
    'พ.ย.',
    'ธ.ค.',
  ],
};

describe('createD3TimeFormatter(config)', () => {
  describe('config.useLocalTime', () => {
    it('if falsy, formats in UTC time', () => {
      const formatter = createD3TimeFormatter({
        format: TimeFormats.DATABASE_DATETIME,
      });
      expect(formatter(PREVIEW_TIME)).toEqual('2017-02-14 11:22:33');
    });
    it('if true, formats in local time', () => {
      const formatter = createD3TimeFormatter({
        format: TimeFormats.DATABASE_DATETIME,
        useLocalTime: true,
      });
      const offset = new Date().getTimezoneOffset();
      if (offset === 0) {
        expect(formatter(PREVIEW_TIME)).toEqual('2017-02-14 11:22:33');
      } else {
        expect(formatter(PREVIEW_TIME)).not.toEqual('2017-02-14 11:22:33');
      }
    });
  });

  describe('config.locale', () => {
    const TEST_TIME = new Date(Date.UTC(2015, 11, 20));
    it('supports locale customization (utc time)', () => {
      const formatter = createD3TimeFormatter({
        format: '%c',
        locale: thLocale,
      });
      expect(formatter(TEST_TIME)).toEqual('อา. 20 ธ.ค. 2015 00:00:00');
    });
    it('supports locale customization (local time)', () => {
      const formatter = createD3TimeFormatter({
        format: '%c',
        locale: thLocale,
        useLocalTime: true,
      });
      const offset = new Date().getTimezoneOffset();
      if (offset === 0) {
        expect(formatter(TEST_TIME)).toEqual('อา. 20 ธ.ค. 2015 00:00:00');
      } else {
        expect(formatter(TEST_TIME)).not.toEqual('อา. 20 ธ.ค. 2015 00:00:00');
      }
    });
  });
});
