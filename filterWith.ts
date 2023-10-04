import { data } from "./data";
type Person = {
  _id: string;
  age: number;
  eyeColor: string;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  tags: string[];
  friends: { id: number; name: string }[];
};
type arr = string | number[] | { id: number; name: string }[];

export const filterWith = <T>(arr: T[], phrase: string): T[] => {
  if (phrase.length < 3) return [];
  const stringToRegExp = new RegExp(phrase, "i");
  return Object.values(arr).filter((element) => {
    if (element instanceof Object)
      return filterWith(Object.values(element), phrase).length > 0;
    if (typeof element === "string" || typeof element === "number")
      return stringToRegExp.test(element.toString());
    return false;
  });
};
