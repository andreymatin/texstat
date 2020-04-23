/**
 * Get CLI
 *
 * https://en.wikipedia.org/wiki/Coleman%E2%80%93Liau_index
 */
const getCli = (symbolsCount, wordsCount, sentencesCount) => {

  let cliVal = (5.88 * (symbolsCount / wordsCount) - 29.6 * (sentencesCount / wordsCount) - 15.8).toFixed(2);
  if (! cliVal) {
    cliVal = 0;
  }

  return cliVal;
}

export default getCli;
