/* questions.js */

const QUESTIONS = [
  { q: "地しんのときは、まず頭をまもる。", answer: true, reason: "机の下にもぐるなどして、落ちてくる物から頭をまもります。", image: "images/001.png", animation: "earthquake-animation" },
  { q: "強いゆれを感じたら、すぐ外へとび出す。", answer: false, reason: "外はガラスやかんばんが落ちてきて危ないです。ゆれがおさまるまで中で身をまもります。", image: "images/002.png", animation: "earthquake-animation" },
  { q: "家の非常用リュックには、水・食べ物・ライト・電池を入れる。", answer: true, reason: "1人1日3リットルくらいの水と、ライトや電池、かんたんな食べ物を入れておきます。", image: "images/003.png" },
  { q: "火事のときはエレベーターに乗る。", answer: false, reason: "止まることがあり、きけんです。かいだんを使います。", image: "images/004.png", animation: "fire-animation" },
  { q: "台風のときは、窓からはなれてカーテンをしめる。", answer: true, reason: "風でガラスが割れることがあります。カーテンでガラスの飛びちりをふせぎます。", image: "images/005.png" },
  { q: "津波のおそれがあるとき、川の近くにあつまる。", answer: false, reason: "津波は川をさかのぼります。高いところや津波避難ビルへにげます。", image: "images/006.png", animation: "wave-animation" },
  { q: "災害時はトイレが使えないことがあるので、かんいトイレがあるとよい。", answer: true, reason: "水や電気が止まると使えません。かんいトイレやビニールぶくろを用意します。", image: "images/007.png" },
  { q: "ゆれを感じたら、すぐガスの元栓をしめに行く。", answer: false, reason: "まずは自分の安全。ゆれがおさまってから火の始末をします。", image: "images/008.png", animation: "fire-animation" },
  { q: "停電のとき、ろうそくを使うと安全だ。", answer: false, reason: "倒れて火事になることがあります。ライトやLEDランタンを使います。", image: "images/009.png", animation: "fire-animation" },
  { q: "避難所では、ならんだり順番をまもる。", answer: true, reason: "みんなで使う場所です。ルールをまもり、助け合います。", image: "images/010.png" },
  { q: "防災ずきんやヘルメットは、頭をまもる。", answer: true, reason: "落ちてくる物からまもり、けがをへらします。", image: "images/011.png" },
  { q: "大雨のとき、用水路やマンホールの近くは安全だ。", answer: false, reason: "水かさが急にふえ、流されることがあります。水辺からはなれます。", image: "images/012.png", animation: "wave-animation" },
  { q: "ハザードマップで自宅や学校の危ない場所を知っておく。", answer: true, reason: "どこがひなん場所かを先に知っておくと、早く動けます。", image: "images/013.png" },
  { q: "土砂災害の前ぶれは、斜面のひび・小石が落ちる・水がにごるなど。", answer: true, reason: "前ぶれを見たら、斜面からはなれてにげます。", image: "images/014.png" },
  { q: "家族へのれんらくは、スマホだけにたよればよい。", answer: false, reason: "通話が混みます。伝言板やSMS、公衆電話なども決めておきます。", image: "images/015.png" },
  { q: "地しんの後、ブロックべいの近くは通っても安心だ。", answer: false, reason: "たおれることがあります。広い道を通ります。", image: "images/016.png" },
  { q: "避難するときは、家のブレーカーを切るとよい。", answer: true, reason: "電気がもどった時の火事（通電火災）をふせぎます。", image: "images/017.png" },
  { q: "避難訓練は、ほんばんでは役に立たない。", answer: false, reason: "体でおぼえることで、あわてずに動けるようになります。", image: "images/018.png" },
  { q: "強いゆれの後は、津波がなくても余しんに注意する。", answer: true, reason: "余しんで物が落ちたり、こわれたりします。気をつけます。", image: "images/019.png", animation: "earthquake-animation" },
  { q: "非常食は、ふだんは食べないほうがよい。", answer: false, reason: "ふだんから食べて補充する（ローリングストック）と、切らさずにすみます。", image: "images/020.png" },
];