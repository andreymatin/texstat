/**
 * Get CLI
 */
const getCli = function (symbolsCount, wordsCount, sentencesCount) {
  var cliVal = (5.88 * (symbolsCount / wordsCount) - 29.6 * (sentencesCount / wordsCount) - 15.8).toFixed(2);
  if (isNaN(cliVal)) {
    cliVal = 0;
  }

  return cliVal;
}

export default getCli;