var $a = document.querySelector("a");
var $timeLeftCountdown = document.getElementById("timeLeft");
var $card = document.getElementById("card");
var $h1 = document.querySelector("h1");
var $h2 = document.querySelector("h2");
var ans1 = document.getElementById("ans1");
var ans2 = document.getElementById("ans2");
var ans3 = document.getElementById("ans3");
var ans4 = document.getElementById("ans4");
var $footer = document.querySelector("footer");
var $btn = document.querySelectorAll(".btn")


function init() {
    $timeLeftCountdown.textContent = "Time Left: 60";
    $h1.textContent = "Welcome to SEINFELD TRIVIA!!!!";
    $h2.textContent = "You will have 60 seconds to answer 6 Seinfeld related questions. Got a question wrong? 8 seconds will be deducted from the time left. Think you have a high score? Put your initials in at the end of the game and compare with others and yourself! When you are ready, click the start button and the trivia game will begin!";
    ans1.textContent = "START";
    ans2.textContent = "Don't Start";
    ans3.style.visibility = "hidden";
    ans4.style.visibility = "hidden";
};


        
var q1 = function () {
    console.log("start q1");
    $h1.style.visibility = "hidden"
    $h2.textContent = "A Seinfeld Question regarding Jerry Seinfeld";
    ans1.dataset.state = "false"
    ans1.textContent = "Wrong Answer"
    ans2.style.visibility = "visible"
    ans2.dataset.state = "true"
    ans2.textContent = "Right Answer"
    ans3.style.visibility = "visible"
    ans3.dataset.state = "false"
    ans3.textContent = "Wrong Answer"
    ans4.style.visibility = "visible"
    ans4.dataset.state = "false"
    ans4.textContent = "Wrong Answer"
};

var q2 = function () {
    console.log("start q2");
    $h2.textContent = "A Seinfeld Question regarding George Costanza";
    ans1.dataset.state = "false"
    ans1.textContent = "Wrong Answer"
    ans2.dataset.state = "false"
    ans2.textContent = "Wrong Answer"
    ans3.dataset.state = "true"
    ans3.textContent = "Right Answer"
    ans4.dataset.state = "false"
    ans4.textContent = "Wrong Answer"
};

var q3 = function () {
    console.log("star q3");
    $h1.style.visibility = "hidden"
    $h2.textContent = "A Seinfeld Question regarding a side character";
    ans1.dataset.state = "true" 
    ans1.textContent = "Right Answer"
    ans2.dataset.state = "false"
    ans2.textContent = "Wrong Answer"
    ans3.dataset.state = "false"
    ans3.textContent = "Wrong Answer"
    ans4.dataset.state = "false"
    ans4.textContent = "Wrong Answer"
};

var q4 = function () {
    console.log("start q4");
    $h1.style.visibility = "hidden"
    $h2.textContent = "A Seinfeld Question regarding a place";
    ans1.dataset.state = "false"
    ans1.textContent = "Wrong Answer"
    ans2.dataset.state = "false"
    ans2.textContent = "Wrong Answer"
    ans3.dataset.state = "false"
    ans3.textContent = "Wrong Answer"
    ans4.dataset.state = "true"
    ans4.textContent = "Right Answer"
};

var questionArray = [q1, q2, q3, q4];

function nextQuestion() {
    if (questionArray.length > 0) {
        console.log("choosing next question")
        questionArray[0]()
        questionArray.shift()
        console.log("answer 1 state " + ans1.dataset.state)
        console.log("answer 2 state " + ans2.dataset.state)
        console.log("answer 3 state " + ans3.dataset.state)
        console.log("answer 4 state " + ans4.dataset.state)
    } else {
        // scorecard
    }
};

function selectAnswer() {
    var element = event.target;

    if (element.matches(".btn")) {

        var state = element.getAttribute("data-state")
        if (state === "true") {
            console.log("started");
            nextQuestion();
        } else {
            // subtract time
            console.log("wrong answer")
            nextQuestion();
        }
    }
};


init();
console.log("answer 1 state " + ans1.dataset.state)
console.log("answer 2 state " + ans2.dataset.state)
console.log("answer 3 state " + ans3.dataset.state)
console.log("answer 4 state " + ans4.dataset.state)
card.addEventListener("click", selectAnswer)