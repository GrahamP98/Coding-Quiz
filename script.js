// Quiz state variables
var questionIndex = 0;

// DOM referenced variables
var startsecEl = document.querySelector("#startsec");
var quizsecEl = document.querySelector("#quizsec");
var endsecEl = document.querySelector("#endsec");
var startBtn = document.querySelector("#startbtn");
var submitBtn = document.querySelector("#submit")
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var initialsEl = document.querySelector("#initials");


// Timer specific variables
var timeEl = document.querySelector("#time")
var time = questionsEl.length * 15;
var timerId;

// Questions for coding quiz with choices and correct answer.
var questions = [
    {
        question: "Object properties are made up of ____.",
        choices: ["Key pairs", "Functions", "This statements", "All of the above"],
        answer: "Key pairs"
    },
    {
        question: "What does CSS stand for?",
        choices: ["Complicated Styling Selector", "Cool Style Selections", "Cascading Style Sheets", "Cascading Style Selector"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "The concat() method is used to merge two or more ____.",
        choices: ["Strings", "Arrays", "Booleans", "All of the above"],
        answer: "Arrays"
    },
    {
        question: ".split in javascript takes the given ____ and puts it into a(n) ____.",
        choices: ["String, Array", "Array, String", "Boolean, Table", "String, Variable"],
        answer: "String, Array"
    },
    {
        question: "Media quiries need to be put on ____ of CSS page.",
        choices: ["Top","Middle","Bottom","Anywhere, it doesnt matter"],
        answer: "Bottom"
    }
]

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
        endQuiz();
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
 
function endQuiz() {

    clearInterval(timerId);

    var userendsecEl = document.querySelector("#endsec");
    userendsecEl.setAttribute("class", "visible");

    var userscoreEl = document.querySelector("#userscore");
    userscoreEl.textContent = time;

    quizsecEl.setAttribute("class", "ghost");
}

startBtn.onclick = quizStart;