const now = new Date();
const MIN_YEAR = 1900;

export const getMyAge = (input: string | number | Date): string | number => {
  const validInput: Date | number = validate(input);
  if (typeof validInput === "number") return now.getFullYear() - validInput;
  if (validInput instanceof Date) {
    if (now.getDate() < validInput.getDate()) {
      return now.getMonth() - 1 < validInput.getMonth()
        ? now.getFullYear() - 1 - validInput.getFullYear()
        : now.getFullYear() - validInput.getFullYear();
    }
    return now.getMonth() < validInput.getMonth()
      ? now.getFullYear() - 1 - validInput.getFullYear()
      : now.getFullYear() - validInput.getFullYear();
  }
  return now.getFullYear() - validInput;
};

const validate = (input: string | number | Date) => {
  if (input instanceof Date) {
    if (input.getFullYear() < 1900 || input.getFullYear() > now.getFullYear())
      throw new Error("Use date since 1900-01-01 till today.");
  }

  if (typeof input === "number") {
    if (!Number.isInteger(input))
      throw new Error("Birth year has to be an integer");
    if (input < 1900 || input > now.getFullYear())
      throw new Error("Use date since 1900-01-01 till today.");
    return input;
  }

  if (typeof input === "string") {
    const inputReg = /([0-9]{4})\W([0-9]+)\W([0-9]+)/;
    if (!inputReg.test(input))
      throw new Error("Use date format year-month-day.");

    const [year, month, day] = input
      .split(/\W/)
      .map((dateElement) => Number(dateElement));

    if (
      year < 1900 ||
      year > now.getFullYear() ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      throw new Error("Incorrect data, date cannot be generated");
    }
  }
  return new Date(input);
};
const result1 = getMyAge(new Date(1994, 6, 30));
const result2 = getMyAge("1999-10-12");
const result3 = getMyAge(2000);
console.log(result3);
