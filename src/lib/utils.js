import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getArrayValue = (data) => {
  const result = [];
  if (data !== undefined) {
    if (data.length === 0) {
      return "N/A";
    } else {
      if (data.length > 1) {
        data.map((item) => {
          result.push(item.name);
        });
        return result.join(", ");
      } else {
        return data[0].name;
      }
    }
  } else {
    return "N/A";
  }
};

export const getStringValue = (data) => {
  if (data === null || data === "" || data === undefined) {
    return "N/A";
  } else {
    return data;
  }
};
