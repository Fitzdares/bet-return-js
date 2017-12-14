import combinations from '../lib/combinations';

const test = require('tape');

test('calculates combinations', (t) => {
  t.plan(1);

  const selections = [1, 2, 3];

  const count = selections.length;
  const start = 1;
  let result = [];

  for (let i = start; i <= count; i += 1) {
    result = result.concat(combinations(selections, i));
  }

  const expected = [[1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]];

  t.deepEqual(result, expected);
});

test('calculates full cover combinations', (t) => {
  t.plan(1);

  const selections = [1, 2, 3];

  const count = selections.length;
  const start = 2;
  let result = [];

  for (let i = start; i <= count; i += 1) {
    result = result.concat(combinations(selections, i));
  }

  const expected = [[1, 2], [1, 3], [2, 3], [1, 2, 3]];

  t.deepEqual(result, expected);
});
