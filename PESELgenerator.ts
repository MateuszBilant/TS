type pesel = {
  dateNumbers: string;
  serialNumber: string;
  genderFlag: string;
  controlNumber: string;
};

const MALE_NUMBERS = [1, 3, 5, 7, 9];

const FEMALE_NUMBERS = [0, 2, 4, 6, 8];

const generateEmptyPesel = () => {
  return {
    dateNumbers: "",
    serialNumber: "",
    genderFlag: "",
    controlNumber: "",
  };
};

const generateRandomNumber = (min = 0, max = 9) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const peselGenerator = (
  dateOfBirth: string | Date,
  genderFlag = "Male" || "Female",
  getRandomNumber: () => number,
  getRandomGenderNumber: (array: number[]) => string
) => {
  const handledDoB: Date = handleDateOfBirth(dateOfBirth);

  const pesel: pesel = generateEmptyPesel();

  pesel.dateNumbers = generateNumbersFromDoB(handledDoB);
  pesel.serialNumber = generateSerialNumbers(getRandomNumber);
  pesel.genderFlag =
    genderFlag === "Male"
      ? getRandomGenderNumber(MALE_NUMBERS)
      : getRandomGenderNumber(FEMALE_NUMBERS);
  pesel.controlNumber = generateControlNumber(
    pesel.dateNumbers,
    pesel.serialNumber,
    pesel.genderFlag
  );
  const generatedPesel = Object.values(pesel).join("");
  return generatedPesel;
};

const generateNumbersFromDoB = (date: Date): string => {
  const generatedYearFromDoB = date.getFullYear().toString();
  const generatedMonthFromDoB = date.getMonth().toString();
  const generatedDayFromDoB = date.getDate().toString();
  const yearNumbers = generatedYearFromDoB.substring(2, 4);
  const monthNumbers = generateMonthNumber(
    generatedYearFromDoB,
    Number(generatedMonthFromDoB)
  );
  const dayNumbers =
    Number(generatedDayFromDoB) < 10
      ? "0" + generatedDayFromDoB
      : generatedDayFromDoB;
  return yearNumbers + monthNumbers + dayNumbers;
};

const generateSerialNumbers = (getRandomNumber: () => number): string => {
  const serialNumbers =
    getRandomNumber().toString() +
    getRandomNumber().toString() +
    getRandomNumber().toString();
  return serialNumbers;
};

const generateGenderNumber = (array: number[]): string => {
  const genderNumber = array[generateRandomNumber(0, 4)].toString();
  return genderNumber;
};

const generateControlNumber = (
  date: string,
  serial: string,
  gender: string
): string => {
  const wagesSequence = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const peselSequence = (date + serial + gender).split("");
  const generatedSumOfNumbers = peselSequence
    .reduce(
      (controlNumber: number, peselDigit: string, index: number): number => {
        controlNumber =
          controlNumber + Number(peselDigit) * wagesSequence[index];
        return controlNumber;
      },
      0
    )
    .toString();
  const controlNumber = generatedSumOfNumbers.charAt(
    generatedSumOfNumbers.length - 1
  );
  return controlNumber === "0" ? "0" : (10 - Number(controlNumber)).toString();
};

const generateMonthNumber = (year: string, month: number) => {
  const monthNumberBasedOnYear = {
    "1800_1899": month + 80,
    "1900_1999": month,
    "2000_2099": month + 20,
    "2100_2199": month + 40,
    "2200_2299": month + 60,
  };
  const yearScopes = Object.keys(monthNumberBasedOnYear);
  const monthBasedOnYearScope = Object.values(monthNumberBasedOnYear);
  const centuryReg = new RegExp(year.substring(0, 2));
  const findProperYearScopeIndex = yearScopes.indexOf(
    Object.keys(monthNumberBasedOnYear).filter((yearScope) =>
      centuryReg.test(yearScope)
    )[0]
  );
  return monthBasedOnYearScope[findProperYearScopeIndex] < 10
    ? "0" + monthBasedOnYearScope[findProperYearScopeIndex].toString()
    : monthBasedOnYearScope[findProperYearScopeIndex].toString();
};

const handleDateOfBirth = (date: string | Date): Date => {
  if (typeof date === "string") return changeStringInputToDate(date);
  if (date instanceof Date) {
    if (date.getFullYear() < 1800 || date.getFullYear() > 2299)
      throw new Error("Use date since 1800-01-01 till year 2300.");
  }
  return date;
};

const changeStringInputToDate = (date: string) => {
  const YEAR_MONTH_DAY_REG = /([0-9]{4})\W([0-1]*[0-9]{1})\W([0-1]*[0-9]{1})/;
  const DAY_MONTH_YEAR_REG = /([0-1]*[0-9]{1})\W([0-1]*[0-9]{1})\W([0-9]{4})/;

  if (!YEAR_MONTH_DAY_REG.test(date) && !DAY_MONTH_YEAR_REG.test(date))
    throw new Error("Use date format year-month-day or day-month-year.");
  if (DAY_MONTH_YEAR_REG.test(date))
    date = date.replace(DAY_MONTH_YEAR_REG, "$3-$2-$1");
  const [year, month, day] = date
    .split(/\W/)
    .map((dateElement) => Number(dateElement));

  if (
    year < 1800 ||
    year > 2299 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    throw new Error("Incorrect data, date cannot be generated");
  }

  return new Date(year, month, day);
};
console.log(
  peselGenerator(
    "02-02-2200",
    "Male",
    generateRandomNumber,
    generateGenderNumber
  )
);
