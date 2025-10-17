/* questions.js */

// 全ての言語の問題を格納するオブジェクト
const QUESTIONS_ALL_LANG = {
    // ------------------------------------
    // ◆ 日本語 (ja) - デフォルト (20問)
    // ------------------------------------
    ja: [
      { q: "地しんのときは、まず頭をまもる。", answer: true, reason: "机の下にもぐるなどして、落ちてくる物から頭をまもります。", image: "images/001.webp", animation: "earthquake-animation" },
      { q: "強いゆれを感じたら、すぐ外へとび出す。", answer: false, reason: "外はガラスやかんばんが落ちてきて危ないです。ゆれがおさまるまで中で身をまもります。", image: "images/002.webp", animation: "earthquake-animation" },
      { q: "家の非常用リュックには、水・食べ物・ライト・電池を入れる。", answer: true, reason: "1人1日3リットルくらいの水と、ライトや電池、かんたんな食べ物を入れておきます。", image: "images/003.webp" },
      { q: "火事のときはエレベーターに乗る。", answer: false, reason: "止まることがあり、きけんです。かいだんを使います。", image: "images/004.webp", animation: "fire-animation" },
      { q: "台風のときは、窓からはなれてカーテンをしめる。", answer: true, reason: "風でガラスが割れることがあります。カーテンでガラスの飛びちりをふせぎます。", image: "images/005.webp" },
      { q: "津波のおそれがあるとき、川の近くにあつまる。", answer: false, reason: "津波は川をさかのぼります。高いところや津波避難ビルへにげます。", image: "images/006.webp", animation: "wave-animation" },
      { q: "災害時はトイレが使えないことがあるので、かんいトイレがあるとよい。", answer: true, reason: "水や電気が止まると使えません。かんいトイレやビニールぶくろを用意します。", image: "images/007.webp" },
      { q: "ゆれを感じたら、すぐガスの元栓をしめに行く。", answer: false, reason: "まずは自分の安全。ゆれがおさまってから火の始末をします。", image: "images/008.webp", animation: "fire-animation" },
      { q: "停電のとき、ろうそくを使うと安全だ。", answer: false, reason: "倒れて火事になることがあります。ライトやLEDランタンを使います。", image: "images/009.webp", animation: "fire-animation" },
      { q: "避難所では、ならんだり順番をまもる。", answer: true, reason: "みんなで使う場所です。ルールをまもり、助け合います。", image: "images/010.webp" },
      { q: "防災ずきんやヘルメットは、頭をまもる。", answer: true, reason: "落ちてくる物からまもり、けがをへらします。", image: "images/011.webp" },
      { q: "大雨のとき、用水路やマンホールの近くは安全だ。", answer: false, reason: "水かさが急にふえ、流されることがあります。水辺からはなれます。", image: "images/012.webp", animation: "wave-animation" },
      { q: "ハザードマップで自宅や学校の危ない場所を知っておく。", answer: true, reason: "どこがひなん場所かを先に知っておくと、早く動けます。", image: "images/013.webp" },
      { q: "土砂災害の前ぶれは、斜面のひび・小石が落ちる・水がにごるなど。", answer: true, reason: "前ぶれを見たら、斜面からはなれてにげます。", image: "images/014.webp" },
      { q: "家族へのれんらくは、スマホだけにたよればよい。", answer: false, reason: "通話が混みます。伝言板やSMS、公衆電話なども決めておきます。", image: "images/015.webp" },
      { q: "地しんの後、ブロックべいの近くは通っても安心だ。", answer: false, reason: "たおれることがあります。広い道を通ります。", image: "images/016.webp" },
      { q: "避難するときは、家のブレーカーを切るとよい。", answer: true, reason: "電気がもどった時の火事（通電火災）をふせぎます。", image: "images/017.webp" },
      { q: "避難訓練は、ほんばんでは役に立たない。", answer: false, reason: "体でおぼえることで、あわてずに動けるようになります。", image: "images/018.webp" },
      { q: "強いゆれの後は、津波がなくても余しんに注意する。", answer: true, reason: "余しんで物が落ちたり、こわれたりします。気をつけます。", image: "images/019.webp", animation: "earthquake-animation" },
      { q: "非常食は、ふだんは食べないほうがよい。", answer: false, reason: "ふだんから食べて補充する（ローリングストック）と、切らさずにすみます。", image: "images/020.webp" },
    ],
    
    // ------------------------------------
    // ◆ 英語 (en) - (20問)
    // ------------------------------------
    en: [
      { q: "During an earthquake, first protect your head.", answer: true, reason: "Dive under a desk or similar object to protect your head from falling debris.", image: "images/001.webp", animation: "earthquake-animation" },
      { q: "If you feel a strong tremor, rush outside immediately.", answer: false, reason: "Outside is dangerous due to falling objects. Protect yourself inside until the shaking stops.", image: "images/002.webp", animation: "earthquake-animation" },
      { q: "Your emergency backpack should contain water, food, a light, and batteries.", answer: true, reason: "Include about 3 liters of water per person per day, a light, batteries, and simple food.", image: "images/003.webp" },
      { q: "Use the elevator during a fire.", answer: false, reason: "It might stop and is dangerous. Use the stairs.", image: "images/004.webp", animation: "fire-animation" },
      { q: "During a typhoon, stay away from windows and close the curtains.", answer: true, reason: "Glass may shatter due to wind. Curtains prevent glass from scattering.", image: "images/005.webp" },
      { q: "If there is a tsunami risk, gather near the river.", answer: false, reason: "Tsunamis can travel up rivers. Evacuate to high ground or a tsunami evacuation building.", image: "images/006.webp", animation: "wave-animation" },
      { q: "Having a simple portable toilet is useful as toilets might be unusable during a disaster.", answer: true, reason: "Toilets won't work if water or power stops. Prepare a simple toilet or plastic bags.", image: "images/007.webp" },
      { q: "If you feel a tremor, immediately go and turn off the main gas valve.", answer: false, reason: "Prioritize your own safety first. Handle the fire/gas after the shaking stops.", image: "images/008.webp", animation: "fire-animation" },
      { q: "Using candles during a blackout is safe.", answer: false, reason: "They can fall and cause a fire. Use flashlights or LED lanterns.", image: "images/009.webp", animation: "fire-animation" },
      { q: "At an evacuation center, line up and follow the order.", answer: true, reason: "It's a shared space. Follow the rules and help each other.", image: "images/010.webp" },
      { q: "Disaster hoods and helmets protect your head.", answer: true, reason: "They protect you from falling objects and reduce injuries.", image: "images/011.webp" },
      { q: "During heavy rain, areas near irrigation channels and manholes are safe.", answer: false, reason: "Water levels can rise suddenly and sweep you away. Stay away from bodies of water.", image: "images/012.webp", animation: "wave-animation" },
      { q: "Use a hazard map to know the dangerous spots near your home and school.", answer: true, reason: "Knowing the evacuation locations beforehand allows you to act quickly.", image: "images/013.webp" },
      { q: "Pre-signs of a sediment disaster include cracks in slopes, falling pebbles, and cloudy water.", answer: true, reason: "If you see pre-signs, move away from the slope and evacuate.", image: "images/014.webp" },
      { q: "You only need to rely on your smartphone for family contact.", answer: false, reason: "Calls will be congested. Decide on message boards, SMS, and public phones as alternatives.", image: "images/015.webp" },
      { q: "After an earthquake, it is safe to pass near concrete block walls.", answer: false, reason: "They can collapse. Use wide roads.", image: "images/016.webp" },
      { q: "It is good to turn off the main breaker when evacuating.", answer: true, reason: "This prevents electrical fires (flashover) when power returns.", image: "images/017.webp" },
      { q: "Evacuation drills are useless in a real situation.", answer: false, reason: "Repeating drills allows you to move without panic by learning through muscle memory.", image: "images/018.webp" },
      { q: "After a strong tremor, watch out for aftershocks, even without a tsunami.", answer: true, reason: "Aftershocks can cause objects to fall or break. Be careful.", image: "images/019.webp", animation: "earthquake-animation" },
      { q: "You should not normally eat emergency food.", answer: false, reason: "Eating and replacing it regularly (rolling stock) prevents you from running out.", image: "images/020.webp" },
    ],

    // ------------------------------------
    // ◆ フランス語 (fr) - (20問)
    // ------------------------------------
    fr: [
      { q: "En cas de séisme, protégez d'abord votre tête.", answer: true, reason: "Mettez-vous sous un bureau, etc., pour vous protéger des chutes d'objets.", image: "images/001.webp", animation: "earthquake-animation" },
      { q: "Si la secousse est forte, sortez immédiatement.", answer: false, reason: "Dehors, les objets tombent (verre, enseignes). Protégez-vous à l'intérieur jusqu'à ce que cela cesse.", image: "images/002.webp", animation: "earthquake-animation" },
      { q: "Le sac d'urgence doit contenir eau, nourriture, lampe et piles.", answer: true, reason: "Prévoyez environ 3L d'eau par jour/pers., une lampe, des piles et des aliments de base.", image: "images/003.webp" },
      { q: "Prenez l'ascenseur en cas d'incendie.", answer: false, reason: "Il peut s'arrêter et être dangereux. Utilisez les escaliers.", image: "images/004.webp", animation: "fire-animation" },
      { q: "Lors d'un typhon, éloignez-vous des fenêtres et fermez les rideaux.", answer: true, reason: "Le verre peut se briser. Les rideaux empêchent les fragments de se disperser.", image: "images/005.webp" },
      { q: "En cas de risque de tsunami, rassemblez-vous près de la rivière.", answer: false, reason: "Le tsunami remonte les rivières. Fuyez vers un terrain élevé ou un bâtiment anti-tsunami.", image: "images/006.webp", animation: "wave-animation" },
      { q: "Il est bon d'avoir des toilettes portables en cas de désastre.", answer: true, reason: "Ils ne fonctionnent pas sans eau/électricité. Préparez des toilettes simples ou des sacs.", image: "images/007.webp" },
      { q: "En cas de secousse, allez immédiatement couper le gaz.", answer: false, reason: "Votre sécurité d'abord. Coupez le gaz après l'arrêt des secousses.", image: "images/008.webp", animation: "fire-animation" },
      { q: "L'utilisation de bougies est sûre pendant une panne de courant.", answer: false, reason: "Elles peuvent tomber et provoquer un incendie. Utilisez des lampes de poche ou des lanternes LED.", image: "images/009.webp", animation: "fire-animation" },
      { q: "Dans un abri, faites la queue et respectez l'ordre.", answer: true, reason: "C'est un espace partagé. Respectez les règles et entraidez-vous.", image: "images/010.webp" },
      { q: "Les casques et cagoules de secours protègent la tête.", answer: true, reason: "Ils protègent des chutes d'objets et réduisent les blessures.", image: "images/011.webp" },
      { q: "Les abords des égouts sont sûrs lors de fortes pluies.", answer: false, reason: "L'eau peut monter et emporter. Restez loin des cours d'eau.", image: "images/012.webp", animation: "wave-animation" },
      { q: "Utilisez une carte des risques pour connaître les dangers près de chez vous.", answer: true, reason: "Savoir où sont les abris permet d'agir plus vite.", image: "images/013.webp" },
      { q: "Fissures et eau trouble sont des signes de glissement de terrain.", answer: true, reason: "Si vous voyez ces signes, éloignez-vous de la pente et fuyez.", image: "images/014.webp" },
      { q: "Pour contacter la famille, fiez-vous uniquement au smartphone.", answer: false, reason: "Les appels sont saturés. Prévoyez tableaux d'affichage, SMS, ou téléphones publics.", image: "images/015.webp" },
      { q: "Après un séisme, il est sûr de passer près des murs en parpaing.", answer: false, reason: "Ils peuvent s'effondrer. Utilisez les routes larges.", image: "images/016.webp" },
      { q: "Il est bon de couper le disjoncteur en évacuant.", answer: true, reason: "Cela prévient les incendies électriques au retour du courant.", image: "images/017.webp" },
      { q: "Les exercices d'évacuation sont inutiles en cas réel.", answer: false, reason: "Les répéter vous permet d'agir sans paniquer en situation réelle.", image: "images/018.webp" },
      { q: "Après une forte secousse, attention aux répliques, même sans tsunami.", answer: true, reason: "Les répliques peuvent faire tomber des objets ou endommager. Soyez prudent.", image: "images/019.webp", animation: "earthquake-animation" },
      { q: "Il ne faut pas manger les rations d'urgence habituellement.", answer: false, reason: "Les consommer et les remplacer régulièrement (stock tournant) évite d'en manquer.", image: "images/020.webp" },
    ],
};

// quiz.jsでアクセスしやすいように、現在の言語の問題オブジェクトを変数に設定
// 初期値は日本語 (ja) を想定。quiz.jsのsetLanguage関数で更新されます。
let QUESTIONS = QUESTIONS_ALL_LANG.ja;