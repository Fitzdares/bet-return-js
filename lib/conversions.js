const fractionalConversion = {
  toDecimal(fractional) {
    const [upper, lower] =
      fractional
        .split('/')
        .map(n => Number(n).toFixed(5));

    return (upper / lower);
  }
};

const oddsConversion = {
  toDecimal({ decimal = null, fractional = null }) {
    if (decimal !== null) {
      return decimal;
    }

    return 1.0 + fractionalConversion.toDecimal(fractional);
  }
};

module.exports = {
  fractionalConversion,
  oddsConversion
};
