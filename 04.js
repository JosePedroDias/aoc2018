/*
'[1518-10-03 00:47] falls asleep'
'[1518-07-26 23:50] Guard #487 begins shift'
'[1518-06-22 00:48] wakes up'
*/

const FALLS_ASLEEP = 'falls asleep';
const WAKES_UP = 'wakes up';

// '[1518-10-03 00:47] falls asleep'
function parseIntoDateTimeDesc(line) {
  return [line.substring(1, 17), line.substring(19)];
}

const H_MINS = 60;
const D_MINS = H_MINS * 24;

const M_MINS_28 = D_MINS * 28;
const M_MINS_30 = D_MINS * 30;
const M_MINS_31 = D_MINS * 31;

// THIS WORKS ONLY FOR YEAR 1518!!
const MONTH_MINS_ = [
  M_MINS_31, //  1
  M_MINS_28, //  2
  M_MINS_31, //  3
  M_MINS_30, //  3
  M_MINS_31, //  5
  M_MINS_30, //  6
  M_MINS_31, //  7
  M_MINS_31, //  8
  M_MINS_30, //  9
  M_MINS_31, // 10
  M_MINS_30, // 11
  M_MINS_31, //  12
  M_MINS_31 //  1 next
];

const MONTH_MINS = new Array(13);
for (let i = 0; i < 13; ++i) {
  MONTH_MINS[i] = 0;
  for (let j = 0; j < i; ++j) {
    MONTH_MINS[i] += MONTH_MINS_[j];
  }
}

// console.log('MONTH_MINS_', MONTH_MINS_);
// console.log('MONTH_MINS', MONTH_MINS);

// '1518-10-03 00:47' -> [10,3, 0, 47]
function parseDateTimeS(dtS) {
  const m = parseInt(dtS.substr(5, 2), 10);
  const d = parseInt(dtS.substr(8, 2), 10);
  const h = parseInt(dtS.substr(11, 2), 10);
  const min = parseInt(dtS.substr(14), 10);
  return [m, d, h, min];
}

function dateTimeSToNum(dtS) {
  return dateTimeToNum(parseDateTimeS(dtS));
}

function dateTimeToNum([m, d, h, min]) {
  return MONTH_MINS[m - 1] + d * D_MINS + h * H_MINS + min;
}

function numToTime(num) {
  let min = getMinuteOfDay(num);
  const h = Math.floor(min / H_MINS);
  min -= h * H_MINS;
  return [h, min];
}

function numToDateTime(min) {
  let m = 1;
  while (min > MONTH_MINS[m]) {
    ++m;
  }
  min -= MONTH_MINS[m - 1];
  const d = Math.floor(min / D_MINS);
  min -= d * D_MINS;
  const h = Math.floor(min / H_MINS);
  min -= h * H_MINS;
  return [m, d, h, min];
}

function getMinuteOfDay(num) {
  return num % D_MINS;
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

function parseLog(sortedLines) {
  let lastEv;
  const guards = new Map();
  let guard;
  const knownGuards = new Set();

  sortedLines.forEach((line) => {
    // console.log(`** ${line} ** `);
    const [dtS, desc] = parseIntoDateTimeDesc(line);
    const ev = parseEvent(desc);
    // console.log('ev', ev);
    const num = dateTimeSToNum(dtS);
    const mod = getMinuteOfDay(num);

    if (typeof ev === 'string') {
      if (lastEv && !lastEv[2]) {
        console.log('SEMI awake after', num - lastEv[0]);
      }

      guard = guards.get(ev);
      if (!guard) {
        guard = new Map();
        guards.set(ev, guard);
        lastEv = [num, mod, true];
        console.log('first awake of ', ev, mod);
      }
    } else if (ev) {
      console.log('awake after', num - lastEv[0]);
      lastEv = [num, mod, true];
    } else {
      console.log('asleep after', num - lastEv[0]);
      lastEv = [num, mod, false];
    }
  });

  return guards;
}

module.exports = {
  parseIntoDateTimeDesc,
  dateTimeSToNum,
  dateTimeToNum,
  numToDateTime,
  numToTime,
  getMinuteOfDay,
  parseEvent,
  parseLog
};
