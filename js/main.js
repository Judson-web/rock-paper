const game = {
  userScore: 0,
  cpuScore: 0,
  inPlay: true, // Cooldown flag
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
      this.inPlay = true; // Re-enable choices after modal closes
    }, 2000);
  },

  play(userChoice) {
    if (!this.inPlay) return; // Prevent new games during cooldown
    this.inPlay = false;

    const cpuChoice = this.getCpuChoice();
    let winner;

    if (this.winningConditions[userChoice] === cpuChoice) {
      this.userScore++;
      winner = 'user';
      this.showResult('You Win!', 'win', cpuChoice);
    } else if (userChoice === cpuChoice) {
      winner = 'tie';
      this.showResult('It’s a Draw', 'draw', cpuChoice);
    } else {
      this.cpuScore++;
      winner = 'computer';
      this.showResult('You Lost', 'lose', cpuChoice);
    }

    // Integrated Google Analytics Tracking
    if (winner === 'user') {
      gtag('event', 'game_win', { 'event_category': 'game', 'event_label': 'win' });
    } else if (winner === 'computer') {
      gtag('event', 'game_loss', { 'event_category': 'game', 'event_label': 'loss' });
    }
  },

  restartGame() {
    this.userScore = 0;
    this.cpuScore = 0;
    this.userScore_span.innerHTML = this.userScore;
    this.cpuScore_span.innerHTML = this.cpuScore;
    gtag('event', 'game_restart', { 'event_category': 'game', 'event_label': 'restart' });
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

  if (localStorage.getItem("cookiesAccepted")) {
    cookieBanner.style.display = "none";
  }

  acceptCookiesButton.onclick = function() {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.style.display = "none";
  };
};
