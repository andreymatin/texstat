/**
 * Get Quality
 */
const getQuality = function (waterLength) {
  var qualityLength = 0;
  if (waterLength > 0) {
    qualityLength = 100 - waterLength;
  }
  return qualityLength;
}

export default getQuality;