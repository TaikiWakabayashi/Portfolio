var wordEl = document.getElementById('word');
var wrongLettersEl = document.getElementById('wrong-letters');
var playAgainBtn = document.getElementById('play-button');
var popup = document.getElementById('popup-container');
var notification = document.getElementById('notification-container');
var finalMessage = document.getElementById('final-message');
var finalMessageRevealWord = document.getElementById('final-message-reveal-word');
var figureParts = document.querySelectorAll('.figure-part');
var words = ['application', 'Typescript', 'engineering', 'prototype', 'interface'];
var selectedWord = words[Math.floor(Math.random() * words.length)];
var playable = true;
var correctLetters = [];
var wrongLetters = [];
/**
 * show hidden word
 */
function displayWord() {
    /**
     * innerHTML = 要素内のHTMLを設定することができる。
     */
    wordEl.innerHTML =
        "".concat(selectedWord
            /**
             * split = 対象の文字列を引数で指定した文字列で分割し、
             * 分割された文字列をそれぞれの要素として　"格納した配列"　として返す。
             */
            .split('')
            /**
             * 対象の配列に対し、順番に同じ引数内の処理を繰り返し、
             * 新しい配列として返す。
             */
            .map(function (letter) {
            return "<span class = \"letter\">\n        ".concat(correctLetters.includes(letter) ? letter : '', "\n        </span>\n        ");
        })
            /**
             * 対象の配列に対し、引数で指定した区切り文字をもとに、
             * 全要素を順に連結した "文字列" を作成する。
             */
            .join(''), "\n    ");
    /**
     * innerText = 要素内のテキストを取得する。
     *
     * replace = 正規表現で検索する文字列を/ /で囲む。
     * また、/の後につく"g"はグローバルマッチといい、一致したものを全て置換するオプション。
     */
    var innerWord = wordEl.innerText.replace(/[ \n]/g, '');
    /**
     * ランダムで選択された文字と、入力した文字が同じだった場合、
     * finalMessageにメッセージを表示し、
     * 入力して明らかになった文字列（finalMessageRevealWord）を初期化する。
     */
    if (innerWord == selectedWord) {
        finalMessage.innerText = 'Congratulations! You won! 😄 ';
        finalMessageRevealWord.innerText = '';
        popup.style.display = 'flex';
        playable = false;
    }
}
;
