/**
 * Get Water
 */
const getWater = function (wordsStopLength, wordsImportantLength) {
  var waterLength = ((wordsStopLength * 100) / wordsImportantLength).toFixed(2);
  if (isNaN(waterLength)) {
    waterLength = 0;
  }

  return waterLength;
}

export default getWater;