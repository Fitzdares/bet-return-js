import { single, accumulator, multiple } from '../lib/main';

const test = require('tape');

test('single win bet is correct', (t) => {
  const selection = { stake: 10, odds: 5, terms: 0.25 };

  t.plan(1);

  const result = single({ stake: selection.stake, odds: selection.odds, terms: selection.terms });
  const expected = 50;
  t.equal(result.total, expected);
});

test('single eachway is correct', (t) => {
  const selection = { stake: 10, odds: 5, terms: 0.25 };

  t.plan(1);

  const result = single({
    stake: selection.stake, odds: selection.odds, terms: selection.terms, ew: true
  });
  const expected = 70;
  t.equal(result.total, expected);
});

test('win double is correct', (t) => {
  const selections = [
    { stake: 10, odds: 5, terms: 0.25 },
    { stake: 10, odds: 5, terms: 0.25 }
  ];
  const ewFalse = false;

  t.plan(1);

  const result = accumulator(selections, selections[0].stake, ewFalse);
  const expected = 250;
  t.equal(result, expected);
});

test('eachway double is correct', (t) => {
  const selections = [
    { stake: 10, odds: 5, terms: 0.25 },
    { stake: 10, odds: 5, terms: 0.25 }
  ];

  const stake = 10;
  const ewTrue = true;

  t.plan(1);

  const result = accumulator(selections, stake, ewTrue);
  const expected = 290;
  t.equal(result, expected);
});

test('multiple with two selections', (t) => {
  const selections = [
    { stake: 10, odds: 5, terms: 0.25 },
    { stake: 10, odds: 5, terms: 0.25 }
  ];
  const stake = 10;
  const ewFalse = false;
  const fullCover = false;

  t.plan(1);

  const result = multiple(selections, stake, ewFalse, fullCover);
  const expected = 250;

  t.equal(result, expected);
});

test('ew multiple with two selections', (t) => {
  const selections = [
    { stake: 10, odds: 5, terms: 0.25 },
    { stake: 10, odds: 5, terms: 0.25 }
  ];
  const stake = 10;
  const ewTrue = true;
  const fullCover = false;

  t.plan(1);

  const result = multiple(selections, stake, ewTrue, fullCover);
  const expected = 290;

  t.equal(result, expected);
});


test('full cover multiple with three selections', (t) => {
  const selections = [
    { stake: 10, odds: 5, terms: 0.25 },
    { stake: 10, odds: 5, terms: 0.25 },
    { stake: 10, odds: 5, terms: 0.25 }
  ];
  const stake = 10;
  const ewFalse = false;
  const fullCover = true;

  t.plan(1);

  const result = multiple(selections, stake, ewFalse, fullCover);
  const expected = 2150;

  t.equal(result, expected);
});

test('full cover ew multiple with three selections', (t) => {
  const selections = [
    { stake: 10, odds: 5, terms: 0.25 },
    { stake: 10, odds: 5, terms: 0.25 },
    { stake: 10, odds: 5, terms: 0.25 }
  ];
  const stake = 10;
  const ewTrue = true;
  const fullCover = true;

  t.plan(1);

  const result = multiple(selections, stake, ewTrue, fullCover);
  const expected = 2410;

  t.equal(result, expected);
});

