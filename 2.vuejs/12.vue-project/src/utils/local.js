export const getLocal = (key) => {
  let value = localStorage.getItem(key) || "";
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

export const setLocal = (key, value) => {
  if (typeof value === "object") value = JSON.stringify(value);
  localStorage.setItem(key, value);
};
