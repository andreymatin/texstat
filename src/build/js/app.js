(function () {
  'use strict';

  /**
   * Component Chart
   */
  var componentChart = function componentChart(wordsCount, wordsUniqCount, wordsImportantLength, wordsStopLength) {
    var elChart = document.getElementById('chart');

    if (elChart) {
      var ctx = elChart.getContext('2d');
      var chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["Words", "Unique Words", "Important Words", "Stop Words"],
          datasets: [{
            label: '# words',
            data: [wordsCount, wordsUniqCount, wordsImportantLength, wordsStopLength],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
  };

  /**
   * Lines Count
   *
   * @param {String} str
   */
  var getLinesCount = function getLinesCount(val) {
    var linesSplit = val.split('\n');
    return linesSplit.length;
  };

  /**
   * Pages Count
   */
  var getPagesCount = function getPagesCount(linesCount, linesPerPage) {
    var pagesCount = Math.round(linesCount / linesPerPage);
    if (!pagesCount) return 1;
    return pagesCount;
  };

  /**
   * Chars Count
   */
  var getCharsCount = function getCharsCount(str) {
    return str.length;
  };

  /**
   * Symbols Count
   */
  var getSymbolsCount = function getSymbolsCount(str) {
    return str.replace(/ /g, '').length;
  };

  /**
   * Words List
   */
  var getWordsList = function getWordsList(str) {
    return str.replace(/\\n/g, " ").match(/[\w\u0430-\u044f]{1,}/ig);
  };

  /**
   * Words Count
   */
  var getWordsCount = function getWordsCount(str) {
    if (str) {
      return str.length;
    } else {
      return 0;
    }
  };

  /**
   * Book Lines Count
   *
   * @param {String} str
   */
  var getBookLinesCount = function getBookLinesCount(wordsCount, worsAtLine) {
    var linesBookCount = Math.round(wordsCount / worsAtLine);

    if (isNaN(linesBookCount)) {
      linesBookCount = 0;
    }

    return linesBookCount;
  };

  /**
   * Symbols Count
   */
  var getDataStopWords = function getDataStopWords() {
    // Ru / Eng
    var stopWordsList = ["а", "е", "и", "ж", "м", "о", "на", "не", "ни", "об", "но", "он", "мне", "мои", "мож", "она", "они", "оно", "мной", "много", "многочисленное", "многочисленная", "многочисленные", "многочисленный", "мною", "мой", "мог", "могут", "можно", "может", "можхо", "мор", "моя", "моё", "мочь", "над", "нее", "оба", "нам", "нем", "нами", "ними", "мимо", "немного", "одной", "одного", "менее", "однажды", "однако", "меня", "нему", "меньше", "ней", "наверху", "него", "ниже", "мало", "надо", "один", "одиннадцать", "одиннадцатый", "назад", "наиболее", "недавно", "миллионов", "недалеко", "между", "низко", "меля", "нельзя", "нибудь", "непрерывно", "наконец", "никогда", "никуда", "нас", "наш", "нет", "нею", "неё", "них", "мира", "наша", "наше", "наши", "ничего", "начала", "нередко", "несколько", "обычно", "опять", "около", "мы", "ну", "нх", "от", "отовсюду", "особенно", "нужно", "очень", "отсюда", "в", "во", "вон", "вниз", "внизу", "вокруг", "вот", "восемнадцать", "восемнадцатый", "восемь", "восьмой", "вверх", "вам", "вами", "важное", "важная", "важные", "важный", "вдали", "везде", "ведь", "вас", "ваш", "ваша", "ваше", "ваши", "впрочем", "весь", "вдруг", "вы", "все", "второй", "всем", "всеми", "времени", "время", "всему", "всего", "всегда", "всех", "всею", "всю", "вся", "всё", "всюду", "г", "год", "говорил", "говорит", "года", "году", "где", "да", "ее", "за", "из", "ли", "же", "им", "до", "по", "ими", "под", "иногда", "довольно", "именно", "долго", "позже", "более", "должно", "пожалуйста", "значит", "иметь", "больше", "пока", "ему", "имя", "пор", "пора", "потом", "потому", "после", "почему", "почти", "посреди", "ей", "два", "две", "двенадцать", "двенадцатый", "двадцать", "двадцатый", "двух", "его", "дел", "или", "без", "день", "занят", "занята", "занято", "заняты", "действительно", "давно", "девятнадцать", "девятнадцатый", "девять", "девятый", "даже", "алло", "жизнь", "далеко", "близко", "здесь", "дальше", "для", "лет", "зато", "даром", "первый", "перед", "затем", "зачем", "лишь", "десять", "десятый", "ею", "её", "их", "бы", "еще", "при", "был", "про", "процентов", "против", "просто", "бывает", "бывь", "если", "люди", "была", "были", "было", "будем", "будет", "будете", "будешь", "прекрасно", "буду", "будь", "будто", "будут", "ещё", "пятнадцать", "пятнадцатый", "друго", "другое", "другой", "другие", "другая", "других", "есть", "пять", "быть", "лучше", "пятый", "к", "ком", "конечно", "кому", "кого", "когда", "которой", "которого", "которая", "которые", "который", "которых", "кем", "каждое", "каждая", "каждые", "каждый", "кажется", "как", "какой", "какая", "кто", "кроме", "куда", "кругом", "с", "т", "у", "я", "та", "те", "уж", "со", "то", "том", "снова", "тому", "совсем", "того", "тогда", "тоже", "собой", "тобой", "собою", "тобою", "сначала", "только", "уметь", "тот", "тою", "хорошо", "хотеть", "хочешь", "хоть", "хотя", "свое", "свои", "твой", "своей", "своего", "своих", "свою", "твоя", "твоё", "раз", "уже", "сам", "там", "тем", "чем", "сама", "сами", "теми", "само", "рано", "самом", "самому", "самой", "самого", "семнадцать", "семнадцатый", "самим", "самими", "самих", "саму", "семь", "чему", "раньше", "сейчас", "чего", "сегодня", "себе", "тебе", "сеаой", "человек", "разве", "теперь", "себя", "тебя", "седьмой", "спасибо", "слишком", "так", "такое", "такой", "такие", "также", "такая", "сих", "тех", "чаще", "четвертый", "через", "часто", "шестой", "шестнадцать", "шестнадцатый", "шесть", "четыре", "четырнадцать", "четырнадцатый", "сколько", "сказал", "сказала", "сказать", "ту", "ты", "три", "эта", "эти", "что", "это", "чтоб", "этом", "этому", "этой", "этого", "чтобы", "этот", "стал", "туда", "этим", "этими", "рядом", "тринадцать", "тринадцатый", "этих", "третий", "тут", "эту", "суть", "чуть", "тысяч", "able", "about", "above", "abroad", "according", "accordingly", "across", "actually", "adj", "after", "afterwards", "again", "against", "ago", "ahead", "ain't", "all", "allow", "allows", "almost", "alone", "along", "alongside", "already", "also", "although", "always", "am", "amid", "amidst", "among", "amongst", "an", "and", "another", "any", "anybody", "anyhow", "anyone", "anything", "anyway", "anyways", "anywhere", "apart", "appear", "appreciate", "appropriate", "are", "aren't", "around", "as", "a's", "aside", "ask", "asking", "associated", "at", "available", "away", "awfully", "back", "backward", "backwards", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "begin", "behind", "being", "believe", "below", "beside", "besides", "best", "better", "between", "beyond", "both", "brief", "but", "by", "came", "can", "cannot", "cant", "can't", "caption", "cause", "causes", "certain", "certainly", "changes", "clearly", "c'mon", "co", "co.", "com", "come", "comes", "concerning", "consequently", "consider", "considering", "contain", "containing", "contains", "corresponding", "could", "couldn't", "course", "c's", "currently", "dare", "daren't", "definitely", "described", "despite", "did", "didn't", "different", "directly", "do", "does", "doesn't", "doing", "done", "don't", "down", "downwards", "during", "each", "edu", "eg", "eight", "eighty", "either", "else", "elsewhere", "end", "ending", "enough", "entirely", "especially", "et", "etc", "even", "ever", "evermore", "every", "everybody", "everyone", "everything", "everywhere", "ex", "exactly", "example", "except", "fairly", "far", "farther", "few", "fewer", "fifth", "first", "five", "followed", "following", "follows", "for", "forever", "former", "formerly", "forth", "forward", "found", "four", "from", "further", "furthermore", "get", "gets", "getting", "given", "gives", "go", "goes", "going", "gone", "got", "gotten", "greetings", "had", "hadn't", "half", "happens", "hardly", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "hello", "help", "hence", "her", "here", "hereafter", "hereby", "herein", "here's", "hereupon", "hers", "herself", "he's", "hi", "him", "himself", "his", "hither", "hopefully", "how", "howbeit", "however", "hundred", "i'd", "ie", "if", "ignored", "i'll", "i'm", "immediate", "in", "inasmuch", "inc", "inc.", "indeed", "indicate", "indicated", "indicates", "inner", "inside", "insofar", "instead", "into", "inward", "is", "isn't", "it", "it'd", "it'll", "its", "it's", "itself", "i've", "just", "k", "keep", "keeps", "kept", "know", "known", "knows", "last", "lately", "later", "latter", "latterly", "least", "less", "lest", "let", "let's", "like", "liked", "likely", "likewise", "little", "look", "looking", "looks", "low", "lower", "ltd", "made", "mainly", "make", "makes", "many", "may", "maybe", "mayn't", "me", "mean", "meantime", "meanwhile", "merely", "might", "mightn't", "mine", "minus", "miss", "more", "moreover", "most", "mostly", "mr", "mrs", "much", "must", "mustn't", "my", "myself", "name", "namely", "nd", "near", "nearly", "necessary", "need", "needn't", "needs", "neither", "never", "neverf", "neverless", "nevertheless", "new", "next", "nine", "ninety", "no", "nobody", "non", "none", "nonetheless", "noone", "no-one", "nor", "normally", "not", "nothing", "notwithstanding", "novel", "now", "nowhere", "obviously", "of", "off", "often", "oh", "ok", "okay", "old", "on", "once", "one", "ones", "one's", "only", "onto", "opposite", "or", "other", "others", "otherwise", "ought", "oughtn't", "our", "ours", "ourselves", "out", "outside", "over", "overall", "own", "particular", "particularly", "past", "per", "perhaps", "placed", "please", "plus", "possible", "presumably", "probably", "provided", "provides", "que", "quite", "qv", "rather", "rd", "re", "really", "reasonably", "recent", "recently", "regarding", "regardless", "regards", "relatively", "respectively", "right", "round", "said", "same", "saw", "say", "saying", "says", "second", "secondly", "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self", "selves", "sensible", "sent", "serious", "seriously", "seven", "several", "shall", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "since", "six", "so", "some", "somebody", "someday", "somehow", "someone", "something", "sometime", "sometimes", "somewhat", "somewhere", "soon", "sorry", "specified", "specify", "specifying", "still", "sub", "such", "sup", "sure", "take", "taken", "taking", "tell", "tends", "th", "than", "thank", "thanks", "thanx", "that", "that'll", "thats", "that's", "that've", "the", "their", "theirs", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "there'd", "therefore", "therein", "there'll", "there're", "theres", "there's", "thereupon", "there've", "these", "they", "they'd", "they'll", "they're", "they've", "thing", "things", "think", "third", "thirty", "this", "thorough", "thoroughly", "those", "though", "three", "through", "throughout", "thru", "thus", "till", "to", "together", "too", "took", "toward", "towards", "tried", "tries", "truly", "try", "trying", "t's", "twice", "two", "un", "under", "underneath", "undoing", "unfortunately", "unless", "unlike", "unlikely", "until", "unto", "up", "upon", "upwards", "us", "use", "used", "useful", "uses", "using", "usually", "v", "value", "various", "versus", "very", "via", "viz", "vs", "want", "wants", "was", "wasn't", "way", "we", "we'd", "welcome", "well", "we'll", "went", "were", "we'\re", "weren't", "we've", "what", "whatever", "what'll", "what's", "what've", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "where's", "whereupon", "wherever", "whether", "which", "whichever", "while", "whilst", "whither", "who", "who'd", "whoever", "whole", "who'll", "whom", "whomever", "who's", "whose", "why", "will", "willing", "wish", "with", "within", "without", "wonder", "won't", "would", "wouldn't", "yes", "yet", "you", "you'd", "you'll", "your", "you're", "yours", "yourself", "yourselves", "you've", "zero", "a", "how's", "i", "ours ", "when's", "why's", "b", "c", "d", "e", "f", "g", "h", "j", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "uucp", "w", "x", "y", "z", "I", "www", "amoungst", "amount", "bill", "bottom", "call", "computer", "con", "couldnt", "cry", "de", "describe", "detail", "due", "eleven", "empty", "fifteen", "fify", "fill", "find", "fire", "forty", "front", "full", "give", "hasnt", "herse", "himse", "interest", "itse", "mill", "move", "myse", "part", "put", "show", "side", "sincere", "sixty", "system", "ten", "thick", "thin", "top", "twelve", "twenty", "abst", "accordance", "act", "added", "adopted", "affected", "affecting", "affects", "ah", "announce", "anymore", "apparently", "approximately", "aren", "arent", "arise", "auth", "beginning", "beginnings", "begins", "biol", "briefly", "ca", "date", "ed", "effect", "et-al", "ff", "fix", "gave", "giving", "hed", "heres", "hes", "hid", "home", "id", "im", "immediately", "importance", "important", "index", "information", "invention", "itd", "keys", "kg", "km", "largely", "lets", "line", "'ll", "means", "mg", "million", "ml", "mug", "na", "nay", "necessarily", "nos", "noted", "obtain", "obtained", "omitted", "ord", "owing", "page", "pages", "poorly", "possibly", "potentially", "pp", "predominantly", "present", "previously", "primarily", "promptly", "proud", "quickly", "ran", "readily", "ref", "refs", "related", "research", "resulted", "resulting", "results", "run", "sec", "section", "shed", "shes", "showed", "shown", "showns", "shows", "significant", "significantly", "similar", "similarly", "slightly", "somethan", "specifically", "state", "states", "stop", "strongly", "substantially", "successfully", "sufficiently", "suggest", "thered", "thereof", "therere", "thereto", "theyd", "theyre", "thou", "thoughh", "thousand", "throug", "til", "tip", "ts", "ups", "usefully", "usefulness", "'ve", "vol", "vols", "wed", "whats", "wheres", "whim", "whod", "whos", "widely", "words", "world", "youd", "youre"];
    return stopWordsList;
  };

  /**
   * Words Uniq List
   */
  var getWordsUniqList = function getWordsUniqList(str) {
    var wordsUniqList = str.replace(/\\n/g, ' ').match(/[\w\u0430-\u044f]{3,}/ig);
    return wordsUniqList;
  };

  /**
   * Get Important Words
   */
  var getImportantWords = function getImportantWords(wordsUniqList, stopWordsList) {
    var wordsImportantList = _.difference(wordsUniqList, stopWordsList);

    return wordsImportantList;
  };

  /**
   * Get Stop Words
   */
  var getStopWords = function getStopWords(wordsUniqList, wordsImportantList) {
    var wordsStopList = _.difference(wordsUniqList, wordsImportantList);

    return wordsStopList;
  };

  /**
   * Get Water
   */
  var getWater = function getWater(wordsStopLength, wordsImportantLength) {
    var waterLength = (wordsStopLength * 100 / wordsImportantLength).toFixed(2);

    if (isNaN(waterLength)) {
      waterLength = 0;
    }

    return waterLength;
  };

  /**
   * Get Quality
   */
  var getQuality = function getQuality(waterLength) {
    var qualityLength = 0;

    if (waterLength > 0) {
      qualityLength = 100 - waterLength;
    }

    return qualityLength;
  };

  /**
   * Get Sentences List
   */
  var getSentencesList = function getSentencesList(str) {
    var sentencesList = str.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);
    return sentencesList;
  };

  /**
   * Get Sentences Count
   */
  var getSentencesCount = function getSentencesCount(sentencesList) {
    var sentencesCount = 0;

    try {
      sentencesCount = sentencesList.length - 1;
    } catch (err) {
      sentencesCount = 0;
    }

    return sentencesCount;
  };

  /**
   * Get Sentences Count
   */
  var getSpacesCount = function getSpacesCount(str) {
    var spacesLength = 0;

    try {
      spacesLength = str.match(/ /g).length;
    } catch (err) {
      spacesLength = 0;
    }

    return spacesLength;
  };

  /**
   * Get Syllables
   */
  var getSyllables = function getSyllables(val) {
    var word = '';

    try {
      word = val.toLowerCase(); //word.downcase!

      if (word.length <= 3) {
        return 1;
      } //return 1 if word.length <= 3


      word = val.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ''); //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')

      word = val.replace(/^y/, ''); //word.sub!(/^y/, '')

      return word.match(/[aeiouy]{1,2}/g).length; //word.scan(/[aeiouy]{1,2}/).size
    } catch (err) {
      return 0;
    }
  };

  /**
   * Get Complexity factor (Lexical Density)
   */
  var complexityFactor = function complexityFactor(wordsUniqCount, wordsCount) {
    var cfVal = (wordsUniqCount / wordsCount * 100).toFixed(2);

    if (isNaN(cfVal)) {
      cfVal = 0;
    }

    return cfVal;
  };

  /**
   * Average words per sentence
   */
  var averageWordsPerSentence = function averageWordsPerSentence(wordsCount, sentencesCount) {
    var wordsAveragePerSentenceVal = Math.round(wordsCount / sentencesCount);

    if (isNaN(wordsAveragePerSentenceVal)) {
      wordsAveragePerSentenceVal = 0;
    }

    return wordsAveragePerSentenceVal;
  };

  /**
   * Average Words Length
   */
  var averageWordsLength = function averageWordsLength(wordsList, wordsCount) {
    // Average Word Length
    var wordsTotalLength = 0;

    for (var key in wordsList) {
      wordsTotalLength += wordsList[key].length;
    }

    var wordAverageCount = Math.round(wordsTotalLength / wordsCount);

    if (isNaN(wordAverageCount)) {
      wordAverageCount = 0;
    }

    return wordAverageCount;
  };

  /**
   * Get Quality
   */
  var getComplexWords = function getComplexWords(wordsList) {
    var wordsComplexCount = 0;

    for (var key in wordsList) {
      try {
        if (!/^[A-Z]/g.test(wordsList[key])) {
          var wordSyllables = wordsList[key].match(/[aeuoi]/g).length - 1;

          if (/ing$/ig.test(wordsList[key]) || /ed$/ig.test(wordsList[key]) || /es$/ig.test(wordsList[key])) {
            wordSyllables--;
          }

          if (wordSyllables >= 3) {
            wordsComplexCount++;
          }
        }
      } catch (er) {
        wordsComplexCount = 0;
      }
    }

    return wordsComplexCount;
  };

  /**
   * Get Quality
   */
  var getLettersNumbers = function getLettersNumbers(str) {
    var countLettersAndNumbers = 0;

    try {
      countLettersAndNumbers = str.match(/[A-Za-z0-9]/g).length;
    } catch (err) {
      countLettersAndNumbers = 0;
    }

    return countLettersAndNumbers;
  };

  /**
   * Get GFI
   */
  var getGfi = function getGfi(wordsAveragePerSentenceVal, wordsComplexCount, wordsCount) {
    var gfiVal = (0.4 * (wordsAveragePerSentenceVal + 100 * (wordsComplexCount / wordsCount))).toFixed(2);

    if (isNaN(gfiVal)) {
      gfiVal = 0;
    }

    return gfiVal;
  };

  /**
   * Get CLI
   */
  var getCli = function getCli(symbolsCount, wordsCount, sentencesCount) {
    var cliVal = (5.88 * (symbolsCount / wordsCount) - 29.6 * (sentencesCount / wordsCount) - 15.8).toFixed(2);

    if (isNaN(cliVal)) {
      cliVal = 0;
    }

    return cliVal;
  };

  /**
   * Get ARI
   */
  var getAri = function getAri(countLettersAndNumbers, wordsCount, sentencesCount) {
    var ariVal = (4.71 * (countLettersAndNumbers / wordsCount) + 0.5 * (wordsCount / sentencesCount) - 21.43).toFixed(2);

    if (isNaN(ariVal)) {
      ariVal = 0;
    }

    return ariVal;
  };

  /**
   * Get Smog
   */
  var getSmog = function getSmog(wordsComplexCount, sentencesCount) {
    var smogVal = (1.043 * Math.sqrt(wordsComplexCount * (30 / sentencesCount)) + 3.1291).toFixed(2);

    if (isNaN(smogVal)) {
      smogVal = 0;
    }

    return smogVal;
  };

  /**
   * Get Fk
   */
  var getFk = function getFk(wordsCount, sentencesCount, syllablesCount) {
    var fkVal = (0.39 * (wordsCount / sentencesCount) + 11.8 * (syllablesCount / wordsCount) - 15.59).toFixed(2);

    if (isNaN(fkVal)) {
      fkVal = 0;
    }

    return fkVal;
  };

  /**
   * Get Fre
   */
  var getFre = function getFre(wordsCount, sentencesCount, syllablesCount) {
    var freVal = (206.835 - 1.015 * (wordsCount / sentencesCount) - 84.6 * (syllablesCount / wordsCount)).toFixed(2);

    if (isNaN(freVal)) {
      freVal = 0;
    }

    return freVal;
  };

  /**
   * Get ERT
   */
  var getErt = function getErt(wordsCount, wpm) {
    var ertVal = Math.ceil((wordsCount / wpm).toFixed(2));

    if (isNaN(ertVal)) {
      ertVal = 0;
    }

    return ertVal;
  };

  /**
   * Get Sentences Count
   */
  var getDataOrthography = function getDataOrthography(str) {
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
  };

  /**
   * Components
   */
  document.addEventListener('DOMContentLoaded', function () {
    /**
     * Const
     */
    // Words / Minute
    var wpm = 180; // Words in the line

    var lw = 12; // Lines per Page

    var linesPerPage = 30;
    /**
     * Cache DOM Elements
     */

    var textarea = document.getElementById('textarea');
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
    var check = document.getElementById('check'); // Lines

    var linesCount = getLinesCount(str);
    lines.textContent = linesCount; // Pages

    var pagesCount = getPagesCount(linesCount, linesPerPage);
    pages.textContent = pagesCount; // Chars

    var charsCount = getCharsCount(str);
    chars.textContent = charsCount; // Symbols

    var symbolsCount = getSymbolsCount(str);
    symbols.textContent = symbolsCount; // Words List

    var wordsList = getWordsList(str); // Words Count

    var wordsCount = getWordsCount(wordsList);
    words.textContent = wordsCount; // Book Lines

    var linesBookCount = getBookLinesCount(wordsCount, lw);
    linesBook.textContent = linesBookCount; // Words Uniq List

    var wordsUniqList = getWordsUniqList(str);

    var wordsUniqCount = _.uniq(wordsUniqList).length;

    wordsUniq.textContent = wordsUniqCount;
    /**
     *  Stop Words en/ru
     */

    var stopWordsList = getDataStopWords(); // Important Words

    var wordsImportantList = getImportantWords(wordsUniqList, stopWordsList);
    var wordsImportantLength = wordsImportantList.length;
    wordsImportant.textContent = wordsImportantLength; // Stop Words

    var wordsStopList = getStopWords(wordsUniqList, wordsImportantList);
    var wordsStopLength = wordsStopList.length;
    wordsStop.textContent = wordsStopLength; // Water

    var waterLength = getWater(wordsStopLength, wordsImportantLength);
    water.textContent = waterLength; // Quality

    var qualityLength = getQuality(waterLength);
    quality.textContent = qualityLength; // Sentences

    var sentencesList = [];
    var sentencesCount = 0;
    sentencesList = getSentencesList(str);
    sentencesCount = getSentencesCount(sentencesList);
    sentences.textContent = sentencesCount; // Spaces

    var spacesLength = getSpacesCount(str);
    spaces.textContent = spacesLength; // Syllables

    var syllablesCount = getSyllables(str);
    syllables.textContent = syllablesCount; // Complexity factor (Lexical Density)

    var cfVal = complexityFactor(wordsUniqCount, wordsCount);
    cf.textContent = cfVal; // Average words per sentence

    var wordsAveragePerSentenceVal = averageWordsPerSentence(wordsCount, sentencesCount);
    wordsAveragePerSentence.textContent = wordsAveragePerSentenceVal; // Average Words Length

    var wordAverageCount = averageWordsLength(wordsList, wordsCount);
    wordAverageLength.textContent = wordAverageCount; // Complex Words

    var wordsComplexCount = getComplexWords(wordsList);
    wordsComplex.textContent = wordsComplexCount; // Letters and Numbers

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

    var ertVal = getErt(wordsCount, wpm);
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

}());
//# sourceMappingURL=app.js.map
