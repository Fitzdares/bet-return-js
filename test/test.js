const test = require('tape');
import { single, accumulator, multiple } from '../lib/main';

test('single win bet is correct', (t) => {
  const selection = { stake: 10, odds: 5, terms: 0.25 }

  t.plan(1);

  const result = single(selection.stake, selection.odds, selection.terms, false, 0);
  const expected = 50;
  t.equal(result.total, expected);
});

test('single eachway is correct', (t) => {
  const selection = { stake: 10, odds: 5, terms: 0.25 }

  t.plan(1);

  const result = single(selection.stake, selection.odds, selection.terms, true, 0);
  const expected = 70;
  t.equal(result.total, expected);
});

test('win double is correct', (t) => {
  const selections = [
    { stake: 10, odds: 5, terms: 0.25 },
    { stake: 10, odds: 5, terms: 0.25 }

  ];

  t.plan(1);

  const result = accumulator(selections, selections[0].stake, false);
  const expected = 250;
  t.equal(result, expected);
});

test('eachway double is correct', (t) => {
  const selections = [
    { stake: 10, odds: 5, terms: 0.25 },
    { stake: 10, odds: 5, terms: 0.25 }
  ];

  t.plan(1);

  const result = accumulator(selections, selections[0].stake, true);
  const expected = 290;
  t.equal(result, expected);
});

test('multiple with two selections', (t) => {

  const selections = [
    { stake: 10, odds: 5, terms: 0.25 },
    { stake: 10, odds: 5, terms: 0.25 }
  ]
  const stake = 10;
  const ew = false;
  const fullCover= false;

  t.plan(1)

  const result = multiple(selections, stake, ew, fullCover);
  const expected = 250;

  t.equal(result, expected);
});

test('ew multiple with two selections', (t) => {

  const selections = [
    { stake: 10, odds: 5, terms: 0.25 },
    { stake: 10, odds: 5, terms: 0.25 }
  ]
  const stake = 10;
  const ew = true;
  const fullCover= false;

  t.plan(1)

  const result = multiple(selections, stake, ew, fullCover);
  const expected = 290;

  t.equal(result, expected);
});


test('full cover multiple with two selections', (t) => {

  const selections = [
    { stake: 10, odds: 5, terms: 0.25 },
    { stake: 10, odds: 5, terms: 0.25 },
    { stake: 10, odds: 5, terms: 0.25 }
  ]
  const stake = 10;
  const ew = false;
  const fullCover= true;

  t.plan(1)

  const result = multiple(selections, stake, ew, fullCover);
  const expected = 2150;

  t.equal(result, expected);
});

test('full cover ew multiple with two selections', (t) => {

  const selections = [
    { stake: 10, odds: 5, terms: 0.25 },
    { stake: 10, odds: 5, terms: 0.25 },
    { stake: 10, odds: 5, terms: 0.25 }
  ]
  const stake = 10;
  const ew = true;
  const fullCover= true;

  t.plan(1)

  const result = multiple(selections, stake, ew, fullCover);
  const expected = 2410;

  t.equal(result, expected);
});

