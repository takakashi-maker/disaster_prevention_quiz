/* quiz.js */

// ! 問題データ (QUESTIONS) は questions.js から読み込まれます。

// アプリケーション状態
let currentIndex = 0;
let currentPhase = 'opening';
let isAnimating = false;
let score = 0;
let quizMode = true;

// オーディオコンテキスト（Web Audio API）
let audioContext = null;
function initAudio() {
  if (!audioContext) {
    // ユーザー操作 (クリック) があったときにAudioContextを初期化
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// 正解音 (省略)
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

// 不正解音 (省略)
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

// ボタンクリック音 (省略)
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

// プログレスバー更新 (省略)
function updateProgress() {
  const progressBar = document.getElementById('progress-bar');
  const progress = ((currentIndex) / QUESTIONS.length) * 100;
  progressBar.style.width = progress + '%';
  if (currentPhase === 'opening' || currentPhase === 'ending') {
      progressBar.style.width = '0%';
  }
}

// アニメーションを一時的に付与する関数 (省略)
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

// ボタンのレンダリング関数 (省略)
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

  if (currentPhase === 'opening') {
    mainHtml += `
      <div class="opening-screen">
        <div class="image-container" style="animation: none;">
            <img src="images/opening.png" alt="オープニング画像" class="quiz-image">
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
            <img src="images/ending.png" alt="エンディング画像" class="quiz-image">
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
      <div class="prompt-text">${quizMode ? '答えを選んでください (O/XまたはM/Bキーでも回答可)' : '○ か × か (Enter/→キーで答えを見る)'}</div>
    `;
    
    buttonHtml = `
      <div class="button-group">
        ${currentIndex > 0 ? '<button class="btn btn-back" onclick="previousQuestion()">← 前の問題</button>' : '<div style="width: 200px; opacity: 0;"></div>'}
        
        ${quizMode ? `
            <button class="btn btn-answer-ox btn-answer-o" onclick="submitAnswer(true)">○ (まる)</button>
            <button class="btn btn-answer-ox btn-answer-x" onclick="submitAnswer(false)">× (ばつ)</button>
        ` : `
            <button class="btn btn-learn" onclick="showAnswer()">答えを見る ✨</button>
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

    // 解答ページ
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
    
    if (!quizMode) {
         if (q.answer) {
          playCorrectSound();
        } else {
          playWrongSound();
        }
    }
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

// キーボードイベントの調整 (省略)
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
            if (key === 'o' || key === 'm' || key === ' ') { 
                e.preventDefault(); 
                submitAnswer(true); 
            }
            if (key === 'x' || key === 'b') { 
                submitAnswer(false); 
            }
        } else {
            if (key === 'enter' || key === ' ' || key === 'arrowright') { 
                e.preventDefault();
                showAnswer(); 
            }
        }
    } else if (currentPhase === 'answer') {
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