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
  M_MINS_31 //  12
];

const MONTH_MINS = new Array(12);
for (let i = 0; i < 12; ++i) {
  MONTH_MINS[i] = 0;
  for (let j = 0; j < i; ++j) {
    MONTH_MINS[i] += MONTH_MINS_[j];
  }
}

// console.log('MONTH_MINS_', MONTH_MINS_);
// console.log('MONTH_MINS', MONTH_MINS);

// '1518-10-03 00:47'
function dateTimeToNum(dtS) {
  const m = parseInt(dtS.substr(5, 2), 10);
  const d = parseInt(dtS.substr(8, 2), 10);
  const h = parseInt(dtS.substr(11, 2), 10);
  const min = parseInt(dtS.substr(14), 10);
  // console.log(dtS, y, m, d, h, min);
  return MONTH_MINS[m] + d * D_MINS + h * H_MINS + min;
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
    const [dtS, ev] = parseIntoDateTimeDesc(line);
    return [dateTimeToNum(dtS), parseEvent(ev)];
  });
}

module.exports = {
  parseIntoDateTimeDesc,
  dateTimeToNum,
  parseEvent,
  parseLog
};
