const {
  parseIntoDateTimeDesc,
  timeToMins,
  parseEvent,
  parseLog
} = require('./04');

const fileAsLines = require('./generic').fileAsLines;
const LINES = fileAsLines('./04.input.txt');
// console.log(LINES);

it('parseIntoDateTimeDesc', () => {
  expect(parseIntoDateTimeDesc('[1518-10-03 00:47] falls asleep')).toEqual([
    '1518-10-03',
    '00:47',
    'falls asleep'
  ]);
});

it('timeToMins', () => {
  expect(timeToMins('23:50')).toBe(1430); // 23*60 + 50
  expect(timeToMins('00:48')).toBe(48);
});

it('parseEvent', () => {
  expect(parseEvent('falls asleep')).toBe(false);
  expect(parseEvent('wakes up')).toBe(true);
  expect(parseEvent('Guard #487 begins shift')).toBe('487');
});

fit('parseLog', () => {
  console.log(parseLog(LINES));
});
