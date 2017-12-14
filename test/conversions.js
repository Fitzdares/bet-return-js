import { oddsConversion, fractionConversion } from '../lib/conversions';

const test = require('tape');

test('converts fraction to decimal', (t) => {
  t.plan(1);

  const result = fractionConversion.toDecimal('5/1');

  const expected = 5.0;

  t.equal(result, expected);
});

test('converts decimal to fractional', (t) => {
  t.plan(1);

  const result = fractionConversion.toFractional(5.0);

  const expected = '5/1';

  t.equal(result, expected);
});

test('returns 0 with no args', (t) => {
  t.plan(1);

  const result = fractionConversion.toDecimal();

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

test('converts decimal odds to fractional odds', (t) => {
  t.plan(1);

  const result = oddsConversion.toFractional({ decimal: 6.0 });

  const expected = '5/1';

  t.equal(result, expected);
});

test('converts decimal odds to fractional odds', (t) => {
  t.plan(1);

  const result = oddsConversion.toFractional({ decimal: 6.5 });

  const expected = '11/2';

  t.equal(result, expected);
});

test("doesn't alter fractional odds", (t) => {
  t.plan(1);

  const result = oddsConversion.toFractional({ fractional: '5/1' });

  const expected = '5/1';

  t.equal(result, expected);
});

test('returns 1 with no odds args', (t) => {
  t.plan(1);

  const result = oddsConversion.toDecimal({ });

  const expected = 1.0;

  t.equal(result, expected);
});
