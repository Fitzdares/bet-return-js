# bet-return-js

## Installation
`> npm install bet-return-js`

## Usage
```
import { single, accumulator, multiple, effectiveOdds } from 'bet-return-js';
```

### Single
```
single({ stake: 10, odds: { decimal: 5 }, terms: '1/4' });
// $> { win: 50, place: 0, total: 50 }

single({ stake: 10, odds: { fractional: '4/1' }, terms: '1/4' });
// $> { win: 50, place: 0, total: 50 }

single({ stake: 10, odds: { decimal: 5 }, terms: '1/4', ew: true });
// $> { win: 50, place: 20, total: 70 }
```

### Accumulator
```
accumulator({
  selections: [
    { stake: 10, odds: { decimal: 5 }, terms: '1/4' },
    { stake: 20, odds: { decimal: 6 }, terms: '1/2' }
  ],
  stake: 5,
  ew: false
};
// $> 150

accumulator({
  selections: [
    { stake: 10, odds: { decimal: 5 }, terms: '1/4' },
    { stake: 10, odds: { decimal: 5 }, terms: '1/4' }
  ],
  stake: 10,
  ew: true
};
// $> 290
```

### Multiple
```
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
```

### Effective Odds
```
effectiveOdds(
  [
    { stake: 10, odds: { fractional: '17/2' }, terms: '1/4' },
    { stake: 10, odds: { fractional: '20/1' }, terms: '1/4' },
    { stake: 10, odds: { fractional: '2/1' }, terms: '1/4' }
  ]
);
// $> { decimal: 598.5, fractional: '1195/2' }
```
