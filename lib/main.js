// stake is in pence
// £10.00 becomes 1000

// odds are decimal
// "8/1" becomes 9.0

// terms are decimal
// "1/5" becomes 0.2

import { combinations } from './combinations.js';

function bet(stake, odds) {
  return (stake * (odds - 1)) + stake;
}

function single(stake, odds, terms, ew, placeStake = 0) {
  const newPlaceStake = ew && placeStake === 0 ? stake : placeStake;

  const placeReturn = ew ? bet(newPlaceStake, ((odds - 1) * terms) + 1) : 0;

  const winReturn = bet(stake, odds);

  return { win: winReturn, place: placeReturn, total: (winReturn + placeReturn) };
}

function accumulator(selections, stake, ew, idx = 0, place = 0) {
  const sel = selections[idx];

  const res = single(stake, sel.odds, sel.terms, ew, place);

  if (idx + 1 === selections.length) return res.total;

  return accumulator(selections, res.win, ew, idx + 1, res.place || 0);
}

function multiple(selections, stake, ew, fullCover) {
  const count = selections.length;
  const start = fullCover ? 1 : 2;
  let allCombos = [];

  // get all combinations in an array
  for (let i = start; i <= count; i++) {
    allCombos = allCombos.concat(combinations(selections, i));
  }

  // sum all the individual combination accumulators
  return allCombos.reduce((acc, bet) => {
    return acc + accumulator(bet, stake, ew);
  }, 0)
}

module.exports = {
  single,
  accumulator,
  multiple
}

