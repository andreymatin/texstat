/**
 * Lines Count
 *
 * @param {String} str
 */
const getLinesCount = function (val) {
  const linesSplit = val.split('\n');
  return linesSplit.length;
}

export default getLinesCount;