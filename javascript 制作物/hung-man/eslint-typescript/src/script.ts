
const wordEl: HTMLElement = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

/**
 * TypescriptでquerySelector もしくは querySelectorAllを使用するなら。
 * <>ジェネリクスで型を指定すること。（そのままだとNodeList<Element>になり、styleが使えないなど面倒。
 */
const figureParts = document.querySelectorAll<HTMLElement>('.figure-part');

const words: string[] = ['application', 'Typescript', 'engineering', 'prototype', 'interface'];


let selectedWord: string = words[Math.floor(Math.random() * words.length)];

let playable: boolean = true;

const correctLetters: string[] = [];
const wrongLetters: string[] = [];

/**
 * show hidden word
 */
function displayWord() {

    /**
     * innerHTML = 要素内のHTMLを設定することができる。
     */
    wordEl.innerHTML = 
    `${selectedWord
        /**
         * split = 対象の文字列を引数で指定した文字で分割し、
         * 分割された文字列をそれぞれの要素として "格納した配列" として返す。
         */
        .split('')
        /**
         * 対象の配列に対し、順番に同じ引数内の処理を繰り返し、
         * 新しい配列として返す。
         */
        .map(letter => 
        `<span class = "letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `)
        /**
         * 対象の配列に対し、引数で指定した区切り文字をもとに、
         * 全要素を順に連結した "文字列" を作成する。
         */
        .join('')}
    `;

    /**
     * innerText = 要素内のテキストを取得する。
     * 
     * replace = 正規表現で検索する文字列を/ /で囲む。
     * また、/の後につく"g"はグローバルマッチといい、一致したものを全て置換するオプション。
     */
    const innerWord: string = wordEl.innerText.replace(/[ \n]/g, '');

    /**
     * ランダムで選択された文字と、入力した文字が同じだった場合、
     * finalMessageにメッセージを表示し、
     * 入力して明らかになった文字列（finalMessageRevealWord）を初期化する。
     */
    if(innerWord == selectedWord) {
        finalMessage.innerText = 'Congratulations! You won! 😄 ';
        finalMessageRevealWord.innerText = '';
        popup.style.display = 'flex';

        playable = false;
    }
};

/**
 * Update the wrong letters
 */

function updateWrongLettersEl() {

    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // check if lost.
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        finalMessageRevealWord.innerText = `...the word was ${selectedWord}`;
        popup.style.display = 'flex';

        playable = false;
    }
};

// show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// keydown letter press
window.addEventListener('keydown', e => {
    if(playable) {
        if(e.key.match(/[A-Z]/)){
            const letter = e.key.toLowerCase();

            if(selectedWord.includes(letter)) {
                if(!correctLetters.includes(letter)) {
                    correctLetters.push(letter);

                    displayWord();
                } else {
                    showNotification();
                }
            } else {
                if(!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);

                    updateWrongLettersEl();
                } else {
                    showNotification();
                }
            }
        }
    }
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    playable = true;

    // Empty arrays
    /**
     * splice = 引数で指定したindex以降の要素を取り除く
     */
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
});


displayWord();