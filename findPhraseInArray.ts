export const inputData: string[] = [
  "Ale",
  "mi",
  "potak",
  "się",
  "nie",
  "chce",
  "no",
  "tak",
  "trudno",
  "zrobię",
  "mogę",
  "jutro",
  "bo",
  "Tak",
  "tak",
];

export const findPhraseInArray = (
  array: string[],
  phrase: string,
  isExactMatch = false
): [number, string][] | string => {
  if (phrase === "") return "The array doesn't contain the searching phrase";
  if (isExactMatch) {
    return findPhraseInArrayCaseSensetive(array, phrase).length > 0
      ? findPhraseInArrayCaseSensetive(array, phrase)
      : "The array doesn't contain the searching phrase";
  }
  return findPhraseInArrayCaseInSensetive(array, phrase).length > 0
    ? findPhraseInArrayCaseInSensetive(array, phrase)
    : "The array doesn't contain the searching phrase";
};
const findPhraseInArrayCaseSensetive = (array: string[], phrase: string) => {
  return array.reduce((acc: [number, string][], curr: string, i: number) => {
    if (curr.includes(phrase)) acc.push([i, curr]);
    return acc;
  }, []);
};
const findPhraseInArrayCaseInSensetive = (array: string[], phrase: string) => {
  const formattedPhrase = new RegExp(phrase, "i");
  return array.reduce((acc: [number, string][], curr: string, i: number) => {
    if (formattedPhrase.test(curr)) acc.push([i, curr]);
    return acc;
  }, []);
};
console.log(findPhraseInArray(inputData, "Tak", false));
