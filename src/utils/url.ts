export const fuzzyCompareUrl = (url1: string, url2: string) => {
  url1 = url1.trim().toLowerCase();
  url2 = url2.trim().toLowerCase();

  return (
    url1 === url2 ||
    `${url1}/` === url2 ||
    url1 === `${url2}/`
  );
};
