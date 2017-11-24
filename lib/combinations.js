function combinations(arr, size) {
  var len = arr.length;

  if (size > len) return [];
  if (!size) return [[]];
  if (size == len) return [arr];

  return arr.reduce(function (acc, val, i) {
    var res = combinations(arr.slice(i + 1), size - 1)
    .map(function (comb) { return [val].concat(comb); });

    return acc.concat(res);
  }, []);
}

module.exports = {
  combinations
}
