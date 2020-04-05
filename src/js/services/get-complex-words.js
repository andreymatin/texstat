/**
 * Get Quality
 */
const getComplexWords = function (wordsList) {
  var wordsComplexCount = 0;

  for (var key in wordsList) {
    try {
      if (!/^[A-Z]/g.test(wordsList[key])) {
        var wordSyllables = wordsList[key].match(/[aeuoi]/g).length - 1;

        if (/ing$/ig.test(wordsList[key]) || /ed$/ig.test(wordsList[key]) || /es$/ig.test(wordsList[key])) {
          wordSyllables--;
        }

        if (wordSyllables >= 3) {
          wordsComplexCount++;
        }
      }
    } catch (er) {
      wordsComplexCount = 0;
    }
  }

  return wordsComplexCount;
}

export default getComplexWords;