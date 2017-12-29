function combinations(collection, size) {
  var len = collection.length;

  if (size > len) return [];
  if (!size) return [[]];
  if (size === len) return [collection];

  return collection.reduce(function (acc, val, i) {
    var res = combinations(collection.slice(i + 1), size - 1).map(function (comb) {
      return [val].concat(comb);
    });

    return acc.concat(res);
  }, []);
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var fraction = createCommonjsModule(function (module, exports) {
  /**
   * @license Fraction.js v4.0.4 09/09/2015
   * http://www.xarg.org/2014/03/rational-numbers-in-javascript/
   *
   * Copyright (c) 2015, Robert Eisele (robert@xarg.org)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   **/

  /**
   *
   * This class offers the possibility to calculate fractions.
   * You can pass a fraction in different formats. Either as array, as double, as string or as an integer.
   *
   * Array/Object form
   * [ 0 => <nominator>, 1 => <denominator> ]
   * [ n => <nominator>, d => <denominator> ]
   *
   * Integer form
   * - Single integer value
   *
   * Double form
   * - Single double value
   *
   * String form
   * 123.456 - a simple double
   * 123/456 - a string fraction
   * 123.'456' - a double with repeating decimal places
   * 123.(456) - synonym
   * 123.45'6' - a double with repeating last place
   * 123.45(6) - synonym
   *
   * Example:
   *
   * var f = new Fraction("9.4'31'");
   * f.mul([-4, 3]).div(4.9);
   *
   */

  (function (root) {

    var MAX_CYCLE_LEN = 2000;

    // Parsed data to avoid calling "new" all the time
    var P = {
      "s": 1,
      "n": 0,
      "d": 1
    };

    function createError(name) {
      var errorConstructor = function errorConstructor() {
        var temp = Error.apply(this, arguments);
        temp.name = this.name = name;
        this.stack = temp.stack;
        this.message = temp.message;
      };

      var IntermediateInheritor = function IntermediateInheritor() {};
      IntermediateInheritor.prototype = Error.prototype;
      errorConstructor.prototype = new IntermediateInheritor();

      return errorConstructor;
    }

    var DivisionByZero = Fraction['DivisionByZero'] = createError('DivisionByZero');
    var InvalidParameter = Fraction['InvalidParameter'] = createError('InvalidParameter');

    function assign(n, s) {

      if (isNaN(n = parseInt(n, 10))) {
        throwInvalidParam();
      }
      return n * s;
    }

    function throwInvalidParam() {
      throw new InvalidParameter();
    }

    var parse = function parse(p1, p2) {

      var n = 0,
          d = 1,
          s = 1;
      var v = 0,
          w = 0,
          x = 0,
          y = 1,
          z = 1;

      var A = 0,
          B = 1;
      var C = 1,
          D = 1;

      var N = 10000000;
      var M;

      if (p1 === undefined || p1 === null) {
        /* void */
      } else if (p2 !== undefined) {
        n = p1;
        d = p2;
        s = n * d;
      } else switch (typeof p1 === "undefined" ? "undefined" : _typeof(p1)) {

        case "object":
          {
            if ("d" in p1 && "n" in p1) {
              n = p1["n"];
              d = p1["d"];
              if ("s" in p1) n *= p1["s"];
            } else if (0 in p1) {
              n = p1[0];
              if (1 in p1) d = p1[1];
            } else {
              throwInvalidParam();
            }
            s = n * d;
            break;
          }
        case "number":
          {
            if (p1 < 0) {
              s = p1;
              p1 = -p1;
            }

            if (p1 % 1 === 0) {
              n = p1;
            } else if (p1 > 0) {
              // check for != 0, scale would become NaN (log(0)), which converges really slow

              if (p1 >= 1) {
                z = Math.pow(10, Math.floor(1 + Math.log(p1) / Math.LN10));
                p1 /= z;
              }

              // Using Farey Sequences
              // http://www.johndcook.com/blog/2010/10/20/best-rational-approximation/

              while (B <= N && D <= N) {
                M = (A + C) / (B + D);

                if (p1 === M) {
                  if (B + D <= N) {
                    n = A + C;
                    d = B + D;
                  } else if (D > B) {
                    n = C;
                    d = D;
                  } else {
                    n = A;
                    d = B;
                  }
                  break;
                } else {

                  if (p1 > M) {
                    A += C;
                    B += D;
                  } else {
                    C += A;
                    D += B;
                  }

                  if (B > N) {
                    n = C;
                    d = D;
                  } else {
                    n = A;
                    d = B;
                  }
                }
              }
              n *= z;
            } else if (isNaN(p1) || isNaN(p2)) {
              d = n = NaN;
            }
            break;
          }
        case "string":
          {
            B = p1.match(/\d+|./g);

            if (B === null) throwInvalidParam();

            if (B[A] === '-') {
              // Check for minus sign at the beginning
              s = -1;
              A++;
            } else if (B[A] === '+') {
              // Check for plus sign at the beginning
              A++;
            }

            if (B.length === A + 1) {
              // Check if it's just a simple number "1234"
              w = assign(B[A++], s);
            } else if (B[A + 1] === '.' || B[A] === '.') {
              // Check if it's a decimal number

              if (B[A] !== '.') {
                // Handle 0.5 and .5
                v = assign(B[A++], s);
              }
              A++;

              // Check for decimal places
              if (A + 1 === B.length || B[A + 1] === '(' && B[A + 3] === ')' || B[A + 1] === "'" && B[A + 3] === "'") {
                w = assign(B[A], s);
                y = Math.pow(10, B[A].length);
                A++;
              }

              // Check for repeating places
              if (B[A] === '(' && B[A + 2] === ')' || B[A] === "'" && B[A + 2] === "'") {
                x = assign(B[A + 1], s);
                z = Math.pow(10, B[A + 1].length) - 1;
                A += 3;
              }
            } else if (B[A + 1] === '/' || B[A + 1] === ':') {
              // Check for a simple fraction "123/456" or "123:456"
              w = assign(B[A], s);
              y = assign(B[A + 2], 1);
              A += 3;
            } else if (B[A + 3] === '/' && B[A + 1] === ' ') {
              // Check for a complex fraction "123 1/2"
              v = assign(B[A], s);
              w = assign(B[A + 2], s);
              y = assign(B[A + 4], 1);
              A += 5;
            }

            if (B.length <= A) {
              // Check for more tokens on the stack
              d = y * z;
              s = /* void */
              n = x + d * v + z * w;
              break;
            }

            /* Fall through on error */
          }
        default:
          throwInvalidParam();
      }

      if (d === 0) {
        throw new DivisionByZero();
      }

      P["s"] = s < 0 ? -1 : 1;
      P["n"] = Math.abs(n);
      P["d"] = Math.abs(d);
    };

    var modpow = function modpow(b, e, m) {

      for (var r = 1; e > 0; b = b * b % m, e >>= 1) {

        if (e & 1) {
          r = r * b % m;
        }
      }
      return r;
    };

    var cycleLen = function cycleLen(n, d) {

      for (; d % 2 === 0; d /= 2) {}

      for (; d % 5 === 0; d /= 5) {}

      if (d === 1) // Catch non-cyclic numbers
        return 0;

      // If we would like to compute really large numbers quicker, we could make use of Fermat's little theorem:
      // 10^(d-1) % d == 1
      // However, we don't need such large numbers and MAX_CYCLE_LEN should be the capstone,
      // as we want to translate the numbers to strings.

      var rem = 10 % d;

      for (var t = 1; rem !== 1; t++) {
        rem = rem * 10 % d;

        if (t > MAX_CYCLE_LEN) return 0; // Returning 0 here means that we don't print it as a cyclic number. It's likely that the answer is `d-1`
      }
      return t;
    };

    var cycleStart = function cycleStart(n, d, len) {

      var rem1 = 1;
      var rem2 = modpow(10, len, d);

      for (var t = 0; t < 300; t++) {
        // s < ~log10(Number.MAX_VALUE)
        // Solve 10^s == 10^(s+t) (mod d)

        if (rem1 === rem2) return t;

        rem1 = rem1 * 10 % d;
        rem2 = rem2 * 10 % d;
      }
      return 0;
    };

    var _gcd = function _gcd(a, b) {

      if (!a) return b;
      if (!b) return a;

      while (1) {
        a %= b;
        if (!a) return b;
        b %= a;
        if (!b) return a;
      }
    };

    /**
     * Module constructor
     *
     * @constructor
     * @param {number|Fraction} a
     * @param {number=} b
     */
    function Fraction(a, b) {

      if (!(this instanceof Fraction)) {
        return new Fraction(a, b);
      }

      parse(a, b);

      if (Fraction['REDUCE']) {
        a = _gcd(P["d"], P["n"]); // Abuse a
      } else {
        a = 1;
      }

      this["s"] = P["s"];
      this["n"] = P["n"] / a;
      this["d"] = P["d"] / a;
    }

    /**
     * Boolean global variable to be able to disable automatic reduction of the fraction
     *
     */
    Fraction['REDUCE'] = 1;

    Fraction.prototype = {

      "s": 1,
      "n": 0,
      "d": 1,

      /**
       * Calculates the absolute value
       *
       * Ex: new Fraction(-4).abs() => 4
       **/
      "abs": function abs() {

        return new Fraction(this["n"], this["d"]);
      },

      /**
       * Inverts the sign of the current fraction
       *
       * Ex: new Fraction(-4).neg() => 4
       **/
      "neg": function neg() {

        return new Fraction(-this["s"] * this["n"], this["d"]);
      },

      /**
       * Adds two rational numbers
       *
       * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30
       **/
      "add": function add(a, b) {

        parse(a, b);
        return new Fraction(this["s"] * this["n"] * P["d"] + P["s"] * this["d"] * P["n"], this["d"] * P["d"]);
      },

      /**
       * Subtracts two rational numbers
       *
       * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
       **/
      "sub": function sub(a, b) {

        parse(a, b);
        return new Fraction(this["s"] * this["n"] * P["d"] - P["s"] * this["d"] * P["n"], this["d"] * P["d"]);
      },

      /**
       * Multiplies two rational numbers
       *
       * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
       **/
      "mul": function mul(a, b) {

        parse(a, b);
        return new Fraction(this["s"] * P["s"] * this["n"] * P["n"], this["d"] * P["d"]);
      },

      /**
       * Divides two rational numbers
       *
       * Ex: new Fraction("-17.(345)").inverse().div(3)
       **/
      "div": function div(a, b) {

        parse(a, b);
        return new Fraction(this["s"] * P["s"] * this["n"] * P["d"], this["d"] * P["n"]);
      },

      /**
       * Clones the actual object
       *
       * Ex: new Fraction("-17.(345)").clone()
       **/
      "clone": function clone() {
        return new Fraction(this);
      },

      /**
       * Calculates the modulo of two rational numbers - a more precise fmod
       *
       * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)
       **/
      "mod": function mod(a, b) {

        if (isNaN(this['n']) || isNaN(this['d'])) {
          return new Fraction(NaN);
        }

        if (a === undefined) {
          return new Fraction(this["s"] * this["n"] % this["d"], 1);
        }

        parse(a, b);
        if (0 === P["n"] && 0 === this["d"]) {
          Fraction(0, 0); // Throw DivisionByZero
        }

        /*
         * First silly attempt, kinda slow
         *
         return that["sub"]({
         "n": num["n"] * Math.floor((this.n / this.d) / (num.n / num.d)),
         "d": num["d"],
         "s": this["s"]
         });*/

        /*
         * New attempt: a1 / b1 = a2 / b2 * q + r
         * => b2 * a1 = a2 * b1 * q + b1 * b2 * r
         * => (b2 * a1 % a2 * b1) / (b1 * b2)
         */
        return new Fraction(this["s"] * P["d"] * this["n"] % (P["n"] * this["d"]), P["d"] * this["d"]);
      },

      /**
       * Calculates the fractional gcd of two rational numbers
       *
       * Ex: new Fraction(5,8).gcd(3,7) => 1/56
       */
      "gcd": function gcd(a, b) {

        parse(a, b);

        // gcd(a / b, c / d) = gcd(a, c) / lcm(b, d)

        return new Fraction(_gcd(P["n"], this["n"]), P["d"] * this["d"] / _gcd(P["d"], this["d"]));
      },

      /**
       * Calculates the fractional lcm of two rational numbers
       *
       * Ex: new Fraction(5,8).lcm(3,7) => 15
       */
      "lcm": function lcm(a, b) {

        parse(a, b);

        // lcm(a / b, c / d) = lcm(a, c) / gcd(b, d)

        if (P["n"] === 0 && this["n"] === 0) {
          return new Fraction();
        }
        return new Fraction(P["n"] * this["n"] / _gcd(P["n"], this["n"]), _gcd(P["d"], this["d"]));
      },

      /**
       * Calculates the ceil of a rational number
       *
       * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
       **/
      "ceil": function ceil(places) {

        places = Math.pow(10, places || 0);

        if (isNaN(this["n"]) || isNaN(this["d"])) {
          return new Fraction(NaN);
        }
        return new Fraction(Math.ceil(places * this["s"] * this["n"] / this["d"]), places);
      },

      /**
       * Calculates the floor of a rational number
       *
       * Ex: new Fraction('4.(3)').floor() => (4 / 1)
       **/
      "floor": function floor(places) {

        places = Math.pow(10, places || 0);

        if (isNaN(this["n"]) || isNaN(this["d"])) {
          return new Fraction(NaN);
        }
        return new Fraction(Math.floor(places * this["s"] * this["n"] / this["d"]), places);
      },

      /**
       * Rounds a rational numbers
       *
       * Ex: new Fraction('4.(3)').round() => (4 / 1)
       **/
      "round": function round(places) {

        places = Math.pow(10, places || 0);

        if (isNaN(this["n"]) || isNaN(this["d"])) {
          return new Fraction(NaN);
        }
        return new Fraction(Math.round(places * this["s"] * this["n"] / this["d"]), places);
      },

      /**
       * Gets the inverse of the fraction, means numerator and denumerator are exchanged
       *
       * Ex: new Fraction([-3, 4]).inverse() => -4 / 3
       **/
      "inverse": function inverse() {

        return new Fraction(this["s"] * this["d"], this["n"]);
      },

      /**
       * Calculates the fraction to some integer exponent
       *
       * Ex: new Fraction(-1,2).pow(-3) => -8
       */
      "pow": function pow(m) {

        if (m < 0) {
          return new Fraction(Math.pow(this['s'] * this["d"], -m), Math.pow(this["n"], -m));
        } else {
          return new Fraction(Math.pow(this['s'] * this["n"], m), Math.pow(this["d"], m));
        }
      },

      /**
       * Check if two rational numbers are the same
       *
       * Ex: new Fraction(19.6).equals([98, 5]);
       **/
      "equals": function equals(a, b) {

        parse(a, b);
        return this["s"] * this["n"] * P["d"] === P["s"] * P["n"] * this["d"]; // Same as compare() === 0
      },

      /**
       * Check if two rational numbers are the same
       *
       * Ex: new Fraction(19.6).equals([98, 5]);
       **/
      "compare": function compare(a, b) {

        parse(a, b);
        var t = this["s"] * this["n"] * P["d"] - P["s"] * P["n"] * this["d"];
        return (0 < t) - (t < 0);
      },

      /**
       * Check if two rational numbers are divisible
       *
       * Ex: new Fraction(19.6).divisible(1.5);
       */
      "divisible": function divisible(a, b) {

        parse(a, b);
        return !(!(P["n"] * this["d"]) || this["n"] * P["d"] % (P["n"] * this["d"]));
      },

      /**
       * Returns a decimal representation of the fraction
       *
       * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183
       **/
      'valueOf': function valueOf() {

        return this["s"] * this["n"] / this["d"];
      },

      /**
       * Returns a string-fraction representation of a Fraction object
       *
       * Ex: new Fraction("1.'3'").toFraction() => "4 1/3"
       **/
      'toFraction': function toFraction(excludeWhole) {

        var whole,
            str = "";
        var n = this["n"];
        var d = this["d"];
        if (this["s"] < 0) {
          str += '-';
        }

        if (d === 1) {
          str += n;
        } else {

          if (excludeWhole && (whole = Math.floor(n / d)) > 0) {
            str += whole;
            str += " ";
            n %= d;
          }

          str += n;
          str += '/';
          str += d;
        }
        return str;
      },

      /**
       * Returns a latex representation of a Fraction object
       *
       * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
       **/
      'toLatex': function toLatex(excludeWhole) {

        var whole,
            str = "";
        var n = this["n"];
        var d = this["d"];
        if (this["s"] < 0) {
          str += '-';
        }

        if (d === 1) {
          str += n;
        } else {

          if (excludeWhole && (whole = Math.floor(n / d)) > 0) {
            str += whole;
            n %= d;
          }

          str += "\\frac{";
          str += n;
          str += '}{';
          str += d;
          str += '}';
        }
        return str;
      },

      /**
       * Returns an array of continued fraction elements
       *
       * Ex: new Fraction("7/8").toContinued() => [0,1,7]
       */
      'toContinued': function toContinued() {

        var t;
        var a = this['n'];
        var b = this['d'];
        var res = [];

        do {
          res.push(Math.floor(a / b));
          t = a % b;
          a = b;
          b = t;
        } while (a !== 1);

        return res;
      },

      /**
       * Creates a string representation of a fraction with all digits
       *
       * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
       **/
      'toString': function toString() {

        var g;
        var N = this["n"];
        var D = this["d"];

        if (isNaN(N) || isNaN(D)) {
          return "NaN";
        }

        if (!Fraction['REDUCE']) {
          g = _gcd(N, D);
          N /= g;
          D /= g;
        }

        var dec = 15; // 15 = decimal places when no repitation

        var cycLen = cycleLen(N, D); // Cycle length
        var cycOff = cycleStart(N, D, cycLen); // Cycle start

        var str = this['s'] === -1 ? "-" : "";

        str += N / D | 0;

        N %= D;
        N *= 10;

        if (N) str += ".";

        if (cycLen) {

          for (var i = cycOff; i--;) {
            str += N / D | 0;
            N %= D;
            N *= 10;
          }
          str += "(";
          for (var i = cycLen; i--;) {
            str += N / D | 0;
            N %= D;
            N *= 10;
          }
          str += ")";
        } else {
          for (var i = dec; N && i--;) {
            str += N / D | 0;
            N %= D;
            N *= 10;
          }
        }
        return str;
      }
    };

    if (typeof undefined === "function" && undefined["amd"]) {
      undefined([], function () {
        return Fraction;
      });
    } else {
      module["exports"] = Fraction;
    }
  })(commonjsGlobal);
});

var fractionConversion = {
  toDecimal: function toDecimal(value) {
    return new fraction(value).valueOf();
  },
  toFractional: function toFractional(value) {
    var fraction$$1 = new fraction(value);
    var numerator = fraction$$1.n;
    var denominator = fraction$$1.d;

    return numerator + '/' + denominator;
  }
};

var oddsConversion = {
  toDecimal: function toDecimal(_ref) {
    var decimal = _ref.decimal,
        fractional = _ref.fractional;

    if (decimal) {
      return decimal;
    }

    return 1.0 + fractionConversion.toDecimal(fractional);
  },
  toFractional: function toFractional(_ref2) {
    var decimal = _ref2.decimal,
        fractional = _ref2.fractional;

    if (fractional) {
      return fractional;
    }

    return fractionConversion.toFractional(decimal - 1);
  }
};

function bet(stake, odds) {
  return stake * (odds - 1) + stake;
}

function single(_ref) {
  var stake = _ref.stake,
      odds = _ref.odds,
      terms = _ref.terms,
      _ref$ew = _ref.ew,
      ew = _ref$ew === undefined ? false : _ref$ew,
      _ref$placeStake = _ref.placeStake,
      placeStake = _ref$placeStake === undefined ? 0 : _ref$placeStake;

  var decimalTerms = fractionConversion.toDecimal(terms);
  var decimalOdds = oddsConversion.toDecimal(odds);
  var newPlaceStake = ew && placeStake === 0 ? stake : placeStake;
  var placeReturn = ew ? bet(newPlaceStake, (decimalOdds - 1) * decimalTerms + 1) : 0;
  var winReturn = bet(stake, decimalOdds);

  return {
    win: winReturn,
    place: placeReturn,
    total: winReturn + placeReturn
  };
}

function calculateAccumulator(selections, stake, ew) {
  var idx = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var place = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

  var sel = selections[idx];
  var res = single({
    stake: stake,
    ew: ew,
    odds: sel.odds,
    terms: sel.terms,
    placeStake: place
  });

  if (idx + 1 === selections.length) {
    return res.total;
  }

  return calculateAccumulator(selections, res.win, ew, idx + 1, res.place || 0);
}

function accumulator(_ref2) {
  var selections = _ref2.selections,
      stake = _ref2.stake,
      ew = _ref2.ew,
      idx = _ref2.idx,
      place = _ref2.place;

  return calculateAccumulator(selections, stake, ew, idx, place);
}

function calculateMultiple(selections, stake) {
  var ew = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var fullCover = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var count = selections.length;
  var start = fullCover ? 1 : 2;
  var allCombos = [];

  for (var i = start; i <= count; i += 1) {
    allCombos = allCombos.concat(combinations(selections, i));
  }

  var totalReturn = allCombos.reduce(function (acc, selection) {
    return acc + calculateAccumulator(selection, stake, ew);
  }, 0);

  return totalReturn;
}

function multiple(_ref3) {
  var selections = _ref3.selections,
      stake = _ref3.stake,
      ew = _ref3.ew,
      fullCover = _ref3.fullCover;

  return calculateMultiple(selections, stake, ew, fullCover);
}

function effectiveOdds(selections) {
  var decimalOdds = selections.reduce(function (acc, selection) {
    return acc * oddsConversion.toDecimal(selection.odds);
  }, 1);

  var fractionalOdds = oddsConversion.toFractional({ decimal: decimalOdds });

  return { decimal: decimalOdds, fractional: fractionalOdds };
}

export { single, accumulator, multiple, effectiveOdds };
