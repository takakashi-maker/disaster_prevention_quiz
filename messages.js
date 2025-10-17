/* messages.js */

const MESSAGES = {
    // 全体・タイトル
    appTitle: "防災○×クイズ", // index.html <title>タグ用
    
    // ヘッダーバー (renderHeader関数内で使用)
    headerTitle: "防災○×クイズ", // ヘッダー中央のタイトル（オープニング時など）
    headerModeQuiz: "○×クイズモード",
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
    toastLearnMessage: "【学習】 Enter / →: 答えを見る / 次へ, ←: 前へ"
};