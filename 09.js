const { padWith } = require('./generic');
const { DoubleLinkedList } = require('./DoubleLinkedList');

function question1(numPlayers, lastMarbleWorth) {
  function nextMarbleNumber() {
    return marbles.length();
  }

  function renderMarbles() {
    let line = ['[', currentPlayer === -1 ? '-' : currentPlayer + 1, '] '];
    const currentMarble = marbles.value();
    marbles.toArray().forEach((marbleValue, idx) => {
      const before = marbleValue === currentMarble ? '(' : ' ';
      const after = marbleValue === currentMarble ? ')' : ' ';
      line = line.concat([before, padWith('' + marbleValue, 2), after, ' ']);
    });
    return line.join('');
  }

  let currentPlayer = -1;
  let marbles = new DoubleLinkedList(0);

  // example: 9 players
  while (true) {
    console.log(renderMarbles());
    currentPlayer = (currentPlayer + 1) % numPlayers;
    marbles.addAfter(nextMarbleNumber());
    if (marbles.length() > 25) {
      return;
    }
  }
}

question1(9, 32);

module.exports = { question1 };
