import { utcToZonedTime } from 'date-fns-tz';

export function parseDatetime(dateAsString, ymdDelimiter = '-') {
  var pattern = new RegExp(
    '(\\d{4})' + ymdDelimiter + '(\\d{2})' + ymdDelimiter + '(\\d{2}) (\\d{2}):(\\d{2}):(\\d{2})'
  );
  var parts = dateAsString.match(pattern);

  const utcDate = new Date(
    Date.UTC(
      parseInt(parts[1]),
      parseInt(parts[2], 10) - 1,
      parseInt(parts[3], 10),
      parseInt(parts[4], 10),
      parseInt(parts[5], 10),
      parseInt(parts[6], 10),
      0
    )
  );
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return utcToZonedTime(utcDate, timeZone);
}
