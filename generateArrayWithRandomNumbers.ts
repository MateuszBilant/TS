export const generateArrayWithRandomNumbers = (
  howManyNumbers = 10,
  min = 1,
  max = 10
) => {
  validate(howManyNumbers, min, max);
  return Array.from(
    { length: howManyNumbers },
    () => Math.random() * (max - min) + min
  );
};
export const generateArrayOfArrays = (
  howManyArrays = 10,
  howManyNumbers = 10,
  min = 1,
  max = 10
) => {
  validate(howManyNumbers, min, max, howManyArrays);
  return Array.from({ length: howManyArrays }, () =>
    generateArrayWithRandomNumbers(howManyNumbers, min, max)
  );
};
const validate = (numbers: number, min: number, max: number, arrays = 1) => {
  if (arrays < 1) throw new Error("There must be at least 1 array");
  if (!Number.isInteger(arrays))
    throw new Error("Amount of arrays has to be an integer");
  if (!Number.isInteger(numbers))
    throw new Error("Amount of numbers has to be an integer");
  if (numbers < 1) throw new Error("Array must contain at least 1 number");
  if (max < min) throw new Error("Max number cannot be lower than min number");
};
