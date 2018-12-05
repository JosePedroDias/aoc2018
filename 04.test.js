const {
  parseIntoDateTimeDesc,
  dateTimeToNum,
  parseEvent,
  parseLog
} = require('./04');

const fileAsLines = require('./generic').fileAsLines;
const LINES = fileAsLines('./04.input.txt');
// console.log(LINES);

it('parseIntoDateTimeDesc', () => {
  expect(parseIntoDateTimeDesc('[1518-10-03 00:47] falls asleep')).toEqual([
    '1518-10-03 00:47',
    'falls asleep'
  ]);
});

it('dateTimeToNum', () => {
  expect(dateTimeToNum('1518-10-13 23:50')).toBe(457910);
  expect(dateTimeToNum('1518-02-04 00:48')).toBe(90768);
});

it('parseEvent', () => {
  expect(parseEvent('falls asleep')).toBe(false);
  expect(parseEvent('wakes up')).toBe(true);
  expect(parseEvent('Guard #487 begins shift')).toBe('487');
});

xit('parseLog', () => {
  // console.log(parseLog(LINES));
});
