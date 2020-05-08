import { parseDatetime } from 'utils/date';

test('parseDatetime', () => {
  const dateStr = '2020-05-08 03:10:00';
  const date = parseDatetime(dateStr);
  expect(date.toISOString()).toEqual('2020-05-08T03:10:00.000Z');
});
