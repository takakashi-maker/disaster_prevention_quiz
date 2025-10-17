/* quiz.js */

// アプリケーション状態
let currentIndex = 0;
let currentPhase = 'opening';
let isAnimating = false;
let score = 0;
// 初期値を LocalStorageから取得（未設定ならクイズモード true）
let quizMode = JSON.parse(localStorage.getItem('quizMode')) !== false; 
// 効果音のオン/オフ設定
let isSoundOn = JSON.parse(localStorage.getItem('isSoundOn')) !== false;

// 🎨 テーマ管理
const THEMES = ['default', 'autumn', 'halloween'];
let currentTheme = localStorage.getItem('quizTheme') || THEMES[0];
let currentThemeIndex = THEMES.indexOf(currentTheme); 

// 国旗の定義 (テーマの順番と合わせる)
const FLAGS = ['🇯🇵', '🇺🇸', '🇫🇷'];
let currentFlagIndex = JSON.parse(localStorage.getItem('currentFlagIndex')) || 0;

// 初期化時にテーマを適用
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    document.title = MESSAGES.appTitle; // ★タイトル設定を追加
    render(); 
    updateFlag(currentThemeIndex);
});

// テーマ適用関数
function applyTheme(theme) {
    document.body.className = `theme-${theme}`;
    localStorage.setItem('quizTheme', theme);
    currentTheme = theme;
    currentThemeIndex = THEMES.indexOf(currentTheme);
}

// 国旗のみを切り替える関数（右下のボタン用）
function cycleLanguage() {
    playClickSound(); 
    
    // インデックスを循環させる (0 -> 1 -> 2 -> 0...)
    currentFlagIndex = (currentFlagIndex + 1) % FLAGS.length;
    
    // LocalStorageに保存
    localStorage.setItem('currentFlagIndex', currentFlagIndex);
    
    // 国旗アイコンを更新
    updateFlag(currentFlagIndex);
    
    // render()の再実行は不要。ヘッダー表示を更新する必要がないため。
}


// 国旗を更新するヘルパー関数
function updateFlag(index) {
    const flagElement = document.getElementById('current-flag');
    if (flagElement) {
        flagElement.textContent = FLAGS[index];
    }
}

// テーマ変更関数
function changeTheme() {
    playClickSound(); 
    currentThemeIndex = (currentThemeIndex + 1) % THEMES.length;
    applyTheme(THEMES[currentThemeIndex]);
    render();
}

// モード切り替え関数
function toggleMode() {
    playClickSound();
    quizMode = !quizMode;
    localStorage.setItem('quizMode', quizMode); // LocalStorageに保存
    // オープニング画面なら画面を再描画
    if (currentPhase === 'opening') {
        render();
        return;
    }
    // クイズ中なら問題をリセットして新しいモードで開始
    startQuiz(quizMode, true);
}

// 効果音切り替え関数
function toggleSound() {
    isSoundOn = !isSoundOn;
    localStorage.setItem('isSoundOn', isSoundOn); // LocalStorageに保存
    render();
    if(isSoundOn) {
        playClickSound(); // 音がオンになった時だけクリック音を鳴らす
    }
}


// ----------------------------------------------------
// 音声管理 (効果音オン/オフ機能を追加)
// ----------------------------------------------------
function playCorrectSound() {
    if (!isSoundOn) return;
    const sound = document.getElementById('sound-correct');
    if (sound) {
        sound.currentTime = 0; 
        sound.play().catch(e => console.error("Correct sound error:", e));
    }
}
function playWrongSound() {
    if (!isSoundOn) return;
    const sound = document.getElementById('sound-wrong');
    if (sound) {
        sound.currentTime = 0; 
        sound.play().catch(e => console.error("Wrong sound error:", e));
    }
}
function playClickSound() {
    if (!isSoundOn) return;
    const sound = document.getElementById('sound-click');
    if (sound) {
        sound.currentTime = 0; 
        sound.play().catch(e => console.error("Click sound error:", e));
    }
}

// ----------------------------------------------------
// UI/アニメーション
// ----------------------------------------------------
function updateProgress() {
    const progress = document.getElementById('progress-bar');
    if (progress) {
        if (currentPhase === 'question' || currentPhase === 'answer') {
            const percentage = ((currentIndex + 1) / QUESTIONS.length) * 100;
            progress.style.width = `${percentage}%`;
            progress.style.display = 'block';
        } else {
            progress.style.width = `0%`; 
        }
    }
}

function applyAnimation(elementId, animationType) {
    const element = document.getElementById(elementId);
    if (!element || !animationType) return;
    
    element.classList.remove('animated', 'earthquake-animation', 'fire-animation', 'wave-animation');

    setTimeout(() => {
        if (animationType === 'earthquake') {
            element.classList.add('animated', 'earthquake-animation');
        } else if (animationType === 'fire') {
            element.classList.add('animated', 'fire-animation');
        } else if (animationType === 'wave') {
            element.classList.add('animated', 'wave-animation');
        }
    }, 10);
}

function animateTransition(callback) {
    isAnimating = true;
    render();
    setTimeout(() => {
        callback();
        isAnimating = false;
        render();
    }, 300); 
}

// ----------------------------------------------------
// キーボードヘルプ/トースト機能 (文言をMESSAGESから取得)
// ----------------------------------------------------
let toastTimeout;

// トーストを表示する関数
function showKeyboardHelp() {
    playClickSound();

    const container = document.getElementById('toast-container');
    // すでにトーストが表示されていたら非表示にする
    if (container.querySelector('.toast')) {
        hideKeyboardHelp();
        return;
    }
    
    // モードに応じてメッセージを生成
    let message;
    if (quizMode) {
        message = MESSAGES.toastQuizMessage; 
    } else {
        message = MESSAGES.toastLearnMessage; 
    }

    const toastHTML = `<div class="toast">${message}</div>`;
    container.innerHTML = toastHTML;
    const toast = container.querySelector('.toast');

    // 表示アニメーション
    setTimeout(() => {
        toast.classList.add('show');
        
        // 3秒後に非表示タイマーをセット
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(hideKeyboardHelp, 3000);
    }, 10);
}

// トーストを非表示にする関数
function hideKeyboardHelp() {
    const container = document.getElementById('toast-container');
    const toast = container ? container.querySelector('.toast') : null;
    
    if (toast) {
        toast.classList.remove('show');
        clearTimeout(toastTimeout);

        // アニメーション後にDOMから削除
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    }
}

// ----------------------------------------------------
// ヘッダーレンダリング関数 (文言をMESSAGESから取得)
// ----------------------------------------------------
function renderHeader() {
    const headerBar = document.getElementById('header-bar');
    if (!headerBar) return; 
    
    let statusContent = ''; 
    let controlContent = ''; 

    // 左側: ステータス/モード表示
    if (currentPhase === 'question' || currentPhase === 'answer') {
        const scoreHtml = quizMode ? `<span class="score-display">${MESSAGES.headerScore}${score}</span>` : ''; 
        
        const prevBtn = `<button class="btn btn-sm btn-back" onclick="previousQuestion()" ${currentIndex === 0 ? 'disabled' : ''}>
            <span class="icon">←</span> <span class="text">${MESSAGES.prevQuestion}</span>
        </button>`; 
        const nextBtn = `<button class="btn btn-sm btn-back" onclick="nextQuestion()" ${currentIndex === QUESTIONS.length - 1 ? 'disabled' : ''}>
            <span class="text">${MESSAGES.nextQuestion}</span> <span class="icon">→</span>
        </button>`; 

        statusContent = `
            ${prevBtn}
            <span class="question-count">${currentIndex + 1} / ${QUESTIONS.length}${MESSAGES.questionUnit}</span> 
            ${scoreHtml}
            ${nextBtn}
        `;
        
    } else {
        // オープニング/エンディング/結果一覧
        
        const titleText = currentPhase === 'results' ? MESSAGES.headerModeQuiz : MESSAGES.headerTitle;
        statusContent = `<span class="mode-display" style="font-weight: 900; font-size: 1.3rem;">${titleText}</span>`; 
    }
    
    // 右側: コントロールエリア (文言をMESSAGESから取得)
    const currentThemeDisplay = currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1);
    const modeDisplay = quizMode ? MESSAGES.headerModeQuiz : MESSAGES.headerModeLearn;
    const nextModeDisplay = quizMode ? MESSAGES.nextModeLearn : MESSAGES.nextModeQuiz; // 遷移先のモード名
    const soundIcon = isSoundOn ? '🔊' : '🔇';
    const soundText = isSoundOn ? MESSAGES.soundTextOn : MESSAGES.soundTextOff; // サウンドON/OFFテキスト

    controlContent += `
        <button class="btn btn-sm btn-mode-toggle" onclick="toggleMode()" title="${modeDisplay}を切り替え">
            <span class="icon" style="font-size: 1.2rem;">🔄</span>
            <span class="text">${nextModeDisplay}</span>
        </button>
        <button class="btn btn-sm btn-sound-toggle" onclick="toggleSound()" title="${soundText}">
            <span class="icon" style="font-size: 1.2rem;">${soundIcon}</span> 
            <span class="text">${soundText}</span>
        </button>
        <button class="btn btn-sm btn-back" onclick="changeTheme()" title="${MESSAGES.themeChange}">
            <span class="icon" style="font-size: 1.2rem;">🎨</span> 
            <span class="text">${currentThemeDisplay}</span>
        </button>
        <button class="btn btn-sm btn-back" onclick="retryQuiz()" title="${MESSAGES.reset}">
            <span class="icon" style="font-size: 1.2rem;">🏠</span> 
            <span class="text">${MESSAGES.reset}</span>
        </button>
    `;

    headerBar.innerHTML = `<div class="header-bar-inner">
        <div id="status-area" class="header-group">${statusContent}</div>
        <div id="control-area" class="header-group">${controlContent}</div>
    </div>`;
    
    headerBar.style.display = 'flex'; 
}


// ----------------------------------------------------
// メインレンダリング関数
// ----------------------------------------------------
function render() {
  renderHeader(); 
  renderContent();
  updateProgress();
}

// renderContent (文言をMESSAGESから取得)
function renderContent() {
  const contentArea = document.getElementById('content-area');
  if (!contentArea) return; 

  // QUESTIONSが定義されていない場合の安全装置 (文言をMESSAGESから取得)
  if (typeof QUESTIONS === 'undefined' || QUESTIONS.length === 0) {
      contentArea.innerHTML = `
        <div class="opening-screen" style="justify-content: flex-start; padding-top: 100px;">
          <div class="opening-title" style="color: #dc3545;">🚨 ${MESSAGES.errorTitle} 🚨</div>
          <div class="opening-subtitle" style="font-size: 1.3rem;">${MESSAGES.errorMessage}</div>
        </div>
      `;
      return;
  }
  
  const q = QUESTIONS[currentIndex];

  let mainHtml = '<div class="fade-container' + (isAnimating ? ' fade-out' : '') + '">';

  const themePrefix = currentTheme === 'default' ? '' : `${currentTheme}_`;
  const openingImage = `images/${themePrefix}opening.webp`; 
  const endingImage = `images/${themePrefix}ending.webp`; 

  if (currentPhase === 'opening') {
    // オープニング
    const modeDisplay = quizMode ? MESSAGES.headerModeQuiz : MESSAGES.headerModeLearn;
    
    // ★★★ 変更点: ボタンのラベルにモード名を含める (MESSAGESを使用) ★★★
    const startButtonLabel = MESSAGES.startQuizButton.replace('{MODE}', modeDisplay);
    const subtitle = MESSAGES.openingSubtitle.replace('{QUESTIONS_LENGTH}', QUESTIONS.length);

    mainHtml += `
      <div class="opening-screen">
        <div class="image-container image-container-large" style="animation: none;">
            <img src="${openingImage}" onerror="this.onerror=null;this.src='images/opening.webp';" alt="${MESSAGES.imageAlt}" class="quiz-image">
        </div>
        <div class="opening-title">${MESSAGES.openingTitle}</div>
        <div class="opening-subtitle">${subtitle}</div>
        
        <div class="button-group button-group-large">
            <button class="btn btn-start btn-large" onclick="startQuiz(quizMode)">${startButtonLabel}</button>
        </div>
      </div>
    `;
    
  } else if (currentPhase === 'ending') {
    // 終了画面
    const scoreMessage = quizMode ? `<div class="score-display ending-score-display">${MESSAGES.endingScoreMessage.replace('{SCORE}', score).replace('{TOTAL}', QUESTIONS.length)}</div>` : '';
    const endingTitle = quizMode ? MESSAGES.endingTitleQuiz : MESSAGES.endingTitleLearn;
    
    mainHtml += `
      <div class="ending-screen">
        <div class="image-container image-container-large" style="animation: none;">
            <img src="${endingImage}" onerror="this.onerror=null;this.src='images/ending.webp';" alt="${MESSAGES.imageAlt}" class="quiz-image">
        </div>
        <div class="ending-title">${endingTitle}</div>
        ${scoreMessage}
        <div class="ending-message">
          ${MESSAGES.endingMessageLine1}<br>
          ${MESSAGES.endingMessageLine2}
        </div>
      </div>
      <div class="button-group button-group-ending">
        ${quizMode ? `<button class="btn btn-next" onclick="showResultList()">${MESSAGES.endingButtonShowResults}</button>` : ''}
      </div>
    `;
    
  } else if (currentPhase === 'results') {
    // 結果一覧ページ (文言をMESSAGESから取得)
    let resultListHtml = QUESTIONS.map((item, index) => {
        const questionNum = index + 1;
        const correctSymbol = item.answer ? '○' : '×';
        
        let userResult, resultClass;
        if (!item.userAnswer) {
            userResult = MESSAGES.resultsUnanswered;
            resultClass = 'result-unanswered';
        } else {
            const userSymbol = item.userAnswer === true ? '○' : '×';
            resultClass = item.userCorrect ? 'result-correct' : 'result-wrong';
            userResult = `${userSymbol} (${item.userCorrect ? MESSAGES.resultsCorrectText : MESSAGES.resultsWrongText})`;
        }

        return `
            <tr class="${resultClass}">
                <td>${questionNum}</td>
                <td>${item.q}</td>
                <td class="correct-col">${correctSymbol}</td>
                <td class="user-col">${userResult}</td>
                <td></td>
            </tr>
        `;
    }).join('');

    const resultsSummary = MESSAGES.resultsSummary.replace('{TOTAL}', QUESTIONS.length).replace('{SCORE}', score);

    mainHtml += `
      <div class="result-list-screen">
        <div class="ending-title">${MESSAGES.resultsTitle}</div>
        <div class="ending-message" style="margin-bottom: 2rem;">
            ${resultsSummary}
        </div>
        <div class="result-table-container">
            <table class="result-table">
                <thead>
                    <tr>
                        <th>${MESSAGES.resultsTableNo}</th>
                        <th>${MESSAGES.resultsTableQuestion}</th>
                        <th class="correct-col">${MESSAGES.resultsTableCorrect}</th>
                        <th class="user-col">${MESSAGES.resultsTableUser}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${resultListHtml}
                </tbody>
            </table>
        </div>
      </div>
      <div class="button-group button-group-ending">
        <button class="btn btn-back" onclick="showEnding()">${MESSAGES.resultsBackToEnding}</button>
      </div>
    `;

  } else if (currentPhase === 'question') {
    // 問題表示 (文言をMESSAGESから取得)
    const promptText = quizMode ? MESSAGES.promptText : MESSAGES.promptTextLearn;

    mainHtml += `
      <div class="image-container" id="current-image-container">
        <img src="${q.image}" alt="${MESSAGES.imageAlt}" class="quiz-image">
      </div>
      <div class="question-text">${q.q}</div>
      <div class="prompt-text">${promptText}</div>
      
      <div class="button-group">
        ${quizMode ? `
            <button class="btn btn-answer-ox btn-answer-o" onclick="submitAnswer(true)">○ (${MESSAGES.resultsCorrectText})</button>
            <button class="btn btn-answer-ox btn-answer-x" onclick="submitAnswer(false)">× (${MESSAGES.resultsWrongText})</button>
        ` : `
            <button class="btn btn-learn" onclick="showAnswer()">${MESSAGES.showAnswerButton}</button>
        `}
      </div>
    `;
    
    setTimeout(() => {
        applyAnimation('current-image-container', q.animation);
    }, 10);

  } else { // currentPhase === 'answer'
    // 解答表示 (文言をMESSAGESから取得)
    const symbolClass = q.answer ? 'answer-correct' : 'answer-wrong';
    const symbol = q.answer ? '○' : '×';
    const showNext = currentIndex < QUESTIONS.length - 1;

    mainHtml += `
      <div class="answer-padding-top">
          <div class="answer-symbol ${symbolClass}">${symbol}</div>
      </div>
      
      <div class="reason-text">${q.reason}</div>
      
      <div class="button-group button-group-ending">
        <button class="btn btn-back" onclick="backToQuestion()">← ${MESSAGES.answerToQuestion}</button>
        ${showNext ? `<button class="btn btn-next" onclick="nextQuestion()">${MESSAGES.nextQuestionButton}</button>` : `<button class="btn btn-next" onclick="showEnding()">${MESSAGES.endingButton}</button>`}
      </div>
    `;
  }

  mainHtml += '</div>';
  
  contentArea.innerHTML = mainHtml;
}


// ----------------------------------------------------
// イベントハンドラー (変更なし)
// ----------------------------------------------------

function startQuiz(mode, isReStart = false) {
  playClickSound(); 
  quizMode = mode;
  
  // 再スタートでない場合（オープニングからの開始）はスコアをリセット
  if (!isReStart) {
    score = 0;
    QUESTIONS.forEach(q => {
        q.userAnswer = null;
        q.userCorrect = null;
    });
  }
  
  animateTransition(() => {
    currentIndex = 0; 
    currentPhase = 'question';
  });
}

function showEnding() {
  playClickSound(); 
  animateTransition(() => {
    currentPhase = 'ending';
  });
}

function showResultList() {
    playClickSound(); 
    animateTransition(() => {
        currentPhase = 'results';
    });
}

function retryQuiz() {
  playClickSound(); 
  animateTransition(() => {
    currentIndex = 0;
    currentPhase = 'opening';
  });
}

function submitAnswer(userAnswer) {
    if (!quizMode || isAnimating) return;

    const q = QUESTIONS[currentIndex];
    
    const isCorrect = (q.answer === userAnswer);
    if (isCorrect) {
        // 再回答の場合はスコアを増やさない
        if (q.userCorrect === null || q.userCorrect === false) {
             score++;
        }
        playCorrectSound(); 
    } else {
        playWrongSound(); 
    }
    
    q.userAnswer = userAnswer;
    q.userCorrect = isCorrect; 

    animateTransition(() => {
        currentPhase = 'answer';
    });
}

function showAnswer() {
    if (quizMode || isAnimating) return; 
    playClickSound(); 
    animateTransition(() => {
        currentPhase = 'answer';
    });
}

function backToQuestion() {
    playClickSound(); 
    animateTransition(() => {
        currentPhase = 'question';
    });
}

function nextQuestion() {
    if (isAnimating) return;
    playClickSound(); 

    if (currentIndex < QUESTIONS.length - 1) {
        animateTransition(() => {
            currentIndex++;
            currentPhase = 'question';
        });
    } else {
        showEnding();
    }
}

function previousQuestion() {
    if (isAnimating || currentIndex === 0) return;
    playClickSound(); 
    
    animateTransition(() => {
        currentIndex--;
        currentPhase = 'question';
    });
}


// ----------------------------------------------------
// キーボードイベント (変更なし)
// ----------------------------------------------------
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    
    // '?'キーでヘルプを表示するロジック
    if (key === '?') {
        e.preventDefault();
        showKeyboardHelp();
        return;
    }
    
    // ---------------------------------------
    // 以下、キーボードヘルプ非表示処理の呼び出し
    // ---------------------------------------
    // Escキーが押されたらトーストを非表示にする
    if (e.key === 'Escape') {
        hideKeyboardHelp();
        isAnimating = false;
        return;
    }
    
    // その他の有効なキーが押されたらトーストを非表示にする
    if (['enter', 'o', 'x', ' '].includes(key) || key.includes('arrow')) {
        hideKeyboardHelp();
    }


    if (currentPhase === 'opening') {
        if (key === 'enter') {
            e.preventDefault(); 
            startQuiz(quizMode); // 現在選択中のモードで開始
        }
        return;
    }

    if (currentPhase === 'ending') {
        if (key === 'enter') {
            e.preventDefault(); 
            if (quizMode) {
                showResultList();
            } else {
                retryQuiz();
            }
        }
        if (key === 'r') retryQuiz();
        return;
    }
    
    if (currentPhase === 'results') {
        if (key === 'enter') showEnding();
        if (key === 'r') retryQuiz();
        return;
    }

    if (currentPhase === 'question') {
        if (quizMode) {
            if (key === 'o' || key === 'enter') {
                e.preventDefault(); 
                submitAnswer(true);
            }
            if (key === 'x' || key === ' ') {
                e.preventDefault(); 
                submitAnswer(false);
            }
        } else {
            if (key === 'enter' || key === 'arrowright') showAnswer();
            if (key === 'arrowleft' && currentIndex > 0) previousQuestion();
        }
        return;
    }

    if (currentPhase === 'answer') {
        if (key === 'enter' || key === ' ' || key === 'arrowright') {
            if (currentIndex < QUESTIONS.length - 1) {
                nextQuestion();
            } else {
                showEnding();
            }
        }
        if (key === 'arrowleft') backToQuestion(); 
        return;
    }
});