export const showDate = (dateString: string = '2013-04-28T00:00:00.000Z') => {
  const date = new Date(dateString);
  
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  
  return date.toLocaleString('en-US', options);
};
