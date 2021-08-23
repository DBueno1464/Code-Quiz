const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const questionContainerElements = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timeLeftElement = document.getElementById('timer-seconds');
 

let shuffledQuestions, currentQuestionIndex;
let time = 10;
let score = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  start;
  startButton.classList.add('hidden');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElements.classList.remove('hidden');
  setNextQuestion();
};

var start = setInterval(function startTimer() {
  timeLeftElement.innerHTML = time--;
  if (time == 0){
  timeLeftElement.innerHTML = "Time's up!";
  clearInterval(start);
  //endGame();
  }
}, 1000);

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
};

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText =answer.text;
    button.classList.add('button');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  })
};

function resetState() {
  nextButton.classList.add('hidden');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
};

function selectAnswer (e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  })

  if (!correct){
    time--;
  }

  if (correct){
    score++;
  } else {
    score--;
  }

  if (shuffledQuestions.length > currentQuestionIndex + 1){
    nextButton.classList.remove('hidden');
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove('hidden');
  }


};

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
};

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
};

//function endGame() {
//  questionContainerElements.createHTML()
//};

const questions = [
  {
    question: 'Inside which HTML element do we put the Javascript?',
    answers: [
      {text: '<script>', correct: true },
      {text: '<js>', correct: false },
      {text: '<javascript>', correct: false },
      {text: '<scripting>', correct: false }
    ]
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    answers: [
      {text: 'msgBox("Hello World");', correct: false },
      {text: 'alert("Hello World")', correct: true },
      {text: 'alertBox("Hello World")', correct: false },
      {text: 'msg("Hello World")', correct: false }
    ]
  },
  {
    question: 'How do you call a function named "myFunction"?',
    answers: [
      {text: 'call myFunction()', correct: false },
      {text: 'call funtion myFunction()', correct: false },
      {text: 'myFunction()', correct: true },
      {text: 'ring ring myFunction()', correct: false }
    ]
  },
  {
    question: 'How does a FOR loop start?',
    answers: [
      {text: 'for (i < 5; i++)', correct: false },
      {text: 'for (i = 0; i++)', correct: false },
      {text: 'for (i = 0; i < 5; i++)', correct: true },
      {text: 'for (i = 0; i < 5)', correct: false }
    ]
  },
  {
    question: 'How can you add a comment in a JavaScript?',
    answers: [
      {text: '<!--This is a comment-->', correct: false },
      {text: '`This is a comment', correct: false },
      {text: '//This is a comment', correct: true },
      {text: '%%This is a comment', correct: false }
    ]
  }
];