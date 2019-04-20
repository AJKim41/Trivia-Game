const questions = [
  {
    question: "What is the first letter in the alphabet?",
    answers: {
      a: "D",
      b: "B",
      c: "A",
      d: "C"
    },
    correctAnswer: "c"
  },
  {
    question: "What day is Christmas celebrated annually?",
    answers: {
      a: "Wednesday",
      b: "25th",
      c: "Saturday",
      d: "21st"
    },
    correctAnswer: "b"
  }
];

class Game {
  constructor() {
    this.currentQuestion = 0;
    this.correct = null;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.result = null;
    this.displayQuestion();
  }

  generateAnswers(questions) {
    let answersStringTemplate = ``;
    for (let answer in questions) {
      const composeAnswerTag = `<p onclick="newGame.checkAnswer(
        '${answer}'
      )">${answer}: ${questions[answer]}</p>`;
      answersStringTemplate = `
    ${answersStringTemplate}
    ${composeAnswerTag}
    `;
    }
    return answersStringTemplate;
  }

  nextQuestion(result) {
    clearInterval(this.intervalID);
    clearInterval(this.countDownTimer);
    if (result) {
      this.correctAnswers++;
      this.displayIfCorrect(result);
    } else {
      this.wrongAnswers++;
      this.displayIfCorrect(result);
    }
    ++this.currentQuestion;
    setTimeout(
      function() {
        this.displayQuestion();
      }.bind(this),
      5000
    );
  }

  checkAnswer(answer) {
    const result = answer === questions[this.currentQuestion].correctAnswer;
    if (result !== null) {
      this.nextQuestion(result);
    } else {
      this.nextQuestion(false);
    }
  }

  displayQuestion() {
    if (questions[this.currentQuestion] === undefined) {
      document.querySelector("#question").innerHTML = `<p>Correct Answers: ${
        this.correctAnswers
      }</p><p>Incorrect Answers: ${this.wrongAnswers}</p>`;
    } else {
      document.querySelector("#question").innerHTML = `<h2>${
        questions[this.currentQuestion].question
      }</h2><p style="text-align:center">Time left to answer question:</p><p id="timer" style="text-align:center"></p>
    ${this.generateAnswers(questions[this.currentQuestion].answers)}`;
      this.initiateTimer();
    }
  }

  displayIfCorrect(result) {
    if (result) {
      document.querySelector("#question").innerHTML =
        "<h3>Correct Answer!</h3>";
    } else {
      document.querySelector(
        "#question"
      ).innerHTML = `<h3>Incorrect Answer!</h3><p>Correct Answer Is: ${
        questions[this.currentQuestion].correctAnswer
      }</p>`;
    }
  }

  initiateTimer() {
    this.countDownTime = 15;
    function countDownTick(countDownTime) {
      this.displayTimer(--this.countDownTime);
    }

    this.countDownTimer = setInterval(countDownTick.bind(this), 1000);

    const timer = function() {
      this.nextQuestion(false);
    };
    this.intervalID = setInterval(timer.bind(this), 15000);
  }

  displayTimer(countDownTick) {
    document.querySelector("#timer").innerHTML = countDownTick;
  }
}

let newGame;
$(document).ready(function() {
  newGame = new Game();
});
