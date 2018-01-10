import Fraction from 'fraction.js';

export const fractionConversion = {
  toDecimal(value) {
    return new Fraction(value).valueOf();
  },

  toFractional(value) {
    const fraction = new Fraction(value);
    const numerator = fraction.n;
    const denominator = fraction.d;

    if (numerator === 3 && denominator === 2) {
      return '6/4';
    }

    return `${numerator}/${denominator}`;
  }
};

export const oddsConversion = {
  toDecimal({ decimal, fractional }) {
    if (decimal) {
      return decimal;
    }

    return 1.0 + fractionConversion.toDecimal(fractional);
  },

  toFractional({ decimal, fractional, multipleSelections }) {
    if (fractional) {
      return fractional;
    }

    const fraction = fractionConversion.toFractional(decimal - 1);

    if (multipleSelections) {
      const [numerator, denominator] = fraction.split('/');

      return `${numerator / denominator}/1`;
    }

    return fraction;
  }
};
