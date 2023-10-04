const generateMonthNumber = (year: string, month: number) => {
  const monthNumberBasedOnYear = {
    "1800_1899": month + 80,
    "1900_1999": month + 0,
    "2000_2099": month + 20,
    "2100_2199": month + 40,
    "2200_2299": month + 60,
  };
  const monthNumberBasedOnYearKeys = Object.keys(monthNumberBasedOnYear);
  const monthNumberBasedOnYearValues = Object.values(monthNumberBasedOnYear);
  const centuryReg = new RegExp(year.substring(0, 2));
  const findProperYearScopeIndex = monthNumberBasedOnYearKeys.indexOf(
    Object.keys(monthNumberBasedOnYear)
      .filter((yearScope) => centuryReg.test(yearScope))
      .toString()
  );
  return Number(monthNumberBasedOnYearValues[findProperYearScopeIndex]) < 10
    ? "0" + monthNumberBasedOnYearValues[findProperYearScopeIndex]
    : monthNumberBasedOnYearValues[findProperYearScopeIndex];
};
