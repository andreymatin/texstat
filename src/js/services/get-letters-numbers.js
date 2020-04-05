/**
 * Get Quality
 */
const getLettersNumbers = function (str) {
  var countLettersAndNumbers = 0;
  try {
    countLettersAndNumbers = str.match(/[A-Za-z0-9]/g).length;
  } catch (err) {
    countLettersAndNumbers = 0;
  }

  return countLettersAndNumbers;
}

export default getLettersNumbers;