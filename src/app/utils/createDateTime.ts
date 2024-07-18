export interface ITime {
  hours: number;
  minutes: number;
}

export const createDateTime = (value: string | Date) => {
  const date = new Date(value);
  const brasiliaOffset = -3 * 60 * 60 * 1000;
  return new Date(date.getTime() + brasiliaOffset);
};

export const getNowDateTime = () => {
  return createDateTime(new Date());
};

export const getTime = (value: Date) => {
  if (!value) {
    return { hours: 0, minutes: 0 };
  }
  const datetime = createDateTime(value);
  const hours = String(datetime.getHours()).padStart(2, "0");
  const minutes = String(datetime.getMinutes()).padStart(2, "0");

  return { hours: Number(hours), minutes: Number(minutes) };
};

export const convertDateTimeToString = (datetime?: Date | string) => {
  if (!datetime || datetime === `00/00/0000 00:00`) {
    return `00/00/0000 00:00`;
  }

  const newDate = new Date(datetime);

  const year = newDate?.getFullYear();
  const month = String(newDate?.getMonth() + 1).padStart(2, "0");
  const day = String(newDate?.getDate()).padStart(2, "0");
  const hours = String(
    newDate?.toISOString().split("T")[1].slice(0, 2)
  ).padStart(2, "0");
  const minutes = String(newDate?.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
