/**
 * Get Complex Words Count
 */
const getComplexWords = (wordsList) => {
  let wordsComplexCount = 0;

  for (var key in wordsList) {
    try {
      if (!/^[A-Z]/g.test(wordsList[key])) {
        let wordSyllables = wordsList[key].match(/[aeiouy]/g).length - 1;

        if (/ing$/ig.test(wordsList[key]) || /ed$/ig.test(wordsList[key]) || /es$/ig.test(wordsList[key])) {
          wordSyllables--;
        }

        if (wordSyllables >= 3) {
          wordsComplexCount++;
        }
      }
    } catch (er) {}
  }


  return wordsComplexCount;
}

export default getComplexWords;
