/* quiz.js */

// ! 問題データ (QUESTIONS) は questions.js から読み込まれます。

// アプリケーション状態
let currentIndex = 0;
let currentPhase = 'opening';
let isAnimating = false;
let score = 0;
let quizMode = true;

// 🎨 テーマ管理
const THEMES = ['default', 'autumn', 'halloween'];
let currentTheme = localStorage.getItem('quizTheme') || THEMES[0];
let currentThemeIndex = THEMES.indexOf(currentTheme); 

function applyTheme(themeName) {
    const body = document.body;
    // 既存のテーマクラスをリセット
    body.classList.remove('theme-autumn', 'theme-halloween'); 

    if (themeName !== 'default') {
        body.classList.add(`theme-${themeName}`);
    }
    // localStorageに保存
    localStorage.setItem('quizTheme', themeName);
    currentTheme = themeName;
}

function changeTheme() {
    playClickSound(); // テーマ変更ボタンのクリック音
    currentThemeIndex = (currentThemeIndex + 1) % THEMES.length;
    applyTheme(THEMES[currentThemeIndex]);
    
    if (currentPhase === 'opening') {
        render(); // オープニング画面を更新
    }
}
// 初期化時にテーマを適用
applyTheme(currentTheme); 


// ----------------------------------------------------
// 🔊 Audio API の定義 (効果音ON/OFF機能は削除し、常に再生)
// ----------------------------------------------------
let audioContext = null;
function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playCorrectSound() {
  initAudio();
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.type = 'sine';
  
  osc.frequency.setValueAtTime(600, audioContext.currentTime);
  osc.frequency.setValueAtTime(900, audioContext.currentTime + 0.05);
  osc.frequency.setValueAtTime(1200, audioContext.currentTime + 0.1);
  
  gain.gain.setValueAtTime(0.3, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.25);
}

function playWrongSound() {
  initAudio();
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, audioContext.currentTime);
  osc.frequency.setValueAtTime(200, audioContext.currentTime + 0.15);
  gain.gain.setValueAtTime(0.2, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.3);
}

function playClickSound() { 
  initAudio();
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.type = 'sine';
  osc.frequency.value = 600;
  gain.gain.setValueAtTime(0.1, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.1);
}
// ----------------------------------------------------

function updateProgress() {
  const progressBar = document.getElementById('progress-bar');
  const progress = ((currentIndex) / QUESTIONS.length) * 100;
  progressBar.style.width = progress + '%';
  if (currentPhase === 'opening' || currentPhase === 'ending') {
      progressBar.style.width = '0%';
  }
}

function applyAnimation(elementId, animationClass) {
    const element = document.getElementById(elementId);
    if (element && animationClass) {
        element.classList.add('animated');
        element.classList.add(animationClass);
        setTimeout(() => {
            element.classList.remove('animated');
            element.classList.remove(animationClass);
        }, 1000);
    }
}

function renderButtons(html) {
    const fixedButtonArea = document.querySelector('.fixed-button-area');
    if (fixedButtonArea) {
        fixedButtonArea.innerHTML = html;
    }
}


// レンダリング関数
function render() {
  const contentArea = document.getElementById('content-area');
  const q = QUESTIONS[currentIndex];

  let mainHtml = '<div class="fade-container' + (isAnimating ? ' fade-out' : '') + '">';
  let buttonHtml = '';

  // ----------------------------------------------------
  // ★ 画像パスの動的決定
  // ----------------------------------------------------
  const themePrefix = currentTheme === 'default' ? '' : `${currentTheme}_`;
  const openingImage = `images/${themePrefix}opening.png`;
  const endingImage = `images/${themePrefix}ending.png`;
  // ----------------------------------------------------

  if (currentPhase === 'opening') {
    const currentThemeDisplay = currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1);
    
    // 設定ボタンエリアをテーマ変更ボタンのみに修正
    mainHtml += `
      <div class="setting-buttons-area">
          <button class="btn btn-back" onclick="changeTheme()">
              🎨 テーマ変更 (${currentThemeDisplay})
          </button>
      </div>

      <div class="opening-screen">
        <div class="image-container" style="animation: none;">
            <img src="${openingImage}" alt="オープニング画像" class="quiz-image">
        </div>
        <div class="opening-title">防災○×クイズ</div>
        <div class="opening-subtitle">全${QUESTIONS.length}問で防災の知識をチェック！</div>
      </div>
    `;
    
    buttonHtml = `
      <div class="start-button-group">
          <button class="start-button btn-quiz" onclick="startQuiz(true)">1. クイズモード (○×で回答) →</button>
          <button class="start-button btn-learn" onclick="startQuiz(false)">2. 学習モード (答えを見る) →</button>
      </div>
    `;

  } else if (currentPhase === 'ending') {
    const scoreMessage = quizMode ? `<div class="score-display">${score} / ${QUESTIONS.length} 問 正解！</div>` : '';
    const endingTitle = quizMode ? `🎉 クイズ終了！おつかれさまでした！ 🎉` : `学習終了！おつかれさまでした！`;
    mainHtml += `
      <div class="ending-screen">
        <div class="image-container" style="animation: none;">
            <img src="${endingImage}" alt="エンディング画像" class="quiz-image">
        </div>
        <div class="ending-title">${endingTitle}</div>
        ${scoreMessage}
        <div class="ending-message">
          防災の知識は身についたかな？<br>
          今日学んだことを忘れず、災害に備えましょう！
        </div>
      </div>
    `;
    buttonHtml = `<div class="button-group"><button class="retry-button" onclick="retryQuiz()">↩ モードを選び直す</button></div>`;
    
  } else if (currentPhase === 'question') {
    const questionNumber = `問題 ${currentIndex + 1} / ${QUESTIONS.length}`;
    mainHtml += `
      <div style="font-size: 1.5rem; color: #4A90E2; font-weight: 700; margin-bottom: 1.5rem;">🔹 ${questionNumber} 🔹</div>
      <div class="image-container" id="current-image-container">
        <img src="${q.image}" alt="問題${currentIndex + 1}の画像" class="quiz-image">
      </div>
      <div class="question-text">${q.q}</div>
      <div class="prompt-text">${quizMode ? '答えを選んでください (O/XキーまたはEnter/Spaceキーでも回答可)' : '○ か × か (Enter/→キーで答えを見る)'}</div>
    `;
    
    buttonHtml = `
      <div class="button-group">
        ${currentIndex > 0 ? '<button class="btn btn-back" onclick="previousQuestion()">← 前の問題</button>' : '<div style="width: 200px; opacity: 0;"></div>'}
        
        ${quizMode ? `
            <button class="btn btn-answer-ox btn-answer-o" onclick="submitAnswer(true)">○ (まる)</button>
            <button class="btn btn-answer-ox btn-answer-x" onclick="submitAnswer(false)">× (ばつ)</button>
        ` : `
            <button class="btn btn-learn" onclick="showAnswer()">Enter. 答えを見る ✨</button>
        `}
      </div>
    `;
    
    setTimeout(() => {
        applyAnimation('current-image-container', q.animation);
    }, 10);

  } else { // currentPhase === 'answer'
    const symbolClass = q.answer ? 'answer-correct' : 'answer-wrong';
    const symbol = q.answer ? '○' : '×';
    const showNext = currentIndex < QUESTIONS.length - 1;
    const questionNumber = `問題 ${currentIndex + 1} / ${QUESTIONS.length}`;

    mainHtml += `
      <div style="font-size: 1.5rem; color: #4A90E2; font-weight: 700; margin-bottom: 1.5rem;">🔹 ${questionNumber} 🔹</div>
      
      <div class="answer-padding-top">
          <div class="answer-symbol ${symbolClass}">${symbol}</div>
      </div>
      
      <div class="reason-text">${q.reason}</div>
    `;
    
    buttonHtml = `
      <div class="button-group">
        <button class="btn btn-back" onclick="backToQuestion()">← 問題に戻る</button>
        ${showNext ? '<button class="btn btn-next" onclick="nextQuestion()">→ 次の問題 (Enter)</button>' : '<button class="btn btn-next" onclick="showEnding()">🎉 結果を見る (Enter)</button>'}
      </div>
    `;
  }

  mainHtml += '</div>';
  
  contentArea.innerHTML = mainHtml;
  renderButtons(buttonHtml); 
  
  updateProgress();
}

// アニメーション付き状態変更 (省略)
function animateTransition(callback) {
  if (isAnimating) return;
  isAnimating = true;
  render();

  setTimeout(() => {
    callback();
    isAnimating = false;
    render();
  }, 150);
}

// イベントハンドラー (省略)
function startQuiz(mode) {
  playClickSound();
  quizMode = mode;
  score = 0;
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

function retryQuiz() {
  playClickSound();
  animateTransition(() => {
    currentIndex = 0;
    currentPhase = 'opening';
  });
}

function submitAnswer(userAnswer) {
    const q = QUESTIONS[currentIndex];
    
    const isCorrect = (q.answer === userAnswer);
    if (isCorrect) {
        score++;
        playCorrectSound();
    } else {
        playWrongSound();
    }
    
    q.userCorrect = isCorrect; 

    animateTransition(() => {
        currentPhase = 'answer';
    });
}

function showAnswer() {
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
  playClickSound();
  if (currentIndex < QUESTIONS.length - 1) {
    animateTransition(() => {
      currentIndex++;
      currentPhase = 'question';
    });
  }
}
function previousQuestion() {
  playClickSound();
  if (currentIndex > 0) {
    animateTransition(() => {
      currentIndex--;
      currentPhase = 'question';
    });
  }
}

// キーボードイベントの調整 (操作性向上)
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && currentPhase !== 'answer') {
        e.preventDefault();
    }
    
    const key = e.key.toLowerCase();

    if (currentPhase === 'opening') {
        if (key === '1') { startQuiz(true); }
        if (key === '2') { startQuiz(false); }
        return;
    }

    if (currentPhase === 'ending') {
        if (key === 'enter' || key === ' ') { retryQuiz(); }
        return;
    }

    if (currentPhase === 'question') {
        if (quizMode) {
            // クイズモード: O/X または M/B、Enter/Spaceで「○」回答
            if (key === 'o' || key === 'm' || key === ' ' || key === 'enter') { 
                e.preventDefault(); 
                submitAnswer(true); 
            }
            if (key === 'x' || key === 'b') { 
                submitAnswer(false); 
            }
        } else {
            // 学習モード: Enter/Space/右矢印で答えを見る
            if (key === 'enter' || key === ' ' || key === 'arrowright') { 
                e.preventDefault();
                showAnswer(); 
            }
        }
    } else if (currentPhase === 'answer') {
        // 解答ページ: 左で戻る、右/Enter/Spaceで次へ
        if (key === 'arrowleft') { backToQuestion(); }
        else if (key === 'arrowright' || key === 'enter' || key === ' ') {
            e.preventDefault();
            if (currentIndex < QUESTIONS.length - 1) {
                nextQuestion();
            } else {
                showEnding();
            }
        }
    }
    
    if (key === 'arrowleft' && currentIndex > 0) {
        if (currentPhase === 'question') {
            previousQuestion();
        } 
    }
});

// 初期レンダリング
render();