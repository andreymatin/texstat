/**
 * Get ERT
 */
const getErt = function (wordsCount, wpm) {
  var ertVal = Math.ceil((wordsCount / wpm).toFixed(2));
  if (isNaN(ertVal)) {
    ertVal = 0;
  }
  return ertVal;
}

export default getErt;