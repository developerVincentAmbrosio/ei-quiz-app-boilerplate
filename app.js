
//store.questions[store.questionNumber].answers[0]

/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What location is known as “the cradle of civilization"?',
      answers: [
        'Babylon',
        'Yucatán Peninsula',
        'Mesopotamia',
        'Ethiopia'
      ],
      correctAnswer: 'Mesopotamia'
    },
    {
      question: 'What was the first system of writing?',
      answers: [
        'Sanskrit',
        'Latin',
        'Cuneiform',
        'Hieroglyphics'
      ],
      correctAnswer: 'Cuneiform'
    },
    {
      question: 'What year did the Protestant Reformation take place in?',
      answers: [
        '1492',
        '1517',
        '1620',
        '1715'
      ],
      correctAnswer: '1517'
    },
    {
      question: 'The Industrial Revolution started in what country?',
      answers: [
        'Germany',
        'England',
        'United States',
        'India'
      ],
      correctAnswer: 'England'
    },
    {
      question: 'Which entrepreneur was quoted as saying a customer can have “any color he wants, so long as it is black”?',
      answers: [
        'Alexander Graham Bell',
        'Henry Ford',
        'Milton Hersey',
        'Thomas Edison'
      ],
      correctAnswer: 'Henry Ford'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  wasAnswerCorrect: false
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

//displays landing page
function startingPage() {
  return `<div class="group start-end">
            <div class="item">
              <p>This quiz will test your knowledge from ancient history to the Industrial Revolution.</p>
              <button type="button" class="start">Start Quiz!</button>
            </div>
          </div>`;
}

//dispays question form
function questionsFormTemplate() {
  return `<div class="group">
            <div class="question-score">
              <ul>
                <li>Question Number ${store.questionNumber + 1}/${store.questions.length}</li>
                <li>Score ${store.score}/${store.questions.length}</li>
              </ul>
            </div>  
            <div class="item panel">
              <form id="questionForm">
                <fieldset>
                  <legend>${store.questions[store.questionNumber].question}</legend>
                  <div class="options">
                    <div id="option1">
                      <input type="radio" name="options" id="option1" required>
                      <label for="option1"> ${store.questions[store.questionNumber].answers[0]}</label>
                    </div>
                    <div id="option2">
                      <input type="radio" name="options" id="option2" required>
                      <label for="option2"> ${store.questions[store.questionNumber].answers[1]}</label>
                    </div>
                    <div id="option3">
                      <input type="radio" name="options" id="option3" required>
                      <label for="option3"> ${store.questions[store.questionNumber].answers[2]}</label>
                    </div>
                    <div id="option4">
                      <input type="radio" name="options" id="option4" required>
                      <label for="option4"> ${store.questions[store.questionNumber].answers[3]}</label>
                    </div>
                    <input type="submit" id="submit">
                  </div>
                  <div class="hidden">
                    <p class="js-user-feedback-text answered"></p>
                    <button type="button" id="next">next</button>
                  </div>    
                </fieldset>
              </form>
            </div>
          </div>`;
}

function results () {
  return `<div class="group start-end">
            <div class="item">
              <p>You scored ${store.score}/${store.questions.length}!</p>
              <button type="reset" class="reset">Restart Quiz!</button>
            </div>
          </div>  
         `;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function landingPage() {
  $('main').html(startingPage);
  startButtonListener();
}

// Renders question template and attach submit and next button event listeners
function setupNextQuestion() {
  $('.js-quiz').html(questionsFormTemplate);
  setupFormSubmitListener();
}

function displayFinalResults() {
  $('.js-quiz').html(results);
  resetQuizListener();
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

//helper function used in userFeedback and handleCurrentScore functions
function checkUserAnswer(answer) {
  if (store.questions[store.questionNumber].correctAnswer === answer) {
    store.wasAnswerCorrect = true;
    store.score +=1;
  } else {
    store.wasAnswerCorrect = false;
  }
}

function setupFormSubmitListener() {
  $('#questionForm').submit(function(event) {
    event.preventDefault();
    let userAnswer = $("input[type='radio']:checked").next().text().trim();
    checkUserAnswer(userAnswer);
   $('.js-user-feedback-text').text(store.wasAnswerCorrect ? "Correct!" : "Incorrect; the correct answer is " + store.questions[store.questionNumber].correctAnswer) + ".";
   $('.js-user-feedback-text').addClass(store.wasAnswerCorrect ? 'correct' : 'wrong');
   $('.hidden').removeClass();
   $('#submit').addClass('hidden');
   nextQuestionListener();
  });
}

function startButtonListener() {
  $('.start').on('click', function(event) {
    store.quizStarted = true;
    setupNextQuestion();
  });
}

function resetQuizListener() {
  $('.reset').on('click', function(event) {
    store.quizStarted = false;
    store.questionNumber = 0;
    store.score = 0;
    landingPage();
  });
}

function nextQuestionListener() {
  $('#next').on('click', function(event) {
    store.questionNumber += 1;
    store.questionNumber < store.questions.length ? setupNextQuestion() : displayFinalResults();
  });
}

function handleRunQuiz(){
  landingPage();
//  startButtonListener();
  setupFormSubmitListener();
}

$(handleRunQuiz);