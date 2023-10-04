export const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
export const data1 = [1, 2, 3];
const settings = { actualPageIdx: -1, entriesOnPage: 1 };
const settings1 = { actualPageIdx: 4, entriesOnPage: 4 };
const settings2 = { actualPageIdx: 12, entriesOnPage: 4 };

type settingType = {
  actualPageIdx: number;
  entriesOnPage: number;
};

export const paginateArray = (
  dataEntries: number[],
  { actualPageIdx, entriesOnPage }: settingType
) => {
  validate(dataEntries, { actualPageIdx, entriesOnPage });
  if (entriesOnPage > dataEntries.length) return dataEntries;
  return dataEntries.slice(
    actualPageIdx * entriesOnPage,
    actualPageIdx * entriesOnPage + entriesOnPage
  );
};
const validate = (
  arr: number[],
  { actualPageIdx, entriesOnPage }: settingType
) => {
  if (areValidEntriesSettings(entriesOnPage))
    throw new Error("Wrong number of entries");
  if (isValidIndex(arr, actualPageIdx))
    throw new Error("This index does not exist.");
  if (isIndexInRange(arr, actualPageIdx, entriesOnPage))
    throw new Error("Index out of the range");
};

const isValidIndex = (arr: number[], pageIndex: number) => {
  return pageIndex >= arr.length || !Number.isInteger(pageIndex);
};
const areValidEntriesSettings = (entriesOnPage: number) => {
  return !Number.isInteger(entriesOnPage) || entriesOnPage < 1;
};
const isIndexInRange = (
  arr: number[],
  actualPageIdx: number,
  entriesOnPage: number
) => {
  return actualPageIdx < 0 || actualPageIdx * entriesOnPage >= arr.length;
};
console.log(data.length);
