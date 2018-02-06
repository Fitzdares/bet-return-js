import { single, accumulator, multiple, effectiveOdds } from '../lib/main';

const test = require('tape');

test('single win bet is correct', (t) => {
  const selection = { stake: 10, odds: { decimal: 5 }, terms: '1/4' };

  t.plan(1);

  const result = single(selection);

  const expected = { win: 50, place: 0, total: 50 };

  t.deepEqual(result, expected);
});

test('single win bet with fractional odds is correct', (t) => {
  const selection = { stake: 10, odds: { fractional: '4/1' }, terms: '1/4' };

  t.plan(1);

  const result = single(selection);

  const expected = { win: 50, place: 0, total: 50 };

  t.deepEqual(result, expected);
});

test('single eachway is correct', (t) => {
  const selection = {
    stake: 10,
    odds: { decimal: 5 },
    terms: '1/4',
    ew: true
  };

  t.plan(1);

  const result = single(selection);

  const expected = { win: 50, place: 20, total: 70 };

  t.deepEqual(result, expected);
});

test('single eachway with fractional odds is correct', (t) => {
  const selection = {
    stake: 10,
    odds: { fractional: '4/1' },
    terms: '1/4',
    ew: true
  };

  t.plan(1);

  const result = single(selection);

  const expected = { win: 50, place: 20, total: 70 };

  t.deepEqual(result, expected);
});

test('win double is correct', (t) => {
  const params = {
    selections: [
      { stake: 10, odds: { decimal: 5 }, terms: '1/4' },
      { stake: 20, odds: { decimal: 6 }, terms: '1/2' }
    ],
    stake: 5,
    ew: false
  };

  t.plan(1);

  const result = accumulator(params);
  const expected = 150;

  t.equal(result, expected);
});

test('win double with fractional odds is correct', (t) => {
  const params = {
    selections: [
      { stake: 10, odds: { fractional: '4/1' }, terms: '1/4' },
      { stake: 10, odds: { fractional: '4/1' }, terms: '1/4' }
    ],
    stake: 5
  };

  t.plan(1);

  const result = accumulator(params);
  const expected = 125;

  t.equal(result, expected);
});

test('eachway double is correct', (t) => {
  const params = {
    selections: [
      { stake: 10, odds: { decimal: 5 }, terms: '1/4' },
      { stake: 10, odds: { decimal: 5 }, terms: '1/4' }
    ],
    stake: 10,
    ew: true
  };

  t.plan(1);

  const result = accumulator(params);
  const expected = 290;

  t.equal(result, expected);
});

test('eachway double with fractional odds is correct', (t) => {
  const params = {
    selections: [
      { stake: 10, odds: { fractional: '4/1' }, terms: '1/4' },
      { stake: 10, odds: { fractional: '4/1' }, terms: '1/4' }
    ],
    stake: 10,
    ew: true
  };

  t.plan(1);

  const result = accumulator(params);
  const expected = 290;

  t.equal(result, expected);
});

test('multiple with two selections', (t) => {
  const params = {
    selections: [
      { stake: 10, odds: { decimal: 5 }, terms: '1/4' },
      { stake: 10, odds: { decimal: 5 }, terms: '1/4' }
    ],
    stake: 10,
    ew: false,
    fullCover: false
  };

  t.plan(1);

  const result = multiple(params);
  const expected = 250;

  t.equal(result, expected);
});

test('multiple with fractional odds two selections', (t) => {
  const params = {
    selections: [
      { stake: 10, odds: { fractional: '4/1' }, terms: '1/4' },
      { stake: 10, odds: { fractional: '4/1' }, terms: '1/4' }
    ],
    stake: 10,
    ew: false,
    fullCover: false
  };

  t.plan(1);

  const result = multiple(params);
  const expected = 250;

  t.equal(result, expected);
});

test('ew multiple with two selections', (t) => {
  const params = {
    selections: [
      { stake: 10, odds: { decimal: 5 }, terms: '1/4' },
      { stake: 10, odds: { decimal: 5 }, terms: '1/4' }
    ],
    stake: 10,
    ew: true,
    fullCover: false
  };

  t.plan(1);

  const result = multiple(params);
  const expected = 290;

  t.equal(result, expected);
});

test('ew multiple with fractional odds two selections', (t) => {
  const params = {
    selections: [
      { stake: 10, odds: { fractional: '4/1' }, terms: '1/4' },
      { stake: 10, odds: { fractional: '4/1' }, terms: '1/4' }
    ],
    stake: 10,
    ew: true,
    fullCover: false
  };

  t.plan(1);

  const result = multiple(params);
  const expected = 290;

  t.equal(result, expected);
});

test('full cover multiple with three selections', (t) => {
  const params = {
    selections: [
      { stake: 10, odds: { decimal: 5 }, terms: '1/4' },
      { stake: 10, odds: { decimal: 5 }, terms: '1/4' },
      { stake: 10, odds: { decimal: 5 }, terms: '1/4' }
    ],
    stake: 10,
    ew: false,
    fullCover: true
  };

  t.plan(1);

  const result = multiple(params);
  const expected = 2150;

  t.equal(result, expected);
});

test('full cover multiple with fractional odds three selections', (t) => {
  const params = {
    selections: [
      { stake: 10, odds: { fractional: '4/1' }, terms: '1/4' },
      { stake: 10, odds: { fractional: '4/1' }, terms: '1/4' },
      { stake: 10, odds: { fractional: '4/1' }, terms: '1/4' }
    ],
    stake: 10,
    ew: false,
    fullCover: true
  };

  t.plan(1);

  const result = multiple(params);
  const expected = 2150;

  t.equal(result, expected);
});

test('full cover ew multiple with three selections', (t) => {
  const params = {
    selections: [
      { stake: 10, odds: { decimal: 5 }, terms: '1/4' },
      { stake: 10, odds: { decimal: 5 }, terms: '1/4' },
      { stake: 10, odds: { decimal: 5 }, terms: '1/4' }
    ],
    stake: 10,
    ew: true,
    fullCover: true
  };

  t.plan(1);

  const result = multiple(params);
  const expected = 2410;

  t.equal(result, expected);
});

test('full cover ew multiple with fractional odds three selections', (t) => {
  const params = {
    selections: [
      { stake: 10, odds: { decimal: 5 }, terms: '1/4' },
      { stake: 10, odds: { decimal: 5 }, terms: '1/4' },
      { stake: 10, odds: { decimal: 5 }, terms: '1/4' }
    ],
    stake: 10,
    ew: true,
    fullCover: true
  };

  t.plan(1);

  const result = multiple(params);
  const expected = 2410;

  t.equal(result, expected);
});

test('multiple doubles with three selections', (t) => {
  const params = {
    selections: [
      { stake: 10, odds: { decimal: 10 }, terms: '1/4' },
      { stake: 10, odds: { decimal: 10 }, terms: '1/4' },
      { stake: 10, odds: { decimal: 5 }, terms: '1/4' }
    ],
    stake: 10,
    size: 2
  };

  t.plan(1);

  const result = multiple(params);
  const expected = 2000;

  t.equal(result, expected);
});

test('ew and fullCover default to false', (t) => {
  const params = {
    selections: [
      { stake: 10, odds: { fractional: '4/1' }, terms: '1/4' },
      { stake: 10, odds: { fractional: '4/1' }, terms: '1/4' }
    ],
    stake: 10
  };

  t.plan(1);

  const result = multiple(params);
  const expected = 250;

  t.equal(result, expected);
});

test('effective odds with empty values', (t) => {
  const selections = [
    { stake: 10, odds: { }, terms: '1/4' }
  ];

  t.plan(1);

  const result = effectiveOdds(selections);
  const expected = { decimal: 1, fractional: '0/1' };

  t.deepEqual(result, expected);
});

test('effective odds with one selection', (t) => {
  const selections = [
    { stake: 10, odds: { decimal: 7.5 }, terms: '1/4' }
  ];

  t.plan(1);

  const result = effectiveOdds(selections);
  const expected = { decimal: 7.5, fractional: '13/2' };

  t.deepEqual(result, expected);
});

test('effective odds with two selections', (t) => {
  const selections = [
    { stake: 10, odds: { decimal: 17 }, terms: '1/4' },
    { stake: 10, odds: { decimal: 21 }, terms: '1/4' }
  ];

  t.plan(1);

  const result = effectiveOdds(selections);
  const expected = { decimal: 357, fractional: '356/1' };

  t.deepEqual(result, expected);
});

test('effective odds with three selections', (t) => {
  const selections = [
    { stake: 10, odds: { decimal: 17 }, terms: '1/4' },
    { stake: 10, odds: { decimal: 21 }, terms: '1/4' },
    { stake: 10, odds: { decimal: 3.5 }, terms: '1/4' }
  ];

  t.plan(1);

  const result = effectiveOdds(selections);
  const expected = { decimal: 1249.5, fractional: '1248.5/1' };

  t.deepEqual(result, expected);
});

test('effective odds with fractional odds three selections', (t) => {
  const selections = [
    { stake: 10, odds: { fractional: '17/2' }, terms: '1/4' },
    { stake: 10, odds: { fractional: '20/1' }, terms: '1/4' },
    { stake: 10, odds: { fractional: '2/1' }, terms: '1/4' }
  ];

  t.plan(1);

  const result = effectiveOdds(selections);
  const expected = { decimal: 598.5, fractional: '597.5/1' };

  t.deepEqual(result, expected);
});
