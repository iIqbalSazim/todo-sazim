export function findIndexWithId(data, id) {
  return data.findIndex((element) => element.id === id);
}

export function generateCurrentTimeAndDate() {
  let date = new Date();
  let currTime =
    date.toLocaleTimeString().slice(0, 4) + date.toLocaleTimeString().slice(7);
  let createdAt = `${currTime} | ${date.toDateString()}`;
}
