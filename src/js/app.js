/**
 * Components
 */
import componentChart from './components/component-chart.js';

/**
 * Services
 */
import getLinesCount from './services/get-lines-count';
import getPagesCount from './services/get-pages-count';
import getCharsCount from './services/get-chars-count';
import getSymbolsCount from './services/get-symbols-count';
import getWordsList from './services/get-words-list';
import getWordsCount from './services/get-words-count';
import getBookLinesCount from './services/get-lines-book-count';
import getDataStopWords from './services/get-data-stop-words';
import getWordsUniqList from './services/get-words-uniq-list';
import getImportantWords from './services/get-words-important';
import getStopWords from './services/get-words-stop';
import getWater from './services/get-water';
import getQuality from './services/get-quality';
import getSentencesList from './services/get-sentences-list';
import getSentencesCount from './services/get-sentences-count';
import getSpacesCount from './services/get-spaces-count';
import getSyllables from './services/get-syllables';

import complexityFactor from './services/complexity-factor';
import averageWordsPerSentence from './services/average-words-per-sentence';
import averageWordsLength from './services/average-words-length';
import getComplexWords from './services/get-complex-words';
import getLettersNumbers from './services/get-letters-numbers';

import {getGfi, getGfiResult} from './services/readability/gfi';
import getCli from './services/readability/get-cli';
import getAri from './services/readability/get-ari';
import getSmog from './services/readability/get-smog';
import getFk from './services/readability/get-fk';
import getFre from './services/readability/get-fre';

import getErt from './services/get-ert';
import getDataOrthography from './services/get-data-orthography';


document.addEventListener('DOMContentLoaded', function () {

  /**
   * Const
   */

  // Words / Minute
  const wpm = 180;

  // Words in the line
  const lw = 12;

  // Lines per Page
  const linesPerPage = 30;


  /**
   * Cache DOM Elements
   */
  const textarea = document.getElementById('textarea');
  var str = textarea.value;

  const lines = document.getElementById('lines');
  const pages = document.getElementById('pages');
  const chars = document.getElementById('chars');
  const symbols = document.getElementById('symbols');
  const words = document.getElementById('words');
  const wordsUniq = document.getElementById('wordsUniq');
  const wordsImportant = document.getElementById('wordsImportant');
  const wordsStop = document.getElementById('wordsStop');
  const water = document.getElementById('water');
  const quality = document.getElementById('quality');
  const sentences = document.getElementById('sentences');
  const spaces = document.getElementById('spaces');
  const syllables = document.getElementById('syllables');
  const cf = document.getElementById('cf');
  const wordsAveragePerSentence = document.getElementById('wordsAveragePerSentence');
  const wordAverageLength = document.getElementById('wordAverageLength');
  const wordsComplex = document.getElementById('wordsComplex');

  const gfi = document.getElementById('gfi');
  const gfiResult = document.getElementById('gfiResult');

  const cli = document.getElementById('cli');
  const ari = document.getElementById('ari');
  const smog = document.getElementById('smog');
  const fk = document.getElementById('fk');
  const fre = document.getElementById('fre');
  const ert = document.getElementById('ert');
  const orfography = document.getElementById('orfography');
  const linesBook = document.getElementById('linesBook');
  const check = document.getElementById('check');

  // Lines
  var linesCount = getLinesCount(str);
  lines.textContent = linesCount;

  // Pages
  var pagesCount = getPagesCount(linesCount, linesPerPage);
  pages.textContent = pagesCount;

  // Chars
  var charsCount = getCharsCount(str);
  chars.textContent = charsCount;

  // Symbols
  var symbolsCount = getSymbolsCount(str);
  symbols.textContent = symbolsCount;

  // Words List
  var wordsList = getWordsList(str);

  // Words Count
  var wordsCount = getWordsCount(wordsList);
  words.textContent = wordsCount;

  // Book Lines
  var linesBookCount = getBookLinesCount(wordsCount, lw);
  linesBook.textContent = linesBookCount;

  // Words Uniq List
  var wordsUniqList = getWordsUniqList(str);
  var wordsUniqCount = _.uniq(wordsUniqList).length;
  wordsUniq.textContent = wordsUniqCount;

  /**
   *  Stop Words en/ru
   */
  var stopWordsList = getDataStopWords();

  // Important Words
  var wordsImportantList = getImportantWords(wordsUniqList, stopWordsList);
  var wordsImportantLength = wordsImportantList.length;
  wordsImportant.textContent = wordsImportantLength;

  // Stop Words
  var wordsStopList = getStopWords(wordsUniqList, wordsImportantList);
  var wordsStopLength = wordsStopList.length;
  wordsStop.textContent = wordsStopLength;

  // Water
  var waterLength = getWater(wordsStopLength, wordsImportantLength);
  water.textContent = waterLength;

  // Quality
  var qualityLength = getQuality(waterLength)
  quality.textContent = qualityLength;

  // Sentences
  var sentencesList = [];
  var sentencesCount = 0;

  sentencesList = getSentencesList(str);
  sentencesCount = getSentencesCount(sentencesList);
  sentences.textContent = sentencesCount;

  // Spaces
  var spacesLength = getSpacesCount(str);
  spaces.textContent = spacesLength;

  // Syllables
  var syllablesCount = getSyllables(str);
  syllables.textContent = syllablesCount;

  // Complexity factor (Lexical Density)
  var cfVal = complexityFactor(wordsUniqCount, wordsCount);
  cf.textContent = cfVal;

  // Average words per sentence
  var wordsAveragePerSentenceVal = averageWordsPerSentence(wordsCount, sentencesCount);
  wordsAveragePerSentence.textContent = wordsAveragePerSentenceVal;

  // Average Words Length
  var wordAverageCount = averageWordsLength(wordsList, wordsCount);
  wordAverageLength.textContent = wordAverageCount;


  // Complex Words
  var wordsComplexCount = getComplexWords(wordsList);
  wordsComplex.textContent = wordsComplexCount;

  // Letters and Numbers
  var countLettersAndNumbers = getLettersNumbers(str);

  /**
   * Readability
   */

  let gfiVal = getGfi(wordsCount, sentencesCount, wordsComplexCount);
  gfi.textContent = gfiVal;
  gfiResult.textContent = getGfiResult(gfiVal);

  var cliVal = getCli(symbolsCount, wordsCount, sentencesCount);
  cli.textContent = cliVal;

  var ariVal = getAri(countLettersAndNumbers, wordsCount, sentencesCount);
  ari.textContent = ariVal;

  var smogVal = getSmog(wordsComplexCount, sentencesCount);
  smog.textContent = smogVal;

  var fkVal = getFk(wordsCount, sentencesCount, syllablesCount);
  fk.textContent = fkVal;

  var freVal = getFre(wordsCount, sentencesCount, syllablesCount);
  fre.textContent = freVal;


  /**
   * Reading Time
   */
  var ertVal = getErt(wordsCount, wpm)
  ert.textContent = ertVal;

  /**
   * Orthography
   */
  var orthographyWarning = getDataOrthography(str);
  orthographyWarning.then(response => response) // 1
    .then(val => {
      orfography.textContent = val;
    })
    .catch(error => {
      console.log(error);
    });


  /**
   * Check Button
   */
  check.addEventListener('click', function () {
    location.reload();
  });

  /**
   * Chart
   */
  componentChart(wordsCount, wordsUniqCount, wordsImportantLength, wordsStopLength);

});
