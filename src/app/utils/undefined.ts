export const removeUndefined = <T extends Record<any, any>>(object: T): T => {
  const result: Record<any, any> = {};

  Object.entries(object).forEach(([key, value]) => {
    if (value !== undefined) {
      result[key] = value;
    }
  });

  return result;
};
