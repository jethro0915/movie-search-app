import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getDataValue = (data) => {
  const result = [];
  if (data) {
    if (data.length > 1) {
      data.map((item) => {
        result.push(item.name);
      });
      return result.join(", ");
    } else {
      return data[0].name;
    }
  } else {
    return "N/A";
  }
};
