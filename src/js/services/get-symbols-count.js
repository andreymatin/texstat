/**
 * Symbols Count
 */
const getSymbolsCount = function (str) {
  return str.replace(/ /g, '').length;
}

export default getSymbolsCount;