class Odds {
  constructor({ decimal = null, fractional = null }) {
    this.decimal = decimal;
    this.fractional = fractional;
  }
  toDecimal() {
    if (this.decimal !== null) return this.decimal;

    const [upper, lower] = this.fractional.split('/').map(n => Number(n).toFixed(5));

    return 1.0 + (upper / lower);
  }
}

export default Odds;
