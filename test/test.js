import { single, accumulator, multiple, effectiveOdds } from '../lib/main';

const test = require('tape');

test('single win bet is correct', (t) => {
  const selection = { stake: 10, odds: { decimal: 5 }, terms: 0.25 };

  t.plan(1);

  const result = single({
    stake: selection.stake,
    odds: selection.odds,
    terms: selection.terms
  });

  const expected = 50;
  t.equal(result.total, expected);
});

test('single win bet with fractional odds is correct', (t) => {
  const selection = { stake: 10, odds: { fractional: '4/1' }, terms: 0.25 };

  t.plan(1);

  const result = single({
    stake: selection.stake,
    odds: selection.odds,
    terms: selection.terms
  });

  const expected = 50;
  t.equal(result.total, expected);
});

test('single eachway is correct', (t) => {
  const selection = { stake: 10, odds: { decimal: 5 }, terms: 0.25 };

  t.plan(1);

  const result = single({
    stake: selection.stake, odds: selection.odds, terms: selection.terms, ew: true
  });
  const expected = 70;
  t.equal(result.total, expected);
});

test('single eachway with fractional odds is correct', (t) => {
  const selection = { stake: 10, odds: { fractional: '4/1' }, terms: 0.25 };

  t.plan(1);

  const result = single({
    stake: selection.stake, odds: selection.odds, terms: selection.terms, ew: true
  });
  const expected = 70;
  t.equal(result.total, expected);
});

test('win double is correct', (t) => {
  const selections = [
    { stake: 10, odds: { decimal: 5 }, terms: 0.25 },
    { stake: 10, odds: { decimal: 5 }, terms: 0.25 }
  ];
  const ewFalse = false;
  const stake = 5;

  t.plan(1);

  const result = accumulator(selections, stake, ewFalse);
  const expected = 125;
  t.equal(result, expected);
});

test('eachway double is correct', (t) => {
  const selections = [
    { stake: 10, odds: { decimal: 5 }, terms: 0.25 },
    { stake: 10, odds: { decimal: 5 }, terms: 0.25 }
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
    { stake: 10, odds: { decimal: 5 }, terms: 0.25 },
    { stake: 10, odds: { decimal: 5 }, terms: 0.25 }
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
    { stake: 10, odds: { decimal: 5 }, terms: 0.25 },
    { stake: 10, odds: { decimal: 5 }, terms: 0.25 }
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
    { stake: 10, odds: { decimal: 5 }, terms: 0.25 },
    { stake: 10, odds: { decimal: 5 }, terms: 0.25 },
    { stake: 10, odds: { decimal: 5 }, terms: 0.25 }
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
    { stake: 10, odds: { decimal: 5 }, terms: 0.25 },
    { stake: 10, odds: { decimal: 5 }, terms: 0.25 },
    { stake: 10, odds: { decimal: 5 }, terms: 0.25 }
  ];
  const stake = 10;
  const ewTrue = true;
  const fullCover = true;

  t.plan(1);

  const result = multiple(selections, stake, ewTrue, fullCover);
  const expected = 2410;

  t.equal(result, expected);
});

test('effective odds with one selection', (t) => {
  const selections = [
    { stake: 10, odds: { decimal: 17 }, terms: 0.25 }
  ];

  t.plan(1);

  const result = effectiveOdds(selections);
  const expected = 17;

  t.equal(result, expected);
});

test('effective odds with two selections', (t) => {
  const selections = [
    { stake: 10, odds: { decimal: 17 }, terms: 0.25 },
    { stake: 10, odds: { decimal: 21 }, terms: 0.25 }
  ];

  t.plan(1);

  const result = effectiveOdds(selections);
  const expected = 357;

  t.equal(result, expected);
});

test('effective odds with three selections', (t) => {
  const selections = [
    { stake: 10, odds: { decimal: 17 }, terms: 0.25 },
    { stake: 10, odds: { decimal: 21 }, terms: 0.25 },
    { stake: 10, odds: { decimal: 3 }, terms: 0.25 }
  ];

  t.plan(1);

  const result = effectiveOdds(selections);
  const expected = 1071;

  t.equal(result, expected);
});
