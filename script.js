// Quiz state variables
var questionIndex = 0;
var state = 'start';
// DOM referenced variables
var startsecEl = document.querySelector("#startsec");
var quizsecEl = document.querySelector("#quizsec");
var endsecEl = document.querySelector("#endsec");
var startBtn = document.querySelector("#startbtn");
var submitBtn = document.querySelector("#submit")
var quizTitle = document.querySelector("#q-title");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");

// Timer specific variables
var timeEl = document.querySelector("#time")
var time = questions.length * 15;
var timerId;


function quizStart() {

    startsecEl.setAttribute("class", "ghost");

    quizsecEl.setAttribute("class", "visible");

    timerId = setInterval(tick, 1000);

    timeEl.textContent = time;

    getQuestion();
}

function tick() {
    time--;
    timeEl.textContent = time;

    if (time <= 0) {
        endsecEl();
    }
}

function getQuestion() {
    var currentQuestion = questions[questionIndex];

    var titleEl = document.getElementById("q-title");
    titleEl.textContent = currentQuestion.title;

    choicesEl.innerHTML = "";

    currentQuestion.choices.forEach(function (choice, i) {

        var choicebtns = document.createElement("button");
        choicebtns.setAttribute("class", "choice");
        choicebtns.setAttribute("value", choice);

        choicebtns.textContent = i + 1 + ". " + choice;

        choicebtns.onclick = questionClick;

        choicesEl.appendChild(choicebtns);
    });
}

function questionClick() {
    if (this.value !== questions[questionIndex].answer) {
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        timeEl.textContent = time;

        questionIndex++;

        if (questionIndex === questions.length) {
            endQuiz();
        } else {
            getQuestion();
        }
    }
}
startBtn.onclick = quizStart;