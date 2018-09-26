(function ($) {
  $(function () {

    /**
     * Const
     */

    // Words / Minute
    var wpm = 180;

    // Words in the line
    var lw = 12;

    /**
     * Dom
     */
    var textarea = $('#textarea');
    var str = textarea.val();
    var lines = $('#lines');
    var pages = $('#pages');
    var chars = $('#chars');
    var symbols = $('#symbols');
    var words = $('#words');
    var wordsUniq = $('#wordsUniq');
    var wordsImportant = $('#wordsImportant');
    var wordsStop = $('#wordsStop');
    var water = $('#water');
    var quality = $('#quality');
    var sentences = $('#sentences');
    var spaces = $('#spaces');
    var syllables = $('#syllables');
    var cf = $('#cf');
    var wordsAveragePerSentence = $('#wordsAveragePerSentence');
    var wordAverageLength = $('#wordAverageLength');
    var wordsComplex = $('#wordsComplex');
    var gfi = $('#gfi');
    var cli = $('#cli');
    var ari = $('#ari');
    var smog = $('#smog');
    var fk = $('#fk');
    var fre = $('#fre');
    var ert = $('#ert');
    var orfography = $('#orfography');
    var linesBook = $('#linesBook');
    var check = $('#check');

    // Lines
    var linesSplit = str.split('\n');
    var linesCount = linesSplit.length;
    lines.text(linesCount);

    // Pages
    var pagesCount = Math.round(linesCount / 30);
    if (pagesCount == 0) pagesCount = 1;
    pages.text(pagesCount);

    // Chars
    var charsCount = str.length;
    chars.text(charsCount);

    // Symbols
    var symbolsCount = str.replace(/ /g, "").length;
    symbols.text(symbolsCount);

    // Words
    var wordsCount = 0;
    var wordsList = [];
    try {
      wordsList = str.replace(/\\n/g, ' ').match(/[\w\u0430-\u044f]{1,}/ig);
      wordsCount = wordsList.length;
      words.text(wordsCount);
    } catch (err) {
      words.text(0);
    }

    // Book Lines
    var linesBookCount = Math.round(wordsCount / lw);
    if (isNaN(linesBookCount)) {
      linesBookCount = 0;
    }
    linesBook.text(linesBookCount);

    // Words Uniq List
    var wordsUniqList = str.replace(/\\n/g, ' ').match(/[\w\u0430-\u044f]{3,}/ig);
    wordsUniqCount = _.uniq(wordsUniqList).length;
    wordsUniq.text(wordsUniqCount);

    /**
     *  Stop Words en/ru
     */
    var stopWordsList = ["а", "е", "и", "ж", "м", "о", "на", "не", "ни", "об", "но", "он", "мне", "мои", "мож", "она", "они", "оно", "мной", "много", "многочисленное", "многочисленная", "многочисленные", "многочисленный", "мною", "мой", "мог", "могут", "можно", "может", "можхо", "мор", "моя", "моё", "мочь", "над", "нее", "оба", "нам", "нем", "нами", "ними", "мимо", "немного", "одной", "одного", "менее", "однажды", "однако", "меня", "нему", "меньше", "ней", "наверху", "него", "ниже", "мало", "надо", "один", "одиннадцать", "одиннадцатый", "назад", "наиболее", "недавно", "миллионов", "недалеко", "между", "низко", "меля", "нельзя", "нибудь", "непрерывно", "наконец", "никогда", "никуда", "нас", "наш", "нет", "нею", "неё", "них", "мира", "наша", "наше", "наши", "ничего", "начала", "нередко", "несколько", "обычно", "опять", "около", "мы", "ну", "нх", "от", "отовсюду", "особенно", "нужно", "очень", "отсюда", "в", "во", "вон", "вниз", "внизу", "вокруг", "вот", "восемнадцать", "восемнадцатый", "восемь", "восьмой", "вверх", "вам", "вами", "важное", "важная", "важные", "важный", "вдали", "везде", "ведь", "вас", "ваш", "ваша", "ваше", "ваши", "впрочем", "весь", "вдруг", "вы", "все", "второй", "всем", "всеми", "времени", "время", "всему", "всего", "всегда", "всех", "всею", "всю", "вся", "всё", "всюду", "г", "год", "говорил", "говорит", "года", "году", "где", "да", "ее", "за", "из", "ли", "же", "им", "до", "по", "ими", "под", "иногда", "довольно", "именно", "долго", "позже", "более", "должно", "пожалуйста", "значит", "иметь", "больше", "пока", "ему", "имя", "пор", "пора", "потом", "потому", "после", "почему", "почти", "посреди", "ей", "два", "две", "двенадцать", "двенадцатый", "двадцать", "двадцатый", "двух", "его", "дел", "или", "без", "день", "занят", "занята", "занято", "заняты", "действительно", "давно", "девятнадцать", "девятнадцатый", "девять", "девятый", "даже", "алло", "жизнь", "далеко", "близко", "здесь", "дальше", "для", "лет", "зато", "даром", "первый", "перед", "затем", "зачем", "лишь", "десять", "десятый", "ею", "её", "их", "бы", "еще", "при", "был", "про", "процентов", "против", "просто", "бывает", "бывь", "если", "люди", "была", "были", "было", "будем", "будет", "будете", "будешь", "прекрасно", "буду", "будь", "будто", "будут", "ещё", "пятнадцать", "пятнадцатый", "друго", "другое", "другой", "другие", "другая", "других", "есть", "пять", "быть", "лучше", "пятый", "к", "ком", "конечно", "кому", "кого", "когда", "которой", "которого", "которая", "которые", "который", "которых", "кем", "каждое", "каждая", "каждые", "каждый", "кажется", "как", "какой", "какая", "кто", "кроме", "куда", "кругом", "с", "т", "у", "я", "та", "те", "уж", "со", "то", "том", "снова", "тому", "совсем", "того", "тогда", "тоже", "собой", "тобой", "собою", "тобою", "сначала", "только", "уметь", "тот", "тою", "хорошо", "хотеть", "хочешь", "хоть", "хотя", "свое", "свои", "твой", "своей", "своего", "своих", "свою", "твоя", "твоё", "раз", "уже", "сам", "там", "тем", "чем", "сама", "сами", "теми", "само", "рано", "самом", "самому", "самой", "самого", "семнадцать", "семнадцатый", "самим", "самими", "самих", "саму", "семь", "чему", "раньше", "сейчас", "чего", "сегодня", "себе", "тебе", "сеаой", "человек", "разве", "теперь", "себя", "тебя", "седьмой", "спасибо", "слишком", "так", "такое", "такой", "такие", "также", "такая", "сих", "тех", "чаще", "четвертый", "через", "часто", "шестой", "шестнадцать", "шестнадцатый", "шесть", "четыре", "четырнадцать", "четырнадцатый", "сколько", "сказал", "сказала", "сказать", "ту", "ты", "три", "эта", "эти", "что", "это", "чтоб", "этом", "этому", "этой", "этого", "чтобы", "этот", "стал", "туда", "этим", "этими", "рядом", "тринадцать", "тринадцатый", "этих", "третий", "тут", "эту", "суть", "чуть", "тысяч", "able", "about", "above", "abroad", "according", "accordingly", "across", "actually", "adj", "after", "afterwards", "again", "against", "ago", "ahead", "ain't", "all", "allow", "allows", "almost", "alone", "along", "alongside", "already", "also", "although", "always", "am", "amid", "amidst", "among", "amongst", "an", "and", "another", "any", "anybody", "anyhow", "anyone", "anything", "anyway", "anyways", "anywhere", "apart", "appear", "appreciate", "appropriate", "are", "aren't", "around", "as", "a's", "aside", "ask", "asking", "associated", "at", "available", "away", "awfully", "back", "backward", "backwards", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "begin", "behind", "being", "believe", "below", "beside", "besides", "best", "better", "between", "beyond", "both", "brief", "but", "by", "came", "can", "cannot", "cant", "can't", "caption", "cause", "causes", "certain", "certainly", "changes", "clearly", "c'mon", "co", "co.", "com", "come", "comes", "concerning", "consequently", "consider", "considering", "contain", "containing", "contains", "corresponding", "could", "couldn't", "course", "c's", "currently", "dare", "daren't", "definitely", "described", "despite", "did", "didn't", "different", "directly", "do", "does", "doesn't", "doing", "done", "don't", "down", "downwards", "during", "each", "edu", "eg", "eight", "eighty", "either", "else", "elsewhere", "end", "ending", "enough", "entirely", "especially", "et", "etc", "even", "ever", "evermore", "every", "everybody", "everyone", "everything", "everywhere", "ex", "exactly", "example", "except", "fairly", "far", "farther", "few", "fewer", "fifth", "first", "five", "followed", "following", "follows", "for", "forever", "former", "formerly", "forth", "forward", "found", "four", "from", "further", "furthermore", "get", "gets", "getting", "given", "gives", "go", "goes", "going", "gone", "got", "gotten", "greetings", "had", "hadn't", "half", "happens", "hardly", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "hello", "help", "hence", "her", "here", "hereafter", "hereby", "herein", "here's", "hereupon", "hers", "herself", "he's", "hi", "him", "himself", "his", "hither", "hopefully", "how", "howbeit", "however", "hundred", "i'd", "ie", "if", "ignored", "i'll", "i'm", "immediate", "in", "inasmuch", "inc", "inc.", "indeed", "indicate", "indicated", "indicates", "inner", "inside", "insofar", "instead", "into", "inward", "is", "isn't", "it", "it'd", "it'll", "its", "it's", "itself", "i've", "just", "k", "keep", "keeps", "kept", "know", "known", "knows", "last", "lately", "later", "latter", "latterly", "least", "less", "lest", "let", "let's", "like", "liked", "likely", "likewise", "little", "look", "looking", "looks", "low", "lower", "ltd", "made", "mainly", "make", "makes", "many", "may", "maybe", "mayn't", "me", "mean", "meantime", "meanwhile", "merely", "might", "mightn't", "mine", "minus", "miss", "more", "moreover", "most", "mostly", "mr", "mrs", "much", "must", "mustn't", "my", "myself", "name", "namely", "nd", "near", "nearly", "necessary", "need", "needn't", "needs", "neither", "never", "neverf", "neverless", "nevertheless", "new", "next", "nine", "ninety", "no", "nobody", "non", "none", "nonetheless", "noone", "no-one", "nor", "normally", "not", "nothing", "notwithstanding", "novel", "now", "nowhere", "obviously", "of", "off", "often", "oh", "ok", "okay", "old", "on", "once", "one", "ones", "one's", "only", "onto", "opposite", "or", "other", "others", "otherwise", "ought", "oughtn't", "our", "ours", "ourselves", "out", "outside", "over", "overall", "own", "particular", "particularly", "past", "per", "perhaps", "placed", "please", "plus", "possible", "presumably", "probably", "provided", "provides", "que", "quite", "qv", "rather", "rd", "re", "really", "reasonably", "recent", "recently", "regarding", "regardless", "regards", "relatively", "respectively", "right", "round", "said", "same", "saw", "say", "saying", "says", "second", "secondly", "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self", "selves", "sensible", "sent", "serious", "seriously", "seven", "several", "shall", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "since", "six", "so", "some", "somebody", "someday", "somehow", "someone", "something", "sometime", "sometimes", "somewhat", "somewhere", "soon", "sorry", "specified", "specify", "specifying", "still", "sub", "such", "sup", "sure", "take", "taken", "taking", "tell", "tends", "th", "than", "thank", "thanks", "thanx", "that", "that'll", "thats", "that's", "that've", "the", "their", "theirs", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "there'd", "therefore", "therein", "there'll", "there're", "theres", "there's", "thereupon", "there've", "these", "they", "they'd", "they'll", "they're", "they've", "thing", "things", "think", "third", "thirty", "this", "thorough", "thoroughly", "those", "though", "three", "through", "throughout", "thru", "thus", "till", "to", "together", "too", "took", "toward", "towards", "tried", "tries", "truly", "try", "trying", "t's", "twice", "two", "un", "under", "underneath", "undoing", "unfortunately", "unless", "unlike", "unlikely", "until", "unto", "up", "upon", "upwards", "us", "use", "used", "useful", "uses", "using", "usually", "v", "value", "various", "versus", "very", "via", "viz", "vs", "want", "wants", "was", "wasn't", "way", "we", "we'd", "welcome", "well", "we'll", "went", "were", "we'\re", "weren't", "we've", "what", "whatever", "what'll", "what's", "what've", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "where's", "whereupon", "wherever", "whether", "which", "whichever", "while", "whilst", "whither", "who", "who'd", "whoever", "whole", "who'll", "whom", "whomever", "who's", "whose", "why", "will", "willing", "wish", "with", "within", "without", "wonder", "won't", "would", "wouldn't", "yes", "yet", "you", "you'd", "you'll", "your", "you're", "yours", "yourself", "yourselves", "you've", "zero", "a", "how's", "i", "ours ", "when's", "why's", "b", "c", "d", "e", "f", "g", "h", "j", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "uucp", "w", "x", "y", "z", "I", "www", "amoungst", "amount", "bill", "bottom", "call", "computer", "con", "couldnt", "cry", "de", "describe", "detail", "due", "eleven", "empty", "fifteen", "fify", "fill", "find", "fire", "forty", "front", "full", "give", "hasnt", "herse", "himse", "interest", "itse", "mill", "move", "myse", "part", "put", "show", "side", "sincere", "sixty", "system", "ten", "thick", "thin", "top", "twelve", "twenty", "abst", "accordance", "act", "added", "adopted", "affected", "affecting", "affects", "ah", "announce", "anymore", "apparently", "approximately", "aren", "arent", "arise", "auth", "beginning", "beginnings", "begins", "biol", "briefly", "ca", "date", "ed", "effect", "et-al", "ff", "fix", "gave", "giving", "hed", "heres", "hes", "hid", "home", "id", "im", "immediately", "importance", "important", "index", "information", "invention", "itd", "keys", "kg", "km", "largely", "lets", "line", "'ll", "means", "mg", "million", "ml", "mug", "na", "nay", "necessarily", "nos", "noted", "obtain", "obtained", "omitted", "ord", "owing", "page", "pages", "poorly", "possibly", "potentially", "pp", "predominantly", "present", "previously", "primarily", "promptly", "proud", "quickly", "ran", "readily", "ref", "refs", "related", "research", "resulted", "resulting", "results", "run", "sec", "section", "shed", "shes", "showed", "shown", "showns", "shows", "significant", "significantly", "similar", "similarly", "slightly", "somethan", "specifically", "state", "states", "stop", "strongly", "substantially", "successfully", "sufficiently", "suggest", "thered", "thereof", "therere", "thereto", "theyd", "theyre", "thou", "thoughh", "thousand", "throug", "til", "tip", "ts", "ups", "usefully", "usefulness", "'ve", "vol", "vols", "wed", "whats", "wheres", "whim", "whod", "whos", "widely", "words", "world", "youd", "youre"];

    // Important Words
    var wordsImportantList = _.difference(wordsUniqList, stopWordsList);
    var wordsImportantLength = wordsImportantList.length;
    wordsImportant.text(wordsImportantLength);

    // Stop Words
    var wordsStopList = _.difference(wordsUniqList, wordsImportantList);
    var wordsStopLength = wordsStopList.length;
    wordsStop.text(wordsStopLength);

    // Water
    var waterLength = ((wordsStopLength * 100) / wordsImportantLength).toFixed(2);
    if (isNaN(waterLength)) {
      waterLength = 0;
    }
    water.text(waterLength);

    // Quality
    var qualityLength = 0;
    if (waterLength > 0) {
      qualityLength = 100 - waterLength;
    } else {
      qualityLength = 0;
    }
    quality.text(qualityLength);

    // Sentences
    var sentencesList = [];
    var sentencesCount = 0;
    try {
      sentencesList = str.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);
      sentencesCount = sentencesList.length;
      sentences.text(sentencesCount);
    } catch (err) {
      sentences.text(0);
    }

    // Spaces
    try {
      var spacesLength = str.match(/ /g).length;
      spaces.text(spacesLength);
    } catch (err) {
      spaces.text(0);
    }

    // Syllables
    function getSyllables(val) {
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
    }
    syllablesCount = getSyllables(str);
    syllables.text(syllablesCount);

    // Complexity factor (Lexical Density)
    var cfVal = ((wordsUniqCount / wordsCount) * 100).toFixed(2);
    if (isNaN(cfVal)) {
      cfVal = 0;
    }
    cf.text(cfVal);

    // Average words per sentence
    var wordsAveragePerSentenceVal = Math.round(wordsCount / sentencesCount);
    if (isNaN(wordsAveragePerSentenceVal)) {
      wordsAveragePerSentenceVal = 0;
    }
    wordsAveragePerSentence.text(wordsAveragePerSentenceVal);

    // Average Word Length
    var wordsTotalLength = 0;
    for (var key in wordsList) {
      wordsTotalLength += wordsList[key].length;
    }
    wordAverageCount = Math.round(wordsTotalLength / wordsCount);
    if (isNaN(wordAverageCount)) {
      wordAverageCount = 0;
    }
    wordAverageLength.text(wordAverageCount);


    // Complex Words
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
      } catch (er) {}
    }
    wordsComplex.text(wordsComplexCount);

    // Letters and Numbers
    var countLettersAndNumbers = 0;
    try {
      countLettersAndNumbers = str.match(/[A-Za-z0-9]/g).length;
    } catch (err) {}

    /**
     * Readability
     */
    var gfiVal = (0.4 * (wordsAveragePerSentenceVal + 100 * (wordsComplexCount / wordsCount))).toFixed(2);
    if (isNaN(gfiVal)) {
      gfiVal = 0;
    }
    gfi.text(gfiVal);

    var cliVal = (5.88 * (symbolsCount / wordsCount) - 29.6 * (sentencesCount / wordsCount) - 15.8).toFixed(2);
    if (isNaN(cliVal)) {
      cliVal = 0;
    }
    cli.text(cliVal);

    var ariVal = (4.71 * (countLettersAndNumbers / wordsCount) + 0.5 * (wordsCount / sentencesCount) - 21.43).toFixed(2);
    if (isNaN(ariVal)) {
      ariVal = 0;
    }
    ari.text(ariVal);

    var smogVal = (1.043 * Math.sqrt(wordsComplexCount * (30 / sentencesCount)) + 3.1291).toFixed(2);
    if (isNaN(smogVal)) {
      smogVal = 0;
    }
    smog.text(smogVal);

    var fkVal = (0.39 * (wordsCount / sentencesCount) + 11.8 * (syllablesCount / wordsCount) - 15.59).toFixed(2);
    if (isNaN(fkVal)) {
      fkVal = 0;
    }
    fk.text(fkVal);

    var freVal = (206.835 - 1.015 * (wordsCount / sentencesCount) - 84.6 * (syllablesCount / wordsCount)).toFixed(2);
    if (isNaN(freVal)) {
      freVal = 0;
    }
    fre.text(freVal);


    /**
     * Reading Time
     */
    var ertVal = Math.ceil((wordsCount / wpm).toFixed(2));
    if (isNaN(ertVal)) {
      ertVal = 0;
    }
    ert.text(ertVal);

    /**
     * Orfography
     * API: https://languagetool.org/http-api/swagger-ui/#/default
     */
    $.ajax({
      type: "POST",
      url: "https://languagetool.org/api/v2/check",
      crossDomain: true,
      dataType: 'json',
      data: {
        text: str,
        language: 'auto',
        enabledOnly: false
      },
      success: function (data, status, xhr) {
        var matches = data.matches;
        matchesLength = matches.length;

        if (matchesLength > 0) {
          orfography.html(matchesLength);
        }
      },
      error: function (xhr, status, error) {
        orfography.html(0);
      },
      complete: function () {}
    });

    /**
     * Check Button
     */
    check.on('click', function() {
      location.reload();
    });

    /**
     * Chart
     */

    var ctx = document.getElementById("chart").getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Words", "Unique Words", "Important Words", "Stop Words"],
            datasets: [{
                label: '# words',
                data: [wordsCount, wordsUniqCount, wordsImportantLength, wordsStopLength],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

  });
})(jQuery);