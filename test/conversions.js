import { oddsConversion, fractionalConversion } from '../lib/conversions';

const test = require('tape');

test('converts fraction to decimal', (t) => {
  t.plan(1);

  const result = fractionalConversion.toDecimal('5/1');

  const expected = 5.0;

  t.equal(result, expected);
});

test('returns 0 with no args', (t) => {
  t.plan(1);

  const result = fractionalConversion.toDecimal();

  const expected = 0.0;

  t.equal(result, expected);
});


test('converts fractional odds to decimal odds', (t) => {
  t.plan(1);

  const result = oddsConversion.toDecimal({ fractional: '5/1' });

  const expected = 6.0;

  t.equal(result, expected);
});

test('converts fractional odds to decimal odds', (t) => {
  t.plan(1);

  const result = oddsConversion.toDecimal({ fractional: '11/2' });

  const expected = 6.5;

  t.equal(result, expected);
});

test("doesn't alter decimal odds", (t) => {
  t.plan(1);

  const result = oddsConversion.toDecimal({ decimal: 6.0 });

  const expected = 6.0;

  t.equal(result, expected);
});

test('returns 1 with no odds args', (t) => {
  t.plan(1);

  const result = oddsConversion.toDecimal({ });

  const expected = 1.0;

  t.equal(result, expected);
});
