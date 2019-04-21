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
    question:
      "You're 3rd place right now in a race. What place are you in when you pass the person in 2nd place?",
    answers: {
      a: "1st",
      b: "2nd",
      c: "3rd",
      d: "4th"
    },
    correctAnswer: "b"
  },
  {
    question:
      "Two identical cars collide head on. Each car is traveling at 100 km/h. The impact force on each car is the same as hitting a solid wall at:",
    answers: {
      a: "100 km/h",
      b: "200 km/h",
      c: "150 km/h",
      d: "50 km/h "
    },
    correctAnswer: "a"
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
      )" class="answers" style="font-size: 24px; cursor: pointer;padding: 25px;background: lightgray;">${answer}: ${
        questions[answer]
      }</p>`;
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
      if (result !== null) {
        this.displayIfCorrect(result);
      } else {
        this.displayIfCorrect(result);
      }
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
      document.querySelector("#question").innerHTML = `<h2><center>${
        questions[this.currentQuestion].question
      }</center></h2><p style="text-align:center">Time left to answer question:</p><p id="timer" style="text-align:center"></p>
    ${this.generateAnswers(questions[this.currentQuestion].answers)}`;
      this.initiateTimer();
    }
  }

  displayIfCorrect(result) {
    if (result) {
      document.querySelector("#question").innerHTML =
        "<h3>Correct Answer!</h3>";
    } else {
      if (result !== null) {
        document.querySelector(
          "#question"
        ).innerHTML = `<h3>Incorrect Answer!</h3><p>Correct Answer Is: ${
          questions[this.currentQuestion].correctAnswer
        }</p>`;
      } else {
        document.querySelector(
          "#question"
        ).innerHTML = `<h3>Out of time!</h3><p>Correct Answer Is: ${
          questions[this.currentQuestion].correctAnswer
        }</p>`;
      }
    }
  }

  initiateTimer() {
    this.countDownTime = 15;
    function countDownTick(countDownTime) {
      this.displayTimer(--this.countDownTime);
    }

    this.countDownTimer = setInterval(countDownTick.bind(this), 1000);

    const timer = function() {
      let result = this.result;
      if (this.result === null) {
        this.nextQuestion(result);
      } else {
        this.nextQuestion(false);
      }
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
