
let category = '';
let difficulty = 'easy';

async function loadQuestionSet() {
    category = localStorage.getItem('category');
    difficulty = localStorage.getItem('difficulty');
    amount = localStorage.getItem('amount');
    let url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    // let question = responseAsJSON['results'][0]['question'];
    fillQuestions(responseAsJSON); 
    fillAnswersRandomly(responseAsJSON);
    init();
}

function selectCategory(id) {
   category = document.getElementById(id).id;
   localStorage.setItem('category', category);
}

function setDifficulty(id){
    difficulty = document.getElementById(id).id;
    localStorage.setItem('difficulty', difficulty);
}

// function setNumberQuestions(){
//     amount = document.getElementById('questionsInput').value;
//     localStorage.setItem('amount', amount);
//     console.log(amount);
// }

function fillQuestions(responseAsJSON){
    for(let i = 0; i < questions.length; i++){
        let question = responseAsJSON['results'][i]['question'];
        questions[i]['question'] = question;
    }
}

function fillAnswersRandomly(responseAsJSON){
    for(let i = 0; i < questions.length; i++) {
        getRandomPosition();
        let inc_answ0 = responseAsJSON['results'][i]['incorrect_answers'][0];
        let inc_answ1 = responseAsJSON['results'][i]['incorrect_answers'][1];
        let inc_answ2 = responseAsJSON['results'][i]['incorrect_answers'][2];
        let correct_answer = responseAsJSON['results'][i]['correct_answer']; 
        questions[i][`answer${a1}`] = inc_answ0;
        questions[i][`answer${a2}`] = inc_answ1;
        questions[i][`answer${a3}`] = inc_answ2;
        questions[i][`answer${a4}`] = correct_answer;
        questions[i]['correct'] = `${a4}`;
    }
}


let a1;
let a2;
let a3;
let a4;


function getRandomPosition(){
    for(let i = 0; i < Infinity; i++){
        let number1 = getRandomNumber(1, 4);
        let number2 = getRandomNumber(1, 4);
        let number3 = getRandomNumber(1, 4);
        let number4 = getRandomNumber(1, 4);
        if(number1 != number2 && number1 != number3 && number1 !=number4 && number2 != number3 && number2 != number4 && number3 != number4){
            a1 = number1;
            a2 = number2;
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




let questions = [
    {
        'question': '',
        'answer1': '',
        'answer2': '', 
        'answer3': '', 
        'answer4': '',
        'correct': ''
    },
    {
        'question': '',
        'answer1': '',
        'answer2': '', 
        'answer3': '', 
        'answer4': '',
        'correct': ''
    },
    {
        'question': '',
        'answer1': '',
        'answer2': '', 
        'answer3': '', 
        'answer4': '',
        'correct': ''
    },
    {
        'question': '',
        'answer1': '',
        'answer2': '', 
        'answer3': '', 
        'answer4': '',
        'correct': ''
    },
    {
        'question': '',
        'answer1': '',
        'answer2': '', 
        'answer3': '', 
        'answer4': '',
        'correct': ''
    },
    {
        'question': '',
        'answer1': '',
        'answer2': '', 
        'answer3': '', 
        'answer4': '',
        'correct': ''
    },
    {
        'question': '',
        'answer1': '',
        'answer2': '', 
        'answer3': '', 
        'answer4': '',
        'correct': ''
    },
    {
        'question': '',
        'answer1': '',
        'answer2': '', 
        'answer3': '', 
        'answer4': '',
        'correct': ''
    },
    {
        'question': '',
        'answer1': '',
        'answer2': '', 
        'answer3': '', 
        'answer4': '',
        'correct': ''
    },
    {
        'question': '',
        'answer1': '',
        'answer2': '', 
        'answer3': '', 
        'answer4': '',
        'correct': ''
    }

];
let currentQ = 0;
let positivResult = 0;
let audio_success = new Audio('./audio/success.mp3');
let audio_wrong = new Audio('./audio/wrong.mp3');
let audio_triumph = new Audio('./audio/triumph.mp3');
let audio_failure = new Audio('./audio/game_over.mp3');

function init() {
   let lastQ = document.getElementById('lastQ');
   lastQ.innerHTML = questions.length;
   showQuestion();
   currentQuestion();
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

function newQuestion() {
    let categoryImg = document.getElementById('header-img');
    let question = questions[currentQ];
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

function answer(selection){
    let question = questions[currentQ];
    let correctAnswer = question['correct'];
    let selectionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer${question['correct']}`;
    if (rightAnswer(selectionNumber, correctAnswer)){
        rightAnswerEffect(selection); 
    } else {
        wrongAnswerEffect(selection, idOfRightAnswer);
    }
    enableButton();
}

function enableButton(){
    document.getElementById('next-button').disabled = false;   
}

function rightAnswer(selectionNumber, correctAnswer){
    return selectionNumber== correctAnswer;
}

function rightAnswerEffect(selection) {
    document.getElementById(selection).parentNode.classList.add('bg-success');
    audio_success.play();
    positivResult++;
}

function wrongAnswerEffect(selection, idOfRightAnswer){
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    audio_wrong.play();
}

function nextQuestion() {
    removeBackgroundColorOfAnswers();
    currentQ++;
    disableButton();
    showQuestion();
    currentQuestion();
    percentCalculate();
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

function reset() {
    if (positivResult/questions.length > 0.6){
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