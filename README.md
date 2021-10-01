# seinfeld_trivia_game
trivia game using html/css/javascript
web dev simplified
florinpop


# psuedo code
## Make HTML semantic elements to be accessible in css and javascript
    * Quiz start menu with button start with high scores
    * This includes form, button, parent div for card, divs with class card (h2, buttons, footer right or wrong when button clicked), header (view highscores and time remaining)
    * all done page with final score and place to put initials and submit
        * go back to start menu or clear high scores
    * New HTML for all done page?

### CSS
    * styling submit buttons
    * flexing header
    * how to show if you got answer right or wrong
        * big check mark and right
        * big x and wrong

#### Javascript
* time count down using 1000ms increments for seconds
```
    function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left till colorsplosion.";

        if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
        sendMessage();
        }

    }, 1000);
```

* Saving scores to local storage (Saved as arrays of object)
    ```
        signUpButton.addEventListener("click", function(event) {
            event.preventDefault();
                // TODO: Create user object from submission
            var user = {
                firstName: firstNameInput.value.trim(),
                lastName: lastNameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value.trim(),
            };

                // TODO: Set new submission to local storage 
            localStorage.setItem("user", JSON.stringify(user));
        });
    ```

* Calling local storage 
```
    function renderMessage() {
        // json.parse turns string back into object
        var lastGrade = JSON.parse(localStorage.getItem("studentGrade"));
        if (lastGrade !== null) {
            document.querySelector(".message").textContent = lastGrade.student + 
            " received a/an " + lastGrade.grade
        }
    }
```

* Replace dom with new values to go through quiz
```
    container.addEventListener("click", function(event) {
        var element = event.target;

        // only fire if click is on class box
        if (element.matches(".box")) {
            var state = element.getAttribute("data-state");

            if(state === "hidden") {
                // show number
                element.textContent = element.dataset.number;
                //element.textContent = element.getAttribute('data-number');
                element.dataset.state = "visible";
            } else {
                // hide number
                element.textContent = "";
                element.dataset.state = "hidden";
                // same as
                // element.setAttribute("data-state", "hidden")

            }
        }
    });
```

* When wrong subtract time from time left (5-10s)
* When right or wrong put sound or change color of screen