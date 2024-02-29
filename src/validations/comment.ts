export const commentValidation = {
  content: (value: string) => {
    if (value.length === 0) return false;
    if (value.length >= 1000) return false;

    return true;
  },
};
