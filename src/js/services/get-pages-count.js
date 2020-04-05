/**
 * Pages Count
 */
const getPagesCount = function (linesCount, linesPerPage) {
  const pagesCount = Math.round(linesCount / linesPerPage);
  if (! pagesCount) return 1;
  return pagesCount;
}

export default getPagesCount;