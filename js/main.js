const game = {
  userScore: 0,
  cpuScore: 0,
  userScore_span: document.getElementById("user-score"),
  cpuScore_span: document.getElementById("cpu-score"),
  restart: document.getElementById("restart"),
  result: document.getElementById("result"),
  modal: document.querySelector(".modal"),
  winningConditions: {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  },

  getCpuChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
  },

  showResult(message, outcome, cpuChoice) {
    this.userScore_span.innerHTML = this.userScore;
    this.cpuScore_span.innerHTML = this.cpuScore;
    this.result.innerHTML = `
      <h1 class="text-${outcome}">${message}</h1>
      <p>Computer chose <strong>${cpuChoice}</strong></p>
    `;
    this.modal.style.display = 'block';
    setTimeout(() => {
      this.modal.style.display = 'none';
    }, 2000);
  },

  play(userChoice) {
    const cpuChoice = this.getCpuChoice();
    if (this.winningConditions[userChoice] === cpuChoice) {
      this.userScore++;
      this.showResult('ʏᴏᴜ ᴡɪɴ!', 'win', cpuChoice);
    } else if (userChoice === cpuChoice) {
      this.showResult('ɪᴛ’ꜱ ᴀ ᴅʀᴀᴡ', 'draw', cpuChoice);
    } else {
      this.cpuScore++;
      this.showResult('ʏᴏᴜ ʟᴏꜱᴛ', 'lose', cpuChoice);
    }
  },

  restartGame() {
    this.userScore = 0;
    this.cpuScore = 0;
    this.userScore_span.innerHTML = this.userScore;
    this.cpuScore_span.innerHTML = this.cpuScore;
  },

  clearModal(e) {
    if (e.target === this.modal) {
      this.modal.style.display = 'none';
    }
  },

  init() {
    document.getElementById("rock").addEventListener('click', () => this.play('rock'));
    document.getElementById("paper").addEventListener('click', () => this.play('paper'));
    document.getElementById("scissors").addEventListener('click', () => this.play('scissors'));
    this.restart.addEventListener('click', () => this.restartGame());
    window.addEventListener('click', (e) => this.clearModal(e));
  }
};

game.init();

// Cookie Banner Logic
window.onload = function() {
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptCookiesButton = document.getElementById("acceptCookies");

  if (!localStorage.getItem("cookiesAccepted")) {
    cookieBanner.style.display = "block";
  }

  acceptCookiesButton.onclick = function() {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.style.display = "none";
  };
};

// Google Analytics Event Tracking
document.addEventListener('click', (e) => {
  if (e.target.closest('.choice')) {
    const userChoice = e.target.closest('.choice').id;
    const computerChoice = game.getCpuChoice();
    let winner;

    if (userChoice === computerChoice) {
      winner = 'tie';
    } else if (game.winningConditions[userChoice] === computerChoice) {
      winner = 'user';
    } else {
      winner = 'computer';
    }

    if (winner === 'user') {
      gtag('event', 'game_win', { 'event_category': 'game', 'event_label': 'win' });
    } else if (winner === 'computer') {
      gtag('event', 'game_loss', { 'event_category': 'game', 'event_label': 'loss' });
    }
  }
});

document.getElementById('restart').addEventListener('click', () => {
    gtag('event', 'game_restart', {
        'event_category': 'game',
        'event_label': 'restart'
    });
});
