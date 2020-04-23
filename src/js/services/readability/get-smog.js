/**
 * Get Smog
 *
 * https://en.wikipedia.org/wiki/SMOG
 */
const getSmog = (wordsComplexCount, sentencesCount) => {

  let smogVal = ((1.043 * Math.sqrt(wordsComplexCount * (30 / sentencesCount))) + 3.1291).toFixed(2);
  if (! smogVal) {
    smogVal = 0;
  }

  return smogVal;
}

export default getSmog;
