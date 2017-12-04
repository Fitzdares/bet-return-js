function combinations(collection, size) {
  const len = collection.length;

  if (size > len) return [];
  if (!size) return [[]];
  if (size === len) return [collection];

  return collection.reduce((acc, val, i) => {
    const res = combinations(collection.slice(i + 1), size - 1)
      .map(comb => [val].concat(comb));

    return acc.concat(res);
  }, []);
}

export default combinations;
