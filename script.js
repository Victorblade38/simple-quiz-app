// womp womp

const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      {
        text: "Shark",
        correct: false,
      },
      {
        text: "Blue Whale",
        correct: true,
      },
      {
        text: "Elephant",
        correct: false,
      },
      {
        text: "Lion",
        correct: false,
      },
    ],
  },
  {
    question: "What is the fastest land animal?",
    answers: [
      {
        text: "Cheetah",
        correct: true,
      },
      {
        text: "Lion",
        correct: false,
      },
      {
        text: "Horse",
        correct: false,
      },
      {
        text: "Greyhound",
        correct: false,
      },
    ],
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    answers: [
      {
        text: "Elephant",
        correct: false,
      },
      {
        text: "Lion",
        correct: true,
      },
      {
        text: "Tiger",
        correct: false,
      },
      {
        text: "Bear",
        correct: false,
      },
    ],
  },
  {
    question: "Which bird is known for its impressive mimicry skills?",
    answers: [
      {
        text: "Crow",
        correct: false,
      },
      {
        text: "Parrot",
        correct: true,
      },
      {
        text: "Sparrow",
        correct: false,
      },
      {
        text: "Eagle",
        correct: false,
      },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  //on quiz app start it will
  //index and score be set to 0
  currentQuestionIndex = 0;
  score = 0;
  //next button text will be set to Next
  nextButton.innerHTML = "Next";
  //then Start showing questions
  showQuestion();
}

function showQuestion() {
  //reset the previous question and answer
  resetState();
  //it will get the first question as the index is set to zero
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1; //if index is zero question no will be 1
  //question no , . , question  get added in the Question goes here html
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answers) => {
    //for each answer it willl create a button with class "btn"
    const button = document.createElement("button");
    button.innerHTML = answers.text; //answer text gets added
    button.classList.add("btn");
    answerButtons.appendChild(button); //display in div with class answer-button
    if (answers.correct) {
      button.dataset.correct = answers.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    //remove all the previous child buttons
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Your Score is ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
