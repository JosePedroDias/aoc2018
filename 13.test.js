const {} = require('./13');
const { fileAsLines } = require('./generic');

const LINES = fileAsLines('./13.input.txt');

const EXAMPLE_LINES = `/->-\\        
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/   `.split('\n');

it('', () => {
  console.log(EXAMPLE_LINES.join('\n'));
});
