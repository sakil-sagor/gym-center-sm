export const isTimeOverlap = (
  newStart: string,
  newEnd: string,
  existingStart: string,
  existingEnd: string,
) => {
  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const newStartMin = toMinutes(newStart);
  const newEndMin = toMinutes(newEnd);
  const existingStartMin = toMinutes(existingStart);
  const existingEndMin = toMinutes(existingEnd);

  return newStartMin < existingEndMin && existingStartMin < newEndMin;
};
