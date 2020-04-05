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

import getGfi from './services/readability/get-gfi';
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
  var textarea =  document.getElementById('textarea');
  var str = textarea.value;

  var lines = document.getElementById('lines');
  var pages = document.getElementById('pages');
  var chars = document.getElementById('chars');
  var symbols = document.getElementById('symbols');
  var words = document.getElementById('words');
  var wordsUniq = document.getElementById('wordsUniq');
  var wordsImportant = document.getElementById('wordsImportant');
  var wordsStop = document.getElementById('wordsStop');
  var water = document.getElementById('water');
  var quality = document.getElementById('quality');
  var sentences = document.getElementById('sentences');
  var spaces = document.getElementById('spaces');
  var syllables = document.getElementById('syllables');
  var cf = document.getElementById('cf');
  var wordsAveragePerSentence = document.getElementById('wordsAveragePerSentence');
  var wordAverageLength = document.getElementById('wordAverageLength');
  var wordsComplex = document.getElementById('wordsComplex');
  var gfi = document.getElementById('gfi');
  var cli = document.getElementById('cli');
  var ari = document.getElementById('ari');
  var smog = document.getElementById('smog');
  var fk = document.getElementById('fk');
  var fre = document.getElementById('fre');
  var ert = document.getElementById('ert');
  var orfography = document.getElementById('orfography');
  var linesBook = document.getElementById('linesBook');
  var check = document.getElementById('check');

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

  var gfiVal = getGfi(wordsAveragePerSentenceVal, wordsComplexCount, wordsCount);
  gfi.textContent = gfiVal;

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

  var orthographyWarning = getDataOrthography();
  orfography.textContent = orthographyWarning;

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
