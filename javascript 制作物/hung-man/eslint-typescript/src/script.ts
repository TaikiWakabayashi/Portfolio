
const wordEl: HTMLElement = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

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
         * split = 対象の文字列を引数で指定した文字列で分割し、
         * 分割された文字列をそれぞれの要素として　"格納した配列"　として返す。
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