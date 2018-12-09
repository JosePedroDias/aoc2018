const {
  parseIntoDateTimeDesc,
  dateTimeSToNum,
  parseEvent,
  parseLog,
  question1,
  question2
} = require('./04');

const { fileAsLines } = require('./generic');

const SORTED_LINES = fileAsLines('./04.input.txt').sort();
const EXAMPLE_LINES = `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`.split('\n');
// console.log(SORTED_LINES);

it('parseIntoDateTimeDesc', () => {
  expect(parseIntoDateTimeDesc('[1518-10-03 00:47] falls asleep')).toEqual([
    '1518-10-03 00:47',
    'falls asleep'
  ]);
});

it('dateTimeSToNum', () => {
  expect(dateTimeSToNum('1518-10-13 23:50')).toBe(413270);
  expect(dateTimeSToNum('1518-02-04 00:48')).toBe(50448);
});

it('parseEvent', () => {
  expect(parseEvent('falls asleep')).toBe(false);
  expect(parseEvent('wakes up')).toBe(true);
  expect(parseEvent('Guard #487 begins shift')).toBe(487);
});

it('parseLog', () => {
  const guards = parseLog(EXAMPLE_LINES);
  expect(Array.from(guards.keys()).sort()).toEqual([10, 99]);

  //

  let guard = guards.get(10);

  expect(guard.minsAsleep).toEqual(50);

  let i = 0;
  for (let v of guard.sleepDayMatrix.values()) {
    i += v;
  }
  expect(i).toEqual(50);

  //

  guard = guards.get(99);

  expect(guard.minsAsleep).toEqual(30);

  i = 0;
  for (let v of guard.sleepDayMatrix.values()) {
    i += v;
  }
  expect(i).toEqual(30);
});

it('question 1 example', () => {
  const guards = parseLog(EXAMPLE_LINES);
  const answer = question1(guards);
  expect(answer).toBe(240); // #10 * min 24
});

it('question 1', () => {
  const guards = parseLog(SORTED_LINES);
  const answer = question1(guards);
  expect(answer).toBe(72925);
});

it('question 2 example', () => {
  const guards = parseLog(EXAMPLE_LINES);
  const answer = question2(guards);
  expect(answer).toBe(4455); // #99 * min 45
});

it('question 2', () => {
  const guards = parseLog(SORTED_LINES);
  const answer = question2(guards);
  expect(answer).toBe(49137);
});
