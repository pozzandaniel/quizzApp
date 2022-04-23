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

function init() {
   let lastQ = document.getElementById('lastQ');
   let presentQ = document.getElementById('presentQ');
   lastQ.innerHTML = questions.length;
   presentQ.innerHTML = currentQ + 1;
   showQuestion();
}

function showQuestion() {
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
    console.log(selectionNumber);
    console.log(correctAnswer);
    if (selectionNumber== correctAnswer){
        console.log('Die Antwort ist genau richtig!!')
        document.getElementById(selection).parentNode.classList.add('bg-success');
    } else {
        console.log('Die Antwort ist leider Falsch :(')
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    }
    
    
}