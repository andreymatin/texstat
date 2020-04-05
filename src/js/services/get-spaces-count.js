/**
 * Get Sentences Count
 */
const getSpacesCount = function (str) {

  var spacesLength = 0;

  try {
    spacesLength = str.match(/ /g).length;
  } catch (err) {
    spacesLength = 0;
  }

  return spacesLength;
}

export default getSpacesCount;