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
     * innerHTML = this method can set the HTML inside the element.
     */
    wordEl.innerHTML =
        "".concat(selectedWord
            /**
             * split = Divides the target string by the specified character,
             * returns the characters in an array.
             *
             * example )
             * 'HTML'.splice('') = ['H','T','M','L'];
             */
            .split('')
            /**
             * Repeat the process by the arguments for the elements in the target array,
             * stores it in a new array, and returns it.
             */
            .map(function (letter) {
            return "<span class = \"letter\">\n        ".concat(correctLetters.includes(letter) ? letter : '', "\n        </span>\n        ");
        })
            /**
             * Create a string by concatenating the elements
             * in the based on the delimiter specified by the arguments.
             */
            .join(''), "\n    ");
    /**
     * innerText = This method can get HTML inside the elements.
     *
     * replace = Enclose in / /
     * the string to be searched for by the regular expression.
     *
     * The "G" after the slash means  "global match".
     * It is option ti replace all matching characters.
     */
    var innerWord = wordEl.innerText.replace(/[ \n]/g, '');
    /**
     * if innerWord and selectedWord are the same,
     * set Congratulations! You won! 😄 ,
     * and show finalMessage and popup.
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
     * splice = Remove elements after the specified Index number.
     *
     * remove existing hidden word and wrong words in array.
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
