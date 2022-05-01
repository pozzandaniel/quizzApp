let amount = 6;
let category = '';
let difficulty = 'easy';
// load of the question from the API: Open Trivia Database
async function loadQuestionSet() {
    amount = localStorage.getItem('amount');
    pushObjectInsideArray();
    category = localStorage.getItem('category');    //the variable category is picked up from the local storage
    difficulty = localStorage.getItem('difficulty');  //the variable difficulty is picked up from the local storage
    // amount = localStorage.getItem('amount');
    let url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;  //that's the link from the API, the database of the questions
    let response = await fetch(url);        // the data are taken from the url
    let responseAsJSON = await response.json();     //the data are converted in JSON
    getQuestions();
    fillQuestions(responseAsJSON);   //the JSON data are used in the function to fill the array with the questions of the quiz
    fillAnswersRandomly(responseAsJSON);        //the JSON data are used to fill randomly the answers inside the assigned boxes
    init();
}

function setDifficultyDefault(){
    difficulty = 'easy';
    localStorage.setItem('difficulty', difficulty);
}

function setNumberQuestionsDefault(){
    amount = 6;
    localStorage.setItem('amount', amount);
}

function selectCategory(id) {
    category = document.getElementById(id).id;
    localStorage.setItem('category', category);
}

function setDifficulty(id){
    document.getElementById('difficulty-box').innerHTML = '';
    difficulty = document.getElementById(id).id;
    localStorage.setItem('difficulty', difficulty);
    document.getElementById('difficulty-box').innerHTML += `<h3>Selected difficulty is: ${difficulty}</h3>`;
}

function setNumberQuestions(){
        document.getElementById('questionsNumber-box').innerHTML = '';
        amount = document.getElementById('questionsInput').value;
        localStorage.setItem('amount', amount);
        document.getElementById('questionsNumber-box').innerHTML += `<h3>Number of questions: ${amount}</h3>`;
    }
    
    function pushObjectInsideArray(){
        for(let i = 0; i < amount; i++){
            questions.push(singleQuestion);
        }
        let questionsText = JSON.stringify(questions);
        localStorage.setItem('questions', questionsText);
        
    }
    
    function getQuestions() {
        let questionsText = localStorage.getItem('questions');
        questions = JSON.parse(questionsText);
    }
    
    // the function use a loop to obtain the questions inside the object from the url. Then these informations are used to fill the field questions in the array
    function fillQuestions(responseAsJSON){
        for(let i = 0; i < amount; i++){
            let question = responseAsJSON['results'][i]['question'];
            questions[i]['question'] = question;
            
    }
}

// This function fill the array with the answers of the Open Trivia Database
function fillAnswersRandomly(responseAsJSON){
    for(let i = 0; i < questions.length; i++) {
        getRandomPosition();        // this function generate four random position: a1, a2, a3, a4
        let inc_answ0 = responseAsJSON['results'][i]['incorrect_answers'][0];  //that's the first incorrect answer from the Trivia Database
        let inc_answ1 = responseAsJSON['results'][i]['incorrect_answers'][1];   //that's the second incorrect answer from the Trivia Database
        let inc_answ2 = responseAsJSON['results'][i]['incorrect_answers'][2];   //that's the third incorrect answer from the Trivia Database
        let correct_answer = responseAsJSON['results'][i]['correct_answer'];    //that's the correct answer from the Trivia Database
        questions[i][`answer${a1}`] = inc_answ0;    //the answer with position a1 is filled
        questions[i][`answer${a2}`] = inc_answ1;    //the answer with position a2 is filled
        questions[i][`answer${a3}`] = inc_answ2;    //the answer with position a3 is filled
        questions[i][`answer${a4}`] = correct_answer;   //the nswer with position a4 is filled
        questions[i]['correct'] = `${a4}`;
    }
}


let a1;
let a2;
let a3;
let a4;

// This function generate 4 random number inside an infinite loop. Only when these four numbers are different each others the loop is broken
// the function getRandomNumber() allows to obtain a formatted number inside the range (1 to 4). So the results of the four launches are
// always 1, 2, 3, 4. But also in a different position, for exemple: 2, 3, 1, 4.
function getRandomPosition(){
    for(let i = 0; i < Infinity; i++){
        let number1 = getRandomNumber(1, 4);
        let number2 = getRandomNumber(1, 4);
        let number3 = getRandomNumber(1, 4);
        let number4 = getRandomNumber(1, 4);
        if(number1 != number2 && number1 != number3 && number1 !=number4 && number2 != number3 && number2 != number4 && number3 != number4){
            a1 = number1;  //the result of the launch fill the first variable
            a2 = number2;   //the result of the launch fill the second variable...
            a3 = number3;   
            a4 = number4;
            break;
        }
    }  
}

function getRandomNumber(min, max){
    let number = Math.random()*(max-min)+min;
    return Math.round(number);
}

let singleQuestion = {
    'question': '',
    'answer1': '',
    'answer2': '', 
    'answer3': '', 
    'answer4': '',
    'correct': ''
}

let questions = [];


// let questions = [
//     {
//         'question': '',
//         'answer1': '',
//         'answer2': '', 
//         'answer3': '', 
//         'answer4': '',
//         'correct': ''
//     },
//     {
//         'question': '',
//         'answer1': '',
//         'answer2': '', 
//         'answer3': '', 
//         'answer4': '',
//         'correct': ''
//     },
//     {
//         'question': '',
//         'answer1': '',
//         'answer2': '', 
//         'answer3': '', 
//         'answer4': '',
//         'correct': ''
//     },
//     {
//         'question': '',
//         'answer1': '',
//         'answer2': '', 
//         'answer3': '', 
//         'answer4': '',
//         'correct': ''
//     },
//     {
//         'question': '',
//         'answer1': '',
//         'answer2': '', 
//         'answer3': '', 
//         'answer4': '',
//         'correct': ''
//     },
//     {
//         'question': '',
//         'answer1': '',
//         'answer2': '', 
//         'answer3': '', 
//         'answer4': '',
//         'correct': ''
//     },
//     {
//         'question': '',
//         'answer1': '',
//         'answer2': '', 
//         'answer3': '', 
//         'answer4': '',
//         'correct': ''
//     },
//     {
//         'question': '',
//         'answer1': '',
//         'answer2': '', 
//         'answer3': '', 
//         'answer4': '',
//         'correct': ''
//     },
//     {
//         'question': '',
//         'answer1': '',
//         'answer2': '', 
//         'answer3': '', 
//         'answer4': '',
//         'correct': ''
//     },
//     {
//         'question': '',
//         'answer1': '',
//         'answer2': '', 
//         'answer3': '', 
//         'answer4': '',
//         'correct': ''
//     }

// ];
let currentQ = 0;
let positivResult = 0;
let audio_success = new Audio('./audio/success.mp3');
let audio_wrong = new Audio('./audio/wrong.mp3');
let audio_triumph = new Audio('./audio/triumph.mp3');
let audio_failure = new Audio('./audio/game_over.mp3');

// This function start the functions to show the card with the quiz game
function init() {
   let lastQ = document.getElementById('lastQ');
   lastQ.innerHTML = questions.length;      //the number of the questions at the end of the question card is filled with the length of the array questions
   showQuestion();      //This function shows the questions and the answer in the card
   currentQuestion();   //This function filled the indication of the current question at the bottom of the card
}

function currentQuestion() {
    let presentQ = document.getElementById('presentQ');
    presentQ.innerHTML = currentQ + 1;
}

function showQuestion() {
    if (gameIsOver()){
        reset();
    } else {
        newQuestion();
    }
}

function gameIsOver() {
    return currentQ >= questions.length;
}
// the IDs of the html tags are incapsulated into variables. These variables are then used to load the questions
function newQuestion() {
    let categoryImg = document.getElementById('header-img');
    let question = questions[currentQ];     //questions is the name of the array in this JS file. CurrentQ or "current question" is a variable outside the function, it is incremented of one step by step.
    let questionTitle = document.getElementById('questionTitle');
    let answer1 = document.getElementById('answer1');
    let answer2 = document.getElementById('answer2');
    let answer3 = document.getElementById('answer3');
    let answer4 = document.getElementById('answer4');
    categoryImg.src = `./img/${category}.jpg`;
    questionTitle.innerHTML = `${question['question']}`;
    answer1.innerHTML = `${question['answer1']}`;
    answer2.innerHTML = `${question['answer2']}`;
    answer3.innerHTML = `${question['answer3']}`;
    answer4.innerHTML = `${question['answer4']}`;
}

// This function is initialised when the user click on the answer. Every answer matches with a determinate position
function answer(selection){
    let question = questions[currentQ];      //questions is the name of the array in this JS file. CurrentQ or "current question" is a variable outside the function, it is incremented of one step by step.
    let correctAnswer = question['correct'];
    let selectionNumber = selection.slice(-1);  //this function takes from the variable selection for example "answer-1", the last element of the string in this case "1"
    let idOfRightAnswer = `answer${question['correct']}`;   //question['correct'] represents the position of the right answer for example "2". This character is added to the text "answer" to obtain the ID of the right answer. In this case: "answer2"
    if (rightAnswer(selectionNumber, correctAnswer)){   // if the selected answer and the correct answer have the same position, then the answer is right and the variable positivResult is incremented
        rightAnswerEffect(selection);       //a sounds is permormed
    } else {
        wrongAnswerEffect(selection, idOfRightAnswer);      //if the selected answer and the right answer doesn't match, then the variable positivResult is not incremented
    }
    enableButton();     //when an answer is given the button for the next question at the bottom of the card is enabled
}

function enableButton(){
    document.getElementById('next-button').disabled = false;   
}

function rightAnswer(selectionNumber, correctAnswer){
    return selectionNumber== correctAnswer;
}

// With this function the background of the right answer selected is colored of green and a related "positive" sounds is performed
function rightAnswerEffect(selection) {
    document.getElementById(selection).parentNode.classList.add('bg-success');
    audio_success.play();
    positivResult++;
}

// With this function the background of the wrong answer selected is colored of red and a related "negative" sounds is performed.
// Then the right answer is colored of green to show the right answer
function wrongAnswerEffect(selection, idOfRightAnswer){
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    audio_wrong.play();
}

// When the button at the end of the card is enabled. You are allowed to click on it, and to pass at the next question of the quiz. This are shown in the card
function nextQuestion() {
    removeBackgroundColorOfAnswers();   //the green and red backgrounds of the given answers are removed
    currentQ++;         //the current questions is incremented of 1
    disableButton();    //the button "next question" is disbled again
    showQuestion();     //the new question is shown
    currentQuestion();  //the current question is wrote at the bottom of the card
    percentCalculate(); //the progressbar inside the card is updated
}

function disableButton(){
    document.getElementById('next-button').disabled = true; 
}

function removeBackgroundColorOfAnswers(){
    let question = questions[currentQ];
    let idOfRightAnswer = `answer${question['correct']}`;
    document.getElementById(idOfRightAnswer).parentNode.classList.remove('bg-success');
    document.getElementById('answer1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer4').parentNode.classList.remove('bg-danger');
}

let triumph = './img/trophy.png';
let failure = './img/game_over.jpg';
// This function reset the quiz, in the first part there is two possibilities of end screen related to the score of the user.
function reset() {
    if (positivResult/questions.length >= 0.6){
        document.getElementById('header-img').src = triumph;
        document.getElementById('header-img').classList.add('height-400px');
        audio_triumph.play();
    } else {
        document.getElementById('header-img').src = failure;
        document.getElementById('header-img').classList.add('height-400px');
        audio_failure.play();
    }
    document.getElementById('header-img').classList.add('img-end');
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display:none';
    let totalQ = document.getElementById('totalQ');
    let rightA = document.getElementById('rightA');
    totalQ.innerHTML = questions.length;
    rightA.innerHTML = positivResult;
}

function percentCalculate(){
    let progressBar = document.getElementById('progressBar');
    let percent = currentQ/questions.length;
    percent = percent*100;
    percent = Math.round(percent);
    progressBar.innerHTML = `${percent}%`;
    progressBar.style.width = `${percent}%`;
}

function restartGame() {
    document.getElementById('header-img').src = './img/banner.jpg';
    document.getElementById('questionBody').style = '';
    document.getElementById('endScreen').style = 'display:none';
    document.getElementById('header-img').classList.remove('img-end');
    document.getElementById('header-img').classList.remove('height-400px');
    currentQ = 0;
    positivResult = 0;
    init();
    percentCalculate();
}