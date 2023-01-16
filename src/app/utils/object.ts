export const toNumber = <T extends Record<any, any>>(object: T): T => {
  const result: Record<any, any> = Array.isArray(object) ? [] : {};

  Object.entries(object).forEach(([key, value]) => {
    if (value === null) {
      result[key] === undefined;
    } else if (typeof value === 'object') {
      result[key] = toNumber(value);
    } else {
      result[key] = isNaN(Number(value)) ? value : Number(value);
    }
  });

  return result;
};
