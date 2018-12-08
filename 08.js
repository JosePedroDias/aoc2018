/*
header (1)
  x nr nodes
  y nr metadata
child nodes (x 0-n)
metadata entries (y 1-n)


2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2
A----------------------------------
    B----------- C-----------
                     D-----
                     
*/

function tokenize(s) {
  return s.split(' ').map((t) => parseInt(t, 10));
}

function sumNums(arr) {
  let res = 0;
  const l = arr.length;
  for (let i = 0; i < l; ++i) {
    res += arr[i];
  }
  return res;
}

function countTreeTokens(node) {
  return (
    2 +
    node.metadata.length +
    sumNums(node.children.map((subNode) => countTreeTokens(subNode)))
  );
}

function parseNode(tokens, startIndex) {
  const node = { children: [], metadata: [] };
  let i = startIndex;
  const nrChildren = tokens[i++];
  const nrMeta = tokens[i++];

  for (let j = 0; j < nrChildren; ++j) {
    const subNode = parseNode(tokens, i);
    i += countTreeTokens(subNode);
    node.children.push(subNode);
  }

  for (let j = 0; j < nrMeta; ++j) {
    node.metadata.push(tokens[i++]);
  }

  return node;
}

function traverseTree(node, fn, depth = 0, dBranch = 0) {
  fn(node, depth, dBranch);
  node.children.forEach((subNode, idx) =>
    traverseTree(subNode, fn, depth + 1, idx)
  );
}

function question1(tree) {
  let sumMetas = 0;
  function fn(node, d, b) {
    sumMetas += sumNums(node.metadata);
  }
  traverseTree(tree, fn);
  return sumMetas;
}

function _question2(tree) {
  let sum = 0;
  function fn(node, d, b) {
    if (node.children.length === 0) {
      sum += sumNums(node.metadata);
    } else {
      node.metadata.forEach((md) => {
        const subNode = node.children[md - 1];
        if (!subNode) {
          return;
        }
        sum += question1(subNode);
      });
    }
  }
  traverseTree(tree, fn);
  return sum;
}

function question2(node) {
  //console.log('nrChildren', node.children.length, 'metadata:', node.metadata);
  if (node.children.length === 0) {
    const sum = sumNums(node.metadata);
    //console.log(`RETURNS DIRECT SUM OF METAS ${sum}`);
    return sum;
  } else {
    let sum = 0;
    node.metadata.forEach((md, i) => {
      //console.log(`(${md} ${i})`);
      const subNode = node.children[md - 1];
      if (!subNode) {
        //console.log('.SKIP');
        return;
      }
      const v = question2(subNode);
      //console.log(`.ADD ${v}`);
      sum += v;
    });
    //console.log(`RETURNS ${sum}`);
    return sum;
  }
}

module.exports = {
  tokenize,
  sumNums,
  countTreeTokens,
  parseNode,
  traverseTree,
  question1,
  question2
};
