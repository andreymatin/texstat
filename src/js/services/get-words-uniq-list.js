/**
 * Words Uniq List
 */
const getWordsUniqList = function (str) {
  var wordsUniqList = str.replace(/\\n/g, ' ').match(/[\w\u0430-\u044f]{3,}/ig);
  return wordsUniqList;
}

export default getWordsUniqList;