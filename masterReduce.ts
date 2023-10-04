const mapFn = <T>(
  array: T[],
  callback: (el: T, elInd?: number, arrFn?: T[]) => T
): T[] => {
  return array.reduce((acc: T[], curr: T, currInd?: number, arrRdFn?: T[]) => {
    // czy ja to musze oddawac do zmiennej? czy tak jest git? to jakas roznica procz dodatkowej akcji?
    acc.push(callback(curr, currInd, arrRdFn));
    return acc;
  }, []);
};
const filterFn = <T>(
  array: T[],
  callback: (el: T, elInd?: number, arrFn?: T[]) => Boolean
): T[] => {
  return array.reduce((acc: T[], curr: T, currInd?: number, arrFtFn?: T[]) => {
    if (callback(curr, currInd, arrFtFn)) acc.push(curr);
    return acc;
  }, []);
};
const everyFn = <T>(
  array: T[],
  callback: (el: T, elInd?: number, arrFn?: T[]) => Boolean
): Boolean => {
  return array.reduce(
    (acc: Boolean, curr: T, currInd: number, arrEvFn?: T[]): Boolean => {
      if (!callback(curr, currInd, arrEvFn)) return false;
      return acc;
    },
    true
  );
};
const someFn = <T>(
  array: T[],
  callback: (el: T, elInd?: number, arrFn?: T[]) => Boolean
): Boolean => {
  return array.reduce(
    (acc: Boolean, curr: T, currInd: number, arrEvFn?: T[]): Boolean => {
      if (callback(curr, currInd, arrEvFn)) return true;
      return acc;
    },
    false
  );
};
