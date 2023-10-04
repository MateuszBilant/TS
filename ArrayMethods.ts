const forEachFn = <T>(
  array: T[],
  callback: (arg: T, ind?: Number, arrFn?: T[]) => void
) => {
  for (let i = 0; i < array.length; i++) callback(array[i], i, array);
};
const mapFn = <T, K>(
  array: T[],
  callback: (arg: T, ind?: Number, arrFn?: T[]) => T
): (T | K)[] => {
  const result: (T | K)[] = [];
  for (let i = 0; i < array.length; i++)
    result.push(callback(array[i], i, array));
  return result;
};

function* entriesFn<T>(array: T[]): Iterable<(number | T)[]> {
  for (let i = 0; i < array.length; i++) {
    yield [i, array[i]];
  }
}

const filterFn = <T>(
  array: T[],
  callback: (arg: T, ind?: Number, arrFn?: T[]) => T
): T[] => {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) result.push(array[i]);
  }
  return result;
};
const reduceFn = <T>(
  array: T[],
  callback: (acc: T, curr: T, currInd?: number, arrFn?: T[]) => T,
  initial?: T
): T => {
  let result: T;
  result = initial ? initial : array[0];
  for (let i = initial ? 0 : 1; i < array.length; i++) {
    result = callback(result, array[i], i, array);
  }
  return result;
};

const everyFn = <T>(
  array: T[],
  callback: (el: T, ind?: Number, arrFn?: T[]) => Boolean
): Boolean => {
  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i], i, array)) {
      return false;
    }
  }
  return true;
};

const someFn = <T>(
  array: T[],
  callback: (el: T, ind?: Number, arrFn?: T[]) => Boolean
): Boolean => {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) return true;
  }
  return false;
};
