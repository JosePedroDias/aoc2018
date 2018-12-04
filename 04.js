/*
'[1518-10-03 00:47] falls asleep'
'[1518-07-26 23:50] Guard #487 begins shift'
'[1518-06-22 00:48] wakes up'
*/

const FALLS_ASLEEP = 'falls asleep';
const WAKES_UP = 'wakes up';

function parseIntoDateTimeDesc(line) {
  return [line.substring(1, 11), line.substring(12, 17), line.substring(19)];
}

function timeToMins(timeS) {
  const h = parseInt(timeS.substring(0, 2), 10);
  const min = parseInt(timeS.substring(3), 10);
  return 60 * h + min;
}

function parseEvent(desc) {
  if (desc === FALLS_ASLEEP) {
    return false;
  }
  if (desc === WAKES_UP) {
    return true;
  }
  const res = /#([0-9]+)/.exec(desc);
  return res && res[1];
}

function parseLog(lines) {
  lines.sort();
  return lines.map((line) => {
    const parts = parseIntoDateTimeDesc(line);
    return [parts[0], parts[1], timeToMins(parts[1]), parseEvent(parts[2])];
  });
}

module.exports = {
  parseIntoDateTimeDesc,
  timeToMins,
  parseEvent,
  parseLog
};
