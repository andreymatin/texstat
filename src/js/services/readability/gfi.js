'use strict'

/**
 * Gunning fog index
 *
 * https://en.wikipedia.org/wiki/Gunning_fog_index
 */
export const getGfi = (words, sentences, complexWords) => {

  const complexWordWeight = 100
  const weight = 0.4

  // 04 * ((words / sentences) + (100 * (complex words / words)))

  let val = (weight * ((words / sentences) + (complexWordWeight * (complexWords / words)))).toFixed(2);
  if (! val) {
    val = 0;
  }

  return val;

}


/*

Fog Index 	Reading level by grade
17 	College graduate
16 	College senior
15 	College junior
14 	College sophomore
13 	College freshman
12 	High school senior
11 	High school junior
10 	High school sophomore
9 	High school freshman
8 	Eighth grade
7 	Seventh grade
6 	Sixth grade

*/

export const getGfiResult = (index) => {
  if (index <= 17  && index > 16) {
    return 'College graduate';
  }

  if (index <= 16  && index > 15) {
    return 'College senior';
  }

  if (index <= 15  && index > 14) {
    return 'College junior';
  }

  if (index <= 14  && index > 13) {
    return 'College sophomore';
  }

  if (index <= 13  && index > 12) {
    return 'College freshman';
  }

  if (index <= 12  && index > 11) {
    return 'High school senior';
  }

  if (index <= 11  && index > 10) {
    return 'High school junior';
  }

  if (index <= 10  && index > 9) {
    return 'High school sophomore';
  }

  if (index <= 9  && index > 8) {
    return 'High school freshman';
  }

  if (index <= 8  && index > 7) {
    return 'Eighth grade';
  }

  if (index <= 7  && index > 6) {
    return 'Seventh grade';
  }

  if (index <= 6 ) {
    return 'Sixth grade';
  }



  return val;

}



