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
  score: 0
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
  return `<div class="group">
  <div class="item">
    <p>This quiz will test your knowledge from ancient history to the Industrial Revolution.</p>
      <button type="button" class="start">Start Quiz!</button>
    </div>
  </div>`;
}

//dispays question form
function questionsForm() {
  return `<div class="group">
  <div class="item">
    <ul>
      <li>Question Number ${store.questionNumber}/5</li>
      <l1>Score X/5</l1>
    </ul>
    <form id="questionForm" class="questionForm">
      <fieldset>
        <div class="question">
          <legend>${store.questions[store.questionNumber].question}</legend>
        </div>
        <div class="options">
          <div class="answers">
            <div id="option-1">
            <input type="radio" name="options" id="option1" required>
            <label for="option-1"> ${store.questions[store.questionNumber].answers[0]}</label>
            </div>
            <div id="option-2">
            <input type="radio" name="options" id="option2" required>
            <label for="option-2"> ${store.questions[store.questionNumber].answers[1]}</label>
            </div>
            <div id="option-3">
            <input type="radio" name="options" id="option3" required>
            <label for="option-3"> ${store.questions[store.questionNumber].answers[2]}</label>
            </div>
            <div id="option-4">
            <input type="radio" name="options" id="option4" required>
            <label for="option-4"> ${store.questions[store.questionNumber].answers[3]}</label>
            </div>
            <div>
            <input type="submit" id="Submit">
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</div>`;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function landingPage() {
  $('main').html(startingPage);
}

function displaysQuestionsForm() {
  $('.js-quiz').html(questionsForm);
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function checkUserAnswer(answer) {
  if (store.questions[store.questionNumber].correctAnswer === answer) {
    console.log("Correct!");
  } else {
    console.log("Incorrect; the correct answer is " + store.questions[store.questionNumber].correctAnswer);
  }
}

function setupFormSubmitListener() {
  $('#questionForm').submit(function(event) {
    event.preventDefault();
    let userAnswer = $("input[type='radio']:checked").next().text();
    checkUserAnswer(userAnswer);
  });
}

function startButtonListener() {
  $('.start').on('click', function(event) {
    store.quizStarted = true;
    displaysQuestionsForm();
    setupFormSubmitListener();
  });
}



function questionNumberCounter() {
  if (store.quizStarted == true); {
      return store.questionNumber ++;
    }
  }

function handleRunQuiz(){
  landingPage();
  startButtonListener();
  setupFormSubmitListener();
  questionNumberCounter();
}

$(handleRunQuiz);