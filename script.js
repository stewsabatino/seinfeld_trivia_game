// variable selected through HTML
var $a = document.querySelector("a");
var $countdown = document.getElementById("timeLeft");
var $card = document.getElementById("card");
var $h1 = document.querySelector("h1");
var $h2 = document.querySelector("h2");
var ans1 = document.getElementById("ans1");
var ans2 = document.getElementById("ans2");
var ans3 = document.getElementById("ans3");
var ans4 = document.getElementById("ans4");
var startBtn = document.getElementById("start")
var $footer = document.querySelector("footer");
var $btn = document.querySelectorAll(".btn")

// Start time
var secondsLeft = 40;


function init() {
    $countdown.textContent = "Time Left: 40s";
    $h1.textContent = "Welcome to SEINFELD TRIVIA!!!!";
    $h2.textContent = "You will have 40 seconds to answer 6 Seinfeld related questions. Got a question wrong? 8 seconds will be deducted from the time left. Think you have a high score? Put your initials in at the end of the game and compare with others and yourself! When you are ready, click the start button and the trivia game will begin!";
    startBtn.textContent = "START"
    ans1.style.visibility = "hidden";
    ans2.style.visibility = "hidden";
    ans3.style.visibility = "hidden";
    ans4.style.visibility = "hidden";
};


        
var q1 = function () {
    console.log("start q1");
    $h1.style.visibility = "hidden"
    startBtn.remove();
    $h2.textContent = "Jerry received the ”Astronaut Pen” from whom?";
    ans1.style.visibility = "visible"
    ans1.dataset.state = "false"
    ans1.textContent = "Morty Seinfeld"
    ans2.style.visibility = "visible"
    ans2.dataset.state = "true"
    ans2.textContent = "Jack Clompas"
    ans3.style.visibility = "visible"
    ans3.dataset.state = "false"
    ans3.textContent = "George Costanza"
    ans4.style.visibility = "visible"
    ans4.dataset.state = "false"
    ans4.textContent = "Jackie Chiles"
};

var q2 = function () {
    console.log("start q2");
    $h2.textContent = "What are the names of George's horses?";
    ans1.dataset.state = "false"
    ans1.textContent = "Koko and Liza"
    ans2.dataset.state = "false"
    ans2.textContent = "Rusty and Newman"
    ans3.dataset.state = "true"
    ans3.textContent = "Snoopy and Prickly Pete"
    ans4.dataset.state = "false"
    ans4.textContent = "G-bone and T-bone"
};

var q3 = function () {
    console.log("star q3");
    $h1.style.visibility = "hidden"
    $h2.textContent = "What was the reason that Babu Bhatt’s brothers disliked Snapple?";
    ans1.dataset.state = "true" 
    ans1.textContent = "Too fruity"
    ans2.dataset.state = "false"
    ans2.textContent = "Too sweet"
    ans3.dataset.state = "false"
    ans3.textContent = "He likes the glass bottles instead of the plastic"
    ans4.dataset.state = "false"
    ans4.textContent = "He likes orange juice"
};

var q4 = function () {
    console.log("start q4");
    $h1.style.visibility = "hidden"
    $h2.textContent = "Where did Elaine want to go to grab a quick bite to eat while waiting for a table in ”The Chinese Restaurant”?";
    ans1.dataset.state = "false"
    ans1.textContent = "Kenny Rogers Roasters"
    ans2.dataset.state = "false"
    ans2.textContent = "Famous Original Ray's"
    ans3.dataset.state = "false"
    ans3.textContent = "Monk's"
    ans4.dataset.state = "true"
    ans4.textContent = "Sky Burger"
};

var highScoreForm;
var initialsInput;

function populateScoreCard() {
    highScoreForm = document.createElement("form")
    var initialsInput = document.createElement("input")
    initialsInput.setAttribute("id", "ii")
    initialsInput.placeholder = "Type Initials Here"
    highScoreForm.appendChild(initialsInput)
    $card.appendChild(highScoreForm)
}


function storeInitials() {
    localStorage.setItem("scores", JSON.stringify(scores))
}

function storedScores() {
    var storedScores = JSON.parse(localStorage.getItem("scores"))

    if (storedScores !==null) {
        var $ul = document.createElement("ul");
        $card.appendChild($ul);
        var li = document.createElement("li");
        var initialsScore = storedScores
        li.textContent = initialsScore
        $ul.appendChild(li);
    }
}

var scoreCard = function () {
    $h1.style.visibility = "visible"
    $h1.textContent = "High Scores"
    $h2.textContent = "Enter your score!"
    $countdown.style.visibility = "none"
    ans1.style.display = "none"
    ans2.style.display = "none"
    ans3.style.display = "none"
    ans4.style.display = "none"
    populateScoreCard()
    storedScores()
    $card.addEventListener("submit", function(event) {
        event.preventDefault()

        var initials = document.getElementById("ii").value.trim()
        
        var $ul = document.createElement("ul");
        $card.appendChild($ul);
        var li = document.createElement("li");
        localStorage.setItem("initial", initials)
        var initialsScore = [initials, secondsLeft]
        li.textContent = initials + " Score: " + localStorage.getItem("score");
        localStorage.setItem("scorecard", JSON.stringify(initialsScore))
        $ul.appendChild(li);
    } )
}


var questionArray = [q1, q2, q3, q4];

function nextQuestion() {
    if (questionArray.length > 0) {
        console.log("choosing next question")
        questionArray[0]()
        questionArray.shift()
    } else {
        localStorage.setItem("score", secondsLeft)
        console.log(secondsLeft)
        clearInterval(timerInterval)
        scoreCard()
    }
};

var timerInterval;

function setTime() {
  // Sets interval in variable
    timerInterval = setInterval(function() {
    secondsLeft--;
    $countdown.textContent = "Time Left: " + secondsLeft + "s";

    if (secondsLeft <= 0) {
        localStorage.setItem("score", secondsLeft)
        console.log(secondsLeft)
        clearInterval(timerInterval)
        // Calls function to go to highscores
        scoreCard()

    }

  }, 1000);
}

function wrongAnswer() {
    secondsLeft = secondsLeft - 8
    alert("WRONG ANSWER")
}

function selectAnswer(event) {
    event.preventDefault();
    var element = event.target;

    if (element.matches(".btn")) {

        var state = element.getAttribute("data-state")
        if (state === "start") {
            console.log("start timer")
            setTime();
            nextQuestion();
        } else if (state === "true") {
            alert("CORRECT ANSWER")
            nextQuestion();
        } else {
            wrongAnswer() 
            console.log("wrong answer")
            nextQuestion();
        }
    }
};

init();
$card.addEventListener("click", selectAnswer) 