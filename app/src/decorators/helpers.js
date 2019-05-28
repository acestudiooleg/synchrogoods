export const decorate = (target, replacement) => {
  replacement.displayName = target.name;
  return replacement;
};
