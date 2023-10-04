const MAX = 7;
const MIN = 4;
const range = MAX + MIN;
let i = 0;

export const aggregateIntoChunks = <T>(
  array: T[],
  generateRandomNumberInRange: (MIN: number, MAX: number) => number
): T[][] => {
  checkIfProperArray(array);
  const clonedArray: T[] = [...array];
  const result: T[][] = clonedArray.reduce((acc: T[][]) => {
    acc.push(clonedArray.splice(0, generateRandomNumberInRange(MIN, MAX)));
    return acc;
  }, []);
  return clonedArray.length > 0
    ? aggregateIntoChunks(array, generateRandomNumberInRange)
    : result;
};

const checkIfProperArray = <T>(arg: T[]) => {
  if (arg.length < MAX + MIN)
    throw new Error("Array needs at least " + range + " elements");
};

export const generateRandomNumberInRange = (MIN: number, MAX: number) =>
  Math.random() * (MAX - MIN + 1) + MIN;
