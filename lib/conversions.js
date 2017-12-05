function toDecimal({ decimal = null, fractional = null }) {
  if (decimal !== null) {
    return decimal;
  }

  const [upper, lower] =
        fractional
          .split('/')
          .map(n => Number(n).toFixed(5));

  return 1.0 + (upper / lower);
}

module.exports = {
  toDecimal
};
