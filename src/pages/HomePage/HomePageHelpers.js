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

export const replaceTabId = (htmlString) => {
  return htmlString.replace(
    /id="mantine-[a-z0-9]+-tab-(all|active|completed|target)"/g,
    (match, p1) => `id="mantine-mockedId-tab-${p1}"`
  );
};

export const replaceMenuTargetId = (htmlString) => {
  return htmlString.replace(
    /id="mantine-[a-z0-9]+-(target)"/g,
    (match, p1) => `id="mantine-mockedId-${p1}"`
  );
};

export const replaceDropdownTargetId = (htmlString) => {
  return htmlString.replace(
    /id="mantine-[a-z0-9]+-(dropdown)"/g,
    (match, p1) => `id="mantine-mockedId-${p1}"`
  );
};

export const replaceDataFocusId = (htmlString) => {
  return htmlString.replace(
    /data-focus-id="mantine-[a-z0-9]+"/g,
    'data-focus-id="mantine-mockedId"'
  );
};

export const replaceAriaLabelledBy = (htmlString) => {
  return htmlString.replace(
    /aria-labelledby="mantine-[a-z0-9]+-target"/g,
    'aria-labelledby="mantine-mockedId-target"'
  );
};

export const replaceAriaControls = (htmlString) => {
  return htmlString.replace(
    /aria-controls="mantine-[a-z0-9]+-dropdown"/g,
    'aria-controls="mantine-mockedId-dropdown"'
  );
};

export const replaceAllRandomGeneratedIds = (htmlString) => {
  let result = replaceTabId(htmlString);
  result = replaceMenuTargetId(result);
  result = replaceDropdownTargetId(result);
  result = replaceDataFocusId(result);
  result = replaceAriaLabelledBy(result);
  result = replaceAriaControls(result);

  return result;
};
