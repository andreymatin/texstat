/**
 * Book Lines Count
 *
 * @param {String} str
 */
const getBookLinesCount = function (wordsCount, worsAtLine) {
  var linesBookCount = Math.round(wordsCount / worsAtLine);
  if (isNaN(linesBookCount)) {
    linesBookCount = 0;
  }

  return linesBookCount;
}

export default getBookLinesCount;