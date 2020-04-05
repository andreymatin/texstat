/**
 * Words List
 */
const getWordsList = function (str) {
  return str.replace(/\\n/g, " ").match(/[\w\u0430-\u044f]{1,}/ig);
}

export default getWordsList;