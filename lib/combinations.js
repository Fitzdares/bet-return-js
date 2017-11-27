function combinations(collection, size) {
  let len = collection.length;

  if (size > len) return [];
  if (!size) return [[]];
  if (size == len) return [collection];

  return collection.reduce((acc, val, i) => {
    let res = combinations(collection.slice(i + 1), size - 1)
      .map((comb) => [val].concat(comb));

    return acc.concat(res);
  }, []);
}

module.exports = {
  combinations
}