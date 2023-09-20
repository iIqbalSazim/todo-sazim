export function findIndexWithId(data, id) {
  return data.findIndex((element) => element.id === id);
}

export function generateCurrentTimeAndDate(date) {
  let currentTime =
    date.toLocaleTimeString().slice(0, 4) + date.toLocaleTimeString().slice(7);
  let currentDate = `${currentTime} | ${date.toDateString()}`;
  return currentDate;
}

export function formatDueDate(date) {
  return date.toDateString().slice(0, 15);
}
