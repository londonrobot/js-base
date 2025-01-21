export function timeStringFormatted(date) {
  return new Intl.DateTimeFormat(
    'ru-RU',
    { hour: '2-digit', minute: '2-digit', hour12: false }
  ).format(new Date(date));
}
