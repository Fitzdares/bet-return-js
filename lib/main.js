import combinations from './combinations';

function bet(stake, odds) {
  return (stake * (odds - 1)) + stake;
}

function single({
  stake, odds, terms, ew = false, placeStake = 0
}) {
  const newPlaceStake = ew && placeStake === 0 ? stake : placeStake;

  const placeReturn = ew ? bet(newPlaceStake, ((odds - 1) * terms) + 1) : 0;

  const winReturn = bet(stake, odds);

  return {
    win: winReturn,
    place: placeReturn,
    total: (winReturn + placeReturn)
  };
}

function accumulator(selections, stake, ew, idx = 0, place = 0) {
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

  return accumulator(selections, res.win, ew, idx + 1, res.place || 0);
}

function multiple(selections, stake, ew = false, fullCover = false) {
  const count = selections.length;
  const start = fullCover ? 1 : 2;
  let allCombos = [];

  for (let i = start; i <= count; i += 1) {
    allCombos = allCombos.concat(combinations(selections, i));
  }

  allCombos = allCombos.reduce((acc, selection) => acc + accumulator(selection, stake, ew), 0);

  return allCombos;
}

module.exports = {
  single,
  accumulator,
  multiple
};

