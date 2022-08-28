var wordEl = document.getElementById('word');
var wrongLettersEl = document.getElementById('wrong-letters');
var playAgainBtn = document.getElementById('play-button');
var popup = document.getElementById('popup-container');
var notification = document.getElementById('notification-container');
var finalMessage = document.getElementById('final-message');
var finalMessageRevealWord = document.getElementById('final-message-reveal-word');
/**
 * if you use "querySelector" or "querySelectorAll" in Typescript,
 * you need to use <>(generics) and specify of the type.
 */
var figureParts = document.querySelectorAll('.figure-part');
var words = ['application', 'typescript', 'engineering', 'prototype', 'interface'];
/**
 *  Math.floor() method is a method that returns the largest integer
 * less than or equal to a specified number;
 */
/**
 * math.random() is a method that returns a random number
 * greater than or equal to 0 and lass than 1.
 */
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
             * split = 対象の文字列を引数で指定した文字で分割し、
             * 分割された文字列をそれぞれの要素として "格納した配列" として返す。
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
/**
 * Update the wrong letters
 */
function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = "\n    ".concat(wrongLetters.length > 0 ? '<p>Wrong</p>' : '', "\n    ").concat(wrongLetters.map(function (letter) { return "<span>".concat(letter, "</span>"); }), "\n    ");
    // Display parts
    figureParts.forEach(function (part, index) {
        var errors = wrongLetters.length;
        if (index < errors) {
            part.style.display = 'block';
        }
        else {
            part.style.display = 'none';
        }
    });
    // check if lost.
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        finalMessageRevealWord.innerText = "...the word was ".concat(selectedWord);
        popup.style.display = 'flex';
        playable = false;
    }
}
;
// show notification
function showNotification() {
    notification.classList.add('show');
    setTimeout(function () {
        notification.classList.remove('show');
    }, 2000);
}
// keydown letter press
window.addEventListener('keydown', function (e) {
    console.log("adEventListenerを開始");
    if (playable) {
        if (/^[A-Z]$/i.test(e.key)) {
            var letter = e.key.toLowerCase();
            if (selectedWord.includes(letter)) {
                if (!correctLetters.includes(letter)) {
                    correctLetters.push(letter);
                    displayWord();
                }
                else {
                    showNotification();
                }
            }
            else {
                if (!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);
                    updateWrongLettersEl();
                }
                else {
                    showNotification();
                }
            }
        }
    }
});
// Restart game and play again
playAgainBtn.addEventListener('click', function () {
    playable = true;
    // Empty arrays
    /**
     * splice = 引数で指定したindex以降の要素を取り除く
     *
     * 既存の選択されたワードと、エラーワードをリセット
     */
    correctLetters.splice(0);
    wrongLetters.splice(0);
    /**
     * select a new keyWord from the array.
     */
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersEl();
    popup.style.display = 'none';
});
displayWord();
