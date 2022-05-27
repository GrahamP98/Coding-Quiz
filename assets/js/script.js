// DOM referenced variables
var timerDiv = document.querySelector("#timerDiv");
var timerStart = document.querySelector("#startBtn");
var main = document.querySelector("#main");
var questionsContainer = document.querySelector("#questionsContainer");


// Declared Variables
var deduction = 10;
var questionIndex = 0;
var score = 0;
var secondsLeft = 76;
var hold = 0;


// Creates new unordered list
var ulCreate = document.createElement("ul");

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
        question: "Media quiries need to be put on the  ____ of the CSS page.",
        choices: ["Top", "Middle", "Bottom", "Anywhere, it doesnt matter"],
        answer: "Bottom"
    }
]

// Timer specific variables
var timeEl = document.querySelector("#time")
var time = questions.length * 15;
var timerId;

// Determines how much time is left if 0 quiz ends.
timerStart.addEventListener("click", function () {

    if (hold === 0) {
        hold = setInterval(function () {
            secondsLeft--;
            timerDiv.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(hold);
                gameOver();
                timerDiv.textContent = "Out of time!";
            }
        }, 1000);
    }
    retrieve(questionIndex);
});

//determines which question needs to be presented
function retrieve(questionIndex) {

    questionsContainer.innerHTML = "";
    ulCreate.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {

        var userQuestion = questions[questionIndex].question;
        var userChoices = questions[questionIndex].choices;
        questionsContainer.textContent = userQuestion;
    }

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsContainer.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (verifier));
    })
}

// determines if user is right or wrong depending on answer picked.
function verifier(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!";
        } else {
            secondsLeft = secondsLeft - deduction;
            createDiv.textContent = "Wrong!";
        }
    }

    questionIndex++;

    if (questionIndex >= questions.length) {

        gameOver();
        createDiv.textContent = "Good Job!"
    } else {
        retrieve(questionIndex);
    }
    questionsContainer.appendChild(createDiv);
}

// when quiz is over user will be notified of score and issued a prompt to enter initials. this gets stored on local storage.
function gameOver() {
    questionsContainer.innerHTML = "";
    timerDiv.innerHTML = "";
//the next 5 vars are creating corresponding elements and filling them with text content.
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Quiz Over!"

    questionsContainer.appendChild(createH1);


    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsContainer.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeLeft = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(hold);
        createP.textContent = "Your score is: " + timeLeft;

        questionsContainer.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter Your Initials: ";

    questionsContainer.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsContainer.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit"

    questionsContainer.appendChild(createSubmit);
// when submit is clicked scores get stored on local storage if no initials were entered it says "no initials entered"
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No initials entered!");

        } else {
            var userScore = {
                initials: initials,
                score: timeLeft
            }
            console.log(userScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(userScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
        }
    });
}