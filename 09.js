const { padWith } = require('./generic');

function question1(numPlayers, lastMarbleWorth) {
  function nextMarbleNumber() {
    return marbles.length;
  }

  // clockwise === right === higher index until wrapping
  function positionCW(numSteps) {
    return (currentMarble + numSteps) % (marbles.length + 1);
  }

  function whereToPlaceMarble() {
    return positionCW(3);
  }

  // CHANGES MARBLES!
  function placeMarble(where) {
    const marbleValue = nextMarbleNumber();
    marbles.splice(where, 0, marbleValue);
  }

  function renderMarbles() {
    let line = ['[', currentPlayer === -1 ? '-' : currentPlayer + 1, '] '];
    marbles.forEach((marbleValue, idx) => {
      const before = idx === currentMarble ? '(' : ' ';
      const after = idx === currentMarble ? ')' : ' ';
      line = line.concat([before, padWith('' + marbleValue, 2), after, ' ']);
    });
    return line.join('');
  }

  let currentPlayer = -1;
  let currentMarble = 0;
  const marbles = [0];

  // example: 9 players
  while (true) {
    console.log(renderMarbles());
    currentPlayer = (currentPlayer + 1) % numPlayers;
    const where = whereToPlaceMarble();
    //console.log(
    //  `player ${currentPlayer} will place ${nextMarbleNumber()} in pos ${where}`
    //);
    placeMarble(where);
    currentMarble = where;
    if (marbles.length > 25) {
      return;
    }
  }
}

question1(9, 32);

module.exports = { question1 };
