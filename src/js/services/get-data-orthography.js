/**
 * Get Sentences Count
 */
const getDataOrthography = function (str) {

  var orthography = 0;

  /**
   * Orfography
   * API: https://languagetool.org/http-api/swagger-ui/#/default
   */


  // fetch("https://languagetool.org/api/v2/check", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     data: {
  //       text: 'dsfsdfsdfdsf',
  //       language: 'auto',
  //       enabledOnly: false
  //     },
  //     body: "text=ddsfdsfsdfdssdf&language=auto&enabledOnly=false",
  //   }).then((response) => response.json())
  //   .then((data) => {
  //     var matches = data.matches;
  //     var matchesLength = matches.length;

  //     if (matchesLength > 0) {
  //       orthography = matchesLength;
  //     }

  //     return orthography;
  //   })
  //   .catch((error) => {
  //     return 0;
  //   });

}

export default getDataOrthography;