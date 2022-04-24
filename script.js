let questions = [
    {
        'question': 'Wer hat Internet entwickelt?',
        'answer1': 'Steve Jobs',
        'answer2': 'MIT und US-Verteidigungsministerium', 
        'answer3': 'WWF', 
        'answer4': 'Napoleon Bonaparte',
        'correct': '2'
    },
    {
        'question': 'Wo ist der Sitz von IBM?',
        'answer1': 'die Niederlanden',
        'answer2': 'Österreich', 
        'answer3': 'Irland', 
        'answer4': 'die Vereinigten Staaten',
        'correct': '4'
    },
    {
        'question': 'Welcher Satz gehört nicht zu Asimovs Gesetze?',
        'answer1': 'Ein Roboter darf kein menschliches Wesen verletzen',
        'answer2': 'Ein Roboter muss den ihm von einem Menschen gegebenen Befehlen gehorchen', 
        'answer3': 'Ein Roboter darf kein menschliches Wesen in Notfallsituationen helfen', 
        'answer4': 'Ein Roboter muss seine Existenz beschützen',
        'correct': '3'
    },
    {
        'question': 'Welche ist die beliebste Programmiersprache laut Redmonk-Index (2022)',
        'answer1': 'Javascript',
        'answer2': 'PHP', 
        'answer3': 'Swift', 
        'answer4': 'C/C++',
        'correct': '1'
    },
    {
        'question': 'Wann wurde das Konzept von Bitcoin erstmals vorgeschlagen?',
        'answer1': '1975',
        'answer2': '1916', 
        'answer3': '2018', 
        'answer4': '2008',
        'correct': '4'
    },
    {
        'question': 'Welche ist die beliebste Programmiersprache laut Redmonk-Index (2022)',
        'answer1': 'Javascript',
        'answer2': 'PHP', 
        'answer3': 'Swift', 
        'answer4': 'C/C++',
        'correct': '1'
    }

];
let currentQ = 0;
let positivResult = 0;
let audio_success = new Audio('./audio/success.mp3');
let audio_wrong = new Audio('./audio/wrong.mp3');
let audio_triumph = new Audio('./audio/triumph.mp3');

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
    let question = questions[currentQ];
    let questionTitle = document.getElementById('questionTitle');
    let answer1 = document.getElementById('answer1');
    let answer2 = document.getElementById('answer2');
    let answer3 = document.getElementById('answer3');
    let answer4 = document.getElementById('answer4');
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

function reset() {
    document.getElementById('header-img').src = './img/trophy.png';
    document.getElementById('header-img').classList.add('img-end');
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display:none';
    let totalQ = document.getElementById('totalQ');
    let rightA = document.getElementById('rightA');
    totalQ.innerHTML = questions.length;
    rightA.innerHTML = positivResult;
    audio_triumph.play();
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
    currentQ = 0;
    positivResult = 0;
    init();
    percentCalculate();
}