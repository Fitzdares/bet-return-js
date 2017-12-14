# bet-return-js

## Installation
`> npm install bet-return-js`

## Usage
```
import { bet, single, accumulator, multiple, effectiveOdds } from 'bet-return-js';

bet(100, 5.0)
// $> 500

single({ stake: 10, odds: { decimal: 5 }, terms: '1/4' });
// $> { win: 50, place: 0, total: 50 }

single({ stake: 10, odds: { fractional: '4/1' }, terms: '1/4' });
// $> { win: 50, place: 0, total: 50 }

single({ stake: 10, odds: { decimal: 5 }, terms: '1/4', ew: true });
// $> { win: 50, place: 20, total: 70 }

multiple({
  selections: [
    { stake: 10, odds: { fractional: '4/1' }, terms: '1/4' },
    { stake: 10, odds: { fractional: '4/1' }, terms: '1/4' }
  ],
  stake: 5
});
// $> 125

multiple({
  selections: [
    { stake: 10, odds: { decimal: 5 }, terms: '1/4' },
    { stake: 10, odds: { decimal: 5 }, terms: '1/4' }
  ],
  stake: 10,
  ew: true
});
// $> 290 

multiple({
  selections: [
    { stake: 10, odds: { decimal: 5 }, terms: '1/4' },
    { stake: 10, odds: { decimal: 5 }, terms: '1/4' },
    { stake: 10, odds: { decimal: 5 }, terms: '1/4' }
  ],
  stake: 10,
  ew: false,
  fullCover: true
});
// $> 2150

multiple({
  selections: [
    { stake: 10, odds: { decimal: 5 }, terms: '1/4' },
    { stake: 10, odds: { decimal: 5 }, terms: '1/4' },
    { stake: 10, odds: { decimal: 5 }, terms: '1/4' }
  ],
  stake: 10,
  ew: true,
  fullCover: true
});
// $> 2410


