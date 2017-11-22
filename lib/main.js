// stake is in pence
// £10.00 becomes 1000

// odds are a decimal
// "8/1" becomes 9.0

// terms are decimal
// "1/5" becomes 0.2

// single(stake, odds, terms) {

  module.exports = (function() {
    function bet(stake, odds) {
      return (stake * (odds - 1)) + stake;
    }

    function single(stake, odds, terms, placeStake = 0) {
      const newPlaceStake = terms && placeStake === 0 ? stake : placeStake;

      const placeReturn = terms ? bet(newPlaceStake, ((odds - 1) * terms) + 1) : 0;

      const winReturn = bet(stake, odds);

      return { win: winReturn, place: placeReturn, total: (winReturn + placeReturn) };
    }

    function multiple(selections, stake, idx = 0, place) {
      const sel = selections[idx];

      const res = single(stake, sel.odds, sel.terms, place);

      if (idx + 1 === selections.length) return res.total;

      return multiple(selections, res.win, idx + 1, res.place || 0);
    };

    return multiple;
  })();
