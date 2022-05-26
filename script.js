// DOM referenced variables
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startBtn");
var wrapper = document.querySelector("#wrapper");
var questionsDiv = document.querySelector("#questionsDiv");
// var highScore = document.querySelector("#highScore");
// var clear = document.querySelector("#clear");
// var goBack = document.querySelector("#goBack");

// Declared Variables
var deduction = 10;
var questionIndex = 0;
var score = 0;
var secondsLeft = 76;
var holdInterval = 0;


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

timer.addEventListener("click", function () {

    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                gameOver();
                currentTime.textContent = "Out of time!";
            }
        }, 1000);
    }
    render(questionIndex);
});
function render(questionIndex) {

    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {

        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
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
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}

function gameOver() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Quiz Over!"

    questionsDiv.appendChild(createH1);


    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeLeft = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your score is: " + timeLeft;

        questionsDiv.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter Your Initials: ";

    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit"

    questionsDiv.appendChild(createSubmit);

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

// clear.addEventListener("click", function () {
//     localStorage.clear();
//     location.reload();
// });

// var allScores = localStorage.getItem("allScores");
// allScores = JSON.parse(allScores);

// if (allScores !== null) {
//     for (var i = 0; i < allScores.length; i++) {

//     }
// }