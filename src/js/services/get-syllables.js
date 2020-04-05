/**
 * Get Syllables
 */
const getSyllables = function (val) {
  var word = '';
  try {
    word = val.toLowerCase(); //word.downcase!
    if (word.length <= 3) {
      return 1;
    } //return 1 if word.length <= 3
    word = val.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ''); //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    word = val.replace(/^y/, ''); //word.sub!(/^y/, '')
    return word.match(/[aeiouy]{1,2}/g).length; //word.scan(/[aeiouy]{1,2}/).size
  } catch (err) {
    return 0;
  }
}

export default getSyllables;


