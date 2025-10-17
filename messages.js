/* messages.js */

// 全ての言語のメッセージを格納するオブジェクト
const MESSAGES_ALL_LANG = {
    // ------------------------------------
    // ◆ 日本語 (ja) - デフォルト (更新)
    // ------------------------------------
    ja: {
        // 全体・タイトル
        appTitle: "防災○×クイズ", // index.html <title>タグ用

        // ヘッダーバー (renderHeader関数内で使用)
        headerTitle: "防災○×クイズ", // ヘッダー中央のタイトル（オープニング時など）
        headerModeQuiz: "クイズモード",
        headerModeLearn: "学習モード",
        headerScore: "正解: ", // ヘッダーのスコア表示用
        questionUnit: " 問目",
        prevQuestion: "前の問題",
        nextQuestion: "次の問題",
        nextModeQuiz: "クイズモードへ", // 遷移先のモード名
        nextModeLearn: "学習モードへ", // 遷移先のモード名
        soundTextOff: "サウンドON",
        soundTextOn: "サウンドOFF",
        themeChange: "テーマ変更",
        reset: "リセット",

        // オープニング画面 (renderContent関数内で使用)
        openingTitle: "防災○×クイズ",
        openingSubtitle: "全{QUESTIONS_LENGTH}問で防災の知識をチェック！", // {QUESTIONS_LENGTH}はJSで置換
        startQuizButton: "🎮 {MODE}で開始する 🎮", // {MODE}はJSで置換

        // クイズ・回答画面 (renderContent関数内で使用)
        imageAlt: "問題の画像", // 画像のaltテキスト
        promptText: "答えを選んでください", // クイズモード時
        promptTextLearn: "○ か × か", // 学習モード時
        showAnswerButton: "答えを見る ✨",

        // 回答画面
        answerToQuestion: "問題に戻る",
        nextQuestionButton: "→ 次の問題 ",
        endingButton: "🎉 終了画面へ ",

        // 終了画面 (renderContent関数内で使用)
        endingTitleQuiz: "🎉 クイズ終了！おつかれさまでした！ 🎉",
        endingTitleLearn: "学習終了！おつかれさまでした！",
        endingScoreMessage: "{SCORE} / {TOTAL} 問 正解！", // {SCORE}/{TOTAL}はJSで置換
        endingMessageLine1: "防災の知識は身についたかな？",
        endingMessageLine2: "今日学んだことを忘れず、災害に備えましょう！",
        endingButtonShowResults: "結果を一覧で見る →",

        // 結果一覧画面 (renderContent関数内で使用)
        resultsTitle: "クイズ結果一覧",
        resultsSummary: "全{TOTAL}問中、**{SCORE}問** 正解しました！", // {TOTAL}/{SCORE}はJSで置換
        resultsTableNo: "No.",
        resultsTableQuestion: "問題文",
        resultsTableCorrect: "正答",
        resultsTableUser: "あなたの回答",
        resultsUnanswered: "未回答",
        resultsCorrectText: "正解",
        resultsWrongText: "不正解",
        resultsBackToEnding: "← 終了画面に戻る",

        // トースト/キーボードヘルプ (showKeyboardHelp関数内で使用)
        toastQuizMessage: "【クイズ】 O または Enter: 正解, X または Space: 不正解",
        toastLearnMessage: "【学習】 Enter / →: 答えを見る / 次へ, ←: 前へ",
        toastNextQuestion: "次の問題へ移動しました",
        toastAnswerCorrect: "正解！",
        toastAnswerWrong: "残念...",
    },

    // ------------------------------------
    // ◆ 英語 (en) - 短い文言で翻訳
    // ------------------------------------
    en: {
        // Overall / Title
        appTitle: "Disaster Quiz",

        // Header Bar
        headerTitle: "Disaster Quiz",
        headerModeQuiz: "Quiz Mode",
        headerModeLearn: "Study Mode",
        headerScore: "Score: ",
        questionUnit: " Q",
        prevQuestion: "Previous Q",
        nextQuestion: "Next Q",
        nextModeQuiz: "To Quiz Mode",
        nextModeLearn: "To Study Mode",
        soundTextOff: "Sound ON",
        soundTextOn: "Sound OFF",
        themeChange: "Change Theme",
        reset: "Reset",

        // Opening Screen
        openingTitle: "Disaster Quiz",
        openingSubtitle: "Check your disaster knowledge with {QUESTIONS_LENGTH} questions!",
        startQuizButton: "🎮 Start in {MODE} 🎮",

        // Quiz / Answer Screen
        imageAlt: "Question image",
        promptText: "Choose your answer",
        promptTextLearn: "True (O) or False (X)",
        showAnswerButton: "Show Answer ✨",

        // Answer Screen
        answerToQuestion: "Back to Question",
        nextQuestionButton: "→ Next Question ",
        endingButton: "🎉 Go to End Screen ",

        // Ending Screen
        endingTitleQuiz: "🎉 Quiz Finished! Great work! 🎉",
        endingTitleLearn: "Study Finished! Great work!",
        endingScoreMessage: "{SCORE} / {TOTAL} Correct!",
        endingMessageLine1: "Did you learn about disaster preparedness?",
        endingMessageLine2: "Remember what you learned and be prepared!",
        endingButtonShowResults: "Show Results List →",

        // Results List Screen
        resultsTitle: "Quiz Results List",
        resultsSummary: "You got **{SCORE}** out of {TOTAL} questions correct!",
        resultsTableNo: "No.",
        resultsTableQuestion: "Question",
        resultsTableCorrect: "Correct",
        resultsTableUser: "Your Answer",
        resultsUnanswered: "Unanswered",
        resultsCorrectText: "Correct",
        resultsWrongText: "Wrong",
        resultsBackToEnding: "← Back to Ending",

        // Toast / Keyboard Help
        toastQuizMessage: "【Quiz】 O or Enter: True, X or Space: False",
        toastLearnMessage: "【Study】 Enter / →: Answer / Next, ←: Previous",
        toastNextQuestion: "Moved to next question",
        toastAnswerCorrect: "Correct!",
        toastAnswerWrong: "Wrong...",
    },

    // ------------------------------------
    // ◆ フランス語 (fr) - 短い文言で翻訳
    // ------------------------------------
    fr: {
        // Overall / Title
        appTitle: "Quiz Secours",

        // Header Bar
        headerTitle: "Quiz Secours",
        headerModeQuiz: "Mode Quiz",
        headerModeLearn: "Mode Étude",
        headerScore: "Score: ",
        questionUnit: " Q",
        prevQuestion: "Q. Précédente",
        nextQuestion: "Q. Suivante",
        nextModeQuiz: "Vers Quiz",
        nextModeLearn: "Vers Étude",
        soundTextOff: "Son ON",
        soundTextOn: "Son OFF",
        themeChange: "Thème",
        reset: "Reset",

        // Opening Screen
        openingTitle: "Quiz Secours",
        openingSubtitle: "Vérifiez vos connaissances avec {QUESTIONS_LENGTH} questions!",
        startQuizButton: "🎮 Commencer en {MODE} 🎮",

        // Quiz / Answer Screen
        imageAlt: "Image question",
        promptText: "Choisissez la réponse",
        promptTextLearn: "Vrai (O) ou Faux (X)",
        showAnswerButton: "Voir Rép. ✨",

        // Answer Screen
        answerToQuestion: "Retour Question",
        nextQuestionButton: "→ Q. Suivante ",
        endingButton: "🎉 Vers Fin ",

        // Ending Screen
        endingTitleQuiz: "🎉 Quiz Terminé! Bravo! 🎉",
        endingTitleLearn: "Étude Terminée! Bravo!",
        endingScoreMessage: "{SCORE} / {TOTAL} Correct!",
        endingMessageLine1: "Avez-vous appris sur la préparation?",
        endingMessageLine2: "N'oubliez pas ce que vous avez appris et soyez prêt!",
        endingButtonShowResults: "Voir la Liste des Résultats →",

        // Results List Screen
        resultsTitle: "Liste des Résultats",
        resultsSummary: "Vous avez **{SCORE}** bonnes réponses sur {TOTAL} questions!",
        resultsTableNo: "No.",
        resultsTableQuestion: "Question",
        resultsTableCorrect: "Correct",
        resultsTableUser: "Votre Rép.",
        resultsUnanswered: "Sans Rép.",
        resultsCorrectText: "Correct",
        resultsWrongText: "Faux",
        resultsBackToEnding: "← Retour à la Fin",

        // Toast / Keyboard Help
        toastQuizMessage: "【Quiz】 O ou Entrée: Vrai, X ou Espace: Faux",
        toastLearnMessage: "【Étude】 Entrée / →: Rép. / Suivant, ←: Précédent",
        toastNextQuestion: "Passé à la question suivante",
        toastAnswerCorrect: "Correct!",
        toastAnswerWrong: "Dommage...",
    }
};

// quiz.jsでアクセスしやすいように、現在の言語のメッセージオブジェクトを変数に設定
// 初期値は日本語 (ja) を想定。quiz.jsのsetLanguage関数で更新されます。
let MESSAGES = MESSAGES_ALL_LANG.ja;