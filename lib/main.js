import combinations from './combinations';
import { oddsConversion, fractionalConversion as termsConversion } from './conversions';

function bet(stake, odds) {
  return (stake * (odds - 1)) + stake;
}

function single({
  stake, odds, terms, ew = false, placeStake = 0
}) {
  const decimalTerms = termsConversion.toDecimal(terms);
  const decimalOdds = oddsConversion.toDecimal(odds);
  const newPlaceStake = ew && placeStake === 0 ? stake : placeStake;
  const placeReturn = ew ? bet(newPlaceStake, ((decimalOdds - 1) * decimalTerms) + 1) : 0;
  const winReturn = bet(stake, decimalOdds);

  return {
    win: winReturn,
    place: placeReturn,
    total: (winReturn + placeReturn)
  };
}

function calculateAccumulator(selections, stake, ew, idx = 0, place = 0) {
  const sel = selections[idx];
  const res = single({
    stake,
    ew,
    odds: sel.odds,
    terms: sel.terms,
    placeStake: place
  });

  if (idx + 1 === selections.length) {
    return res.total;
  }

  return calculateAccumulator(selections, res.win, ew, idx + 1, res.place || 0);
}

function accumulator({
  selections, stake, ew, idx, place
}) {
  return calculateAccumulator(selections, stake, ew, idx, place);
}

function calculateMultiple(selections, stake, ew = false, fullCover = false) {
  const count = selections.length;
  const start = fullCover ? 1 : 2;
  let allCombos = [];

  for (let i = start; i <= count; i += 1) {
    allCombos = allCombos.concat(combinations(selections, i));
  }

  allCombos = allCombos.reduce((acc, selection) =>
    acc + calculateAccumulator(selection, stake, ew), 0);

  return allCombos;
}

function multiple({
  selections, stake, ew, fullCover
}) {
  return calculateMultiple(selections, stake, ew, fullCover);
}

function effectiveOdds(selections) {
  return selections.reduce((acc, selection) =>
    acc * oddsConversion.toDecimal(selection.odds), 1);
}

module.exports = {
  single,
  accumulator,
  multiple,
  effectiveOdds
};
