export const format = (value: number | string) => {
  if (typeof value === "string") {
    value = parseFloat(value);
  }

  return value.toLocaleString("nl-NL", {
    style: "currency",
    currency: "EUR",
  });
};
