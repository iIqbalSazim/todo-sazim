export function findIndexWithId(data, id) {
  return data.findIndex((element) => element.id === id);
}

export function formatCompletedAt(dateString) {
  const date = new Date(dateString);

  let currentTime =
    date.toLocaleTimeString().slice(0, 4) + date.toLocaleTimeString().slice(7);
  let currentDate = `${currentTime} | ${date.toDateString()}`;
  return currentDate;
}

export function formatDueDate(dateString) {
  const date = new Date(dateString);
  return date.toDateString().slice(0, 15);
}
