const { Matrix } = require('./generic');

const REGEX = /position=<\s*(\-?[0-9]+),\s*(\-?[0-9]+)> velocity=<\s*(\-?[0-9]+),\s*(\-?[0-9]+)>/;

// position=<-10162,  10462> velocity=< 1, -1>
function parseLine(line) {
  const m = REGEX.exec(line).map((s) => parseInt(s, 10));
  return [[m[1], m[2]], [m[3], m[4]]];
}

function doStep(readings) {
  return readings.map(([pos, vel]) => {
    return [[pos[0] + vel[0], pos[1] + vel[1]], vel];
  });
}

function draw(readings, [W, H], [dx, dy]) {
  const mtx = new Matrix(W, H, dx, dy, '.');
  readings.forEach(([[x, y], _]) => {
    if (x < dx || y < dy || x >= W + dx || y >= H + dy) {
      return;
    }
    mtx.setChar(x, y, '#');
  });

  return mtx;
}

function findLimits(readings) {
  let minX = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;
  readings.forEach(([[x, y], _]) => {
    if (x < minX) {
      minX = x;
    }
    if (x > maxX) {
      maxX = x;
    }
    if (y < minY) {
      minY = y;
    }
    if (y > maxY) {
      maxY = y;
    }
  });
  return [[maxX - minX + 1, maxY - minY + 1], [minX, minY]];
}

function questions(readings, targetHeight) {
  for (let step = 0; step < 20000; ++step) {
    const [dims, delta] = findLimits(readings);

    if (step % 100 === 0) {
      //console.log(`step ${step}, dims ${dims} delta ${delta}`);
    }

    if (dims[1] < targetHeight) {
      // console.log('\n' + draw(readings, dims, delta).toString());
      return [step, draw(readings, dims, delta).toString()];
    }
    readings = doStep(readings);
  }
}

module.exports = { parseLine, doStep, draw, findLimits, questions };
