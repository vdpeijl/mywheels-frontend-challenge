const defaultOptions: Intl.NumberFormatOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  style: "currency",
  currency: "EUR",
};

export const format = (
  value: number | string,
  options?: Intl.NumberFormatOptions
) => {
  if (typeof value === "string") {
    value = parseFloat(value);
  }

  return value.toLocaleString("nl-NL", {
    ...defaultOptions,
    ...options,
  });
};
