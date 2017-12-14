import Fraction from 'fraction.js';

export const fractionConversion = {
  toDecimal(value) {
    return new Fraction(value).valueOf();
  },

  toFractional(value) {
    const fraction = new Fraction(value);
    const numerator = fraction.n;
    const denominator = fraction.d;

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

  toFractional({ decimal, fractional }) {
    if (fractional) {
      return fractional;
    }

    return fractionConversion.toFractional(decimal - 1);
  }
};
