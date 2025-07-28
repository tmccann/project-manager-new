export const isValidText = (value: string) => {
  const trimmed = value.trim();
  return trimmed.length >= 4 ? trimmed : null;
};

export const isValidDate = (value: string): string | null => {
  const enteredDate = new Date(value);
  if (isNaN(enteredDate.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return enteredDate >= today ? value : null;
};
