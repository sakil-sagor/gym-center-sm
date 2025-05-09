export const calculateHourDifference = (start: string, end: string): number => {
  const [startH, startM] = start.split(':').map(Number);
  const [endH, endM] = end.split(':').map(Number);

  const startInMinutes = startH * 60 + startM;
  const endInMinutes = endH * 60 + endM;

  return (endInMinutes - startInMinutes) / 60;
};
