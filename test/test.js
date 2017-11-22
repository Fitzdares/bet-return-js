const test = require('tape');
const estimateReturns = require('../lib/main');

test('single win bet is correct', (t) => {
  const selections = [
    { stake: 10, odds: 5, terms: null }
  ];

  t.plan(1);

  const result = estimateReturns(selections, selections[0].stake, 0);
  const expected = 50;
  t.equal(result, expected);
});

test('single eachway is correct', (t) => {
  const selections = [
    { stake: 10, odds: 5, terms: 0.25 }
  ];

  t.plan(1);

  const result = estimateReturns(selections, selections[0].stake, 0);
  const expected = 70;
  t.equal(result, expected);
});

test('win double is correct', (t) => {
  const selections = [
    { stake: 10, odds: 5, terms: null },
    { stake: 10, odds: 5, terms: null }

  ];

  t.plan(1);

  const result = estimateReturns(selections, selections[0].stake, 0);
  const expected = 250;
  t.equal(result, expected);
});

test('eachway double is correct', (t) => {
  const selections = [
    { stake: 10, odds: 5, terms: 0.25 },
    { stake: 10, odds: 5, terms: 0.25 }

  ];

  t.plan(1);

  const result = estimateReturns(selections, selections[0].stake, 0);
  const expected = 290;
  t.equal(result, expected);
});

