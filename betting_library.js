//stake is in pence
// £10.00 becomes 1000

//odds are a decimal
// "8/1" becomes 9.0

// terms are decimal
// "1/5" becomes 0.2

//single(stake, odds, terms) {

selections = [
  {stake: 10, odds: 5, terms: 0.25},
  {stake: 10, odds: 5, terms: 0.25},
]

selections = [
  {stake: 1, odds: 10, terms: 0.20},
  {stake: 1, odds: 7, terms: 0.25},
  {stake: 1, odds: 17, terms: 0.25},
  {stake: 1, odds: 1, terms: 0.25},
]


function single(stake, odds, terms, place_stake=0) {
  // bet is eachway but no place value exists
  if(terms && place_stake == 0) place_stake = stake;

  // console.log("place_stake", place_stake);
  let place_return = terms ? bet(place_stake, ((odds-1)*terms)+1) : 0;

  let win_return = bet(stake, odds);
  // console.log("win", win);
  // console.log("place", place);

  return {win: win_return, place: place_return, total: (win_return + place_return)};
}

function bet(stake, odds) {
  return (stake * (odds-1)) + stake;
}

function multiple(selections, stake, idx=0, place) {
  sel = selections[idx]

  res = single(stake, sel.odds, sel.terms, place)
  console.log("res", res);


  // console.log("idx", idx);
  // console.log("win", res.win);
  // console.log("place", res.place);

  if(idx+1 < selections.length) return multiple(selections, res.win, idx+1, res.place || 0)
  if(idx+1 === selections.length) return res.total
}
console.log("RESULT", multiple(selections, selections[0].stake, 0, selections[0].stake))
