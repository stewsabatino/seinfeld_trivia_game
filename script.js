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

// initial load onto webpage (homepage)
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


// Question 1 and answers
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

// Question 2
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

// Question 3
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

// Question 4
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

// highScoreForm and initalsInput global
var highScoreForm;
var initialsInput;

// creating a form, input and putting them on the page
function populateScoreCard() {
    highScoreForm = document.createElement("form")
    var initialsInput = document.createElement("input")
    initialsInput.setAttribute("id", "ii")
    initialsInput.placeholder = "Type Initials Here"
    highScoreForm.appendChild(initialsInput)
    $card.appendChild(highScoreForm)
}


// storing scores into local storage
function storeInitials() {
    localStorage.setItem("scores", JSON.stringify(scores))
}

// getting stored scores and putting them on page
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

// high score page. Added populateScoreCard and storedScores to run
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
    // added event listener to input field to make ul, li and append the initials and score onto page
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

// questions in an array
var questionArray = [q1, q2, q3, q4];

// pull first question out of array and then delete it
function nextQuestion() {
    if (questionArray.length > 0) {
        questionArray[0]()
        questionArray.shift()
    } else {
        // if no more questions, store seconds left and go to score card
        localStorage.setItem("score", secondsLeft)
        clearInterval(timerInterval)
        scoreCard()
    }
};

// timerInterval set to gloabal
var timerInterval;

function setTime() {
  // Sets interval in variable
    timerInterval = setInterval(function() {
    secondsLeft--;
    $countdown.textContent = "Time Left: " + secondsLeft + "s";
    // Once timer hits 0 save score to local storage and run score card function
    if (secondsLeft <= 0) {
        localStorage.setItem("score", secondsLeft)
        clearInterval(timerInterval)
        // Calls function to go to highscores
        scoreCard()

    }

  }, 1000);
}


// When wrong answer is pressed, remove 8 seconds from timer and send alert
function wrongAnswer() {
    secondsLeft = secondsLeft - 8
    alert("WRONG ANSWER")
}

// selecting answers function set through click event
function selectAnswer(event) {
    event.preventDefault();
    var element = event.target;

    // when a click is clicked in card element does it match a class .btn?
    if (element.matches(".btn")) {

        var state = element.getAttribute("data-state")
        // if the state is start then start the timer and run next question function
        if (state === "start") {
            console.log("start timer")
            setTime();
            nextQuestion();
        // if the state is true than alert that the answer is correct and run next question function
        } else if (state === "true") {
            alert("CORRECT ANSWER")
            nextQuestion();
        // if the state of btn press is not true or start run wrong answer function and next question function
        } else {
            wrongAnswer() 
            nextQuestion();
        }
    }
};

// run initial function on webpage load
init();
// event listener to start and run game
$card.addEventListener("click", selectAnswer) 