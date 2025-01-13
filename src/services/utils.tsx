import { format } from 'date-fns';

export const splitTextIntoParagraphs = (text: string, classname: string) => text.split('\n').map((line) => (
  <p key={line} className={classname}>
    {line}
  </p>
));

export const formatDate = (date: Date) => {
  const formattedDate = format(date, 'MMMM yyyy');
  const dateTime = format(date, 'yyyy-MM-dd');
  return {
    formattedDate,
    dateTime,
  };
};

export const capitalizeFirstLetter = (string: string) => {
  if (!string) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const toStarsWidth = (rating: number): string => `${Math.round(rating) * 20}%`;
