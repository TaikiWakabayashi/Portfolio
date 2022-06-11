'use strict'

// コンテナーの取得
const container = document.querySelector('.container');

// 占領されていない全てのシートの取得
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

// カウント（席数）の取得
const count = document.getElementById('count');

// トータル（代金）の取得
const total = document.getElementById('total');

// 映画選択の取得
const movieSelect = document.getElementById('movie');

const movieImage = document.getElementById('selected-movie-image');
const bgImage = document.getElementById('bg');

// バットマン画像URL
const batManUrl = 'picture/the-batman.jpeg';
const batManBackUrl = 'picture/the-batman-back.jpg';

// ドクター・ストレンジ画像URL
const doctorStrangeUrl = 'picture/Doctor-Strange-2.jpeg';
const doctorStrangeBackUrl = 'picture/Doctor-Strang2-back.jpg';

// スパイダーマン画像URL
const spiderManUrl = 'picture/spiderman.jpg';
const spiderManBackUrl = 'picture/Spider-Man-No-Way-Home-back.jpg';

// ジャスティスリーグ画像URL
const justiceLeagueUrl = 'picture/justisleague.jpeg';
const justiceLeagueBackUrl = 'picture/justice-league-back.jpeg';


// メソッド実行
 populateUI();


// チケットの値段を取得
// 変数の前に + を書く理由は、代入する値を”数値（number）”として代入するため
// +　をつけないとticketPriceの方はany、+をつけるとnumberになる。
let ticketPrice = +movieSelect.value;


// プルダウンのインデックス番号と金額の取得メソッド
function setMovieData(movieIndex, moviePrice){

    if(movieIndex != null){

        if(movieIndex == 0){
            movieImage.style.backgroundImage = "url(" + batManUrl + ")";
            bgImage.style.backgroundImage = "url(" + batManBackUrl + ")";

        }else if(movieIndex == 1){
            movieImage.style.backgroundImage = "url(" + doctorStrangeUrl + ")";
            bgImage.style.backgroundImage = "url(" + doctorStrangeBackUrl + ")";

        }else if(movieIndex == 2){
            movieImage.style.backgroundImage = "url(" + spiderManUrl + ")";
            bgImage.style.backgroundImage = "url(" + spiderManBackUrl + ")";

        }else if(movieIndex == 3){
            movieImage.style.backgroundImage = "url(" + justiceLeagueUrl + ")";
            bgImage.style.backgroundImage = "url(" + justiceLeagueBackUrl + ")";
        }
    }
    
    // localStorage = Javascriptでブラウザにデータを登録するWeb API
    sessionStorage.setItem('selectedMovieIndex', movieIndex);
    sessionStorage.setItem('selectedMoviePrice', moviePrice);

}



// カウント（席数）とトータル（代金）を更新
function updateSelectedCount(){

    // 選択したシートを取得
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    /*
     * 1.[...]はスプレッド構文。変数の値を配列に変換する方法の１つ。

     * 2.定数　selectedSeats　は、selectedクラスを持つシート全てを値にもつ。

     * 3.定数　seatsIndex は、選択シートのインデックス番号を格納する定数。

     * 4.[...selectedSeats]にmapメソッドを使用し、新たに配列を生成し、seatsIndexに値を格納。

     * 5.mapメソッド内の seat は、selectedSeats配列にある値を一つ取り出し、格納されている。

     * 6.[...seats]は占領されていない全てのシートを格納した配列。

     * 7.[...seats]配列にindexOfメソッドを使用し、[...seats]配列内に選択したシートがあるか確認。
     * あれば[...selectedSeats]配列にindex番号を格納。
    
     * 
     * 
     */
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    console.log([...seats]);
    console.log(seatsIndex);

    // シートの席番号をJSON文字列にして格納？？
    // JSON.stringify = JSON形式の文字列に変換するメソッド
    // JSON.stringify = Javascriptオブジェクトを取得し、JSON文字列を返す
    // selectedSeats　と名して、選択したシートのインデックス番号を格納。
    sessionStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    console.log(JSON.stringify(seatsIndex));

    // 選択した席数をカウントして格納
    const selectedSeatsCount = selectedSeats.length;

     // HTML内のid="count"タグの値を再設定
    count.innerText = selectedSeatsCount;

    // HTML内のid="total"タグの値を再設定
    total.innerText = selectedSeatsCount * ticketPrice;

    // 選択した映画のプルダウンのインデックスとvalue（値段）を記録
    setMovieData(movieSelect.selectedIndex, movieSelect.value);
}


// localStorageからデータの取得
function populateUI() {

    // JSON.parse = JSON文字列を取得し、Javascriptオブジェクトにして返す
    // localStorage にセットしたselectedSeatsを取得
    const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats'));

    console.log(selectedSeats);

    console.log(sessionStorage.getItem('selectedSeats'));

    console.log(JSON.parse(sessionStorage.getItem('selectedSeats')));

    // JSON.parseでJavascriptオブジェクトに変換されたselectedSeatsを確認。
    if(selectedSeats != null && selectedSeats.length > 0) {

        /*
         * seat　→ seats(占領されていない全てのシートを格納した変数)の値を１つ格納。
         * index　→ seatのインデック番号。
         * selectedSeatsにindexOfメソッドを使用。
         * selectedSeatsに格納されている値のインデックス番号とseats配列に格納されているシートのインデックス番号を比較し、
         * 同じものがあるか確認。
         * あればseatsの値に、selectedクラスを付与する。
         * ↑ 上記の処理を行わないと、その後クリックイベントでselectedクラスを外すことができない。
         */
        seats.forEach((seat, index) => {

            console.log(index);

            // indexOfメソッドは引数に
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = sessionStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex != null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}


// 映画を選択・取得
movieSelect.addEventListener('change', e => {

    console.log(e.target.value);

    console.log(movieSelect.value);

    // 変数の前に + を書く理由は、代入する値を”数値（number）”として代入するため
    // +　をつけないとticketPriceの方はany、+をつけるとnumberになる。
    ticketPrice = +e.target.value;

    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// シートクリック時のイベント
container.addEventListener('click', e => {

    console.log(e.target);

    if(
        e.target.classList.contains('seat') && !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

updateSelectedCount();
