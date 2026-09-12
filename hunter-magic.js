// ==========================================
// H×H FAN PLAYGROUND
// JAVASCRIPT
// ==========================================


// ------------------------------------------
// HUNTER NAME
// ------------------------------------------

let hunterName = "UNKNOWN";
let finalNenType = "Unknown";
let score = 0;


function startAdventure() {

    const name = prompt(
        "Hunter, what should we call you? 🃏"
    );

    if (name && name.trim() !== "") {

        hunterName = name.trim();

        document.getElementById("cardName").textContent =
            hunterName.toUpperCase();

        alert(
            "Welcome, " +
            hunterName +
            "! ⚡\n\nYour Hunter adventure begins!"
        );

        document.getElementById("nen").scrollIntoView({
            behavior: "smooth"
        });

    } else {

        alert(
            "Every Hunter needs a name! 😭"
        );

    }
}


// ------------------------------------------
// NEN TEST QUESTIONS
// ------------------------------------------

const questions = [

    {
        question: "You find a mysterious box. What do you do?",

        answers: [
            "Open it immediately 👀",
            "Examine it carefully 🔎",
            "Ask someone else to open it 😭",
            "Walk away 🚶"
        ],

        points: [1, 2, 3, 4]
    },


    {
        question: "Your friend is in trouble. You...",

        answers: [
            "Jump in immediately ⚡",
            "Make a plan first 🧠",
            "Find someone who can help 🤝",
            "Stay calm and observe 👀"
        ],

        points: [1, 2, 3, 4]
    },


    {
        question: "Choose your Hunter Exam strategy.",

        answers: [
            "Go all out 💥",
            "Think ten steps ahead ♟️",
            "Work with the group 🤝",
            "Wait for the perfect moment 🎯"
        ],

        points: [1, 2, 3, 4]
    },


    {
        question: "Someone challenges you to a competition.",

        answers: [
            "LET'S GO! 🔥",
            "Understand the rules first 🤔",
            "Maybe we can work together? 😌",
            "Quietly figure out how to win 😈"
        ],

        points: [1, 2, 3, 4]
    },


    {
        question: "Pick your ideal Hunter companion.",

        answers: [
            "The fearless one 🦁",
            "The genius 🧠",
            "The loyal friend ❤️",
            "The mysterious one 👁️"
        ],

        points: [1, 2, 3, 4]
    }

];


let currentQuestion = 0;
let totalPoints = 0;
let selectedAnswer = null;


// ------------------------------------------
// LOAD QUESTION
// ------------------------------------------

function loadQuestion() {

    const question = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        currentQuestion + 1;

    document.getElementById("question").textContent =
        question.question;


    const answers =
        document.getElementById("answers");

    answers.innerHTML = "";


    question.answers.forEach(function(answer, index) {

        const button =
            document.createElement("button");

        button.textContent = answer;


        button.onclick = function() {

            selectAnswer(index);

        };


        answers.appendChild(button);

    });


    selectedAnswer = null;

    document.getElementById("nextButton").disabled = true;
}


// ------------------------------------------
// SELECT ANSWER
// ------------------------------------------

function selectAnswer(index) {

    selectedAnswer = index;


    const buttons =
        document.querySelectorAll("#answers button");


    buttons.forEach(function(button, i) {

        if (i === index) {

            button.classList.add("selected");

        } else {

            button.classList.remove("selected");

        }

    });


    document.getElementById("nextButton").disabled = false;
}


// ------------------------------------------
// NEXT QUESTION
// ------------------------------------------

function nextQuestion() {

    if (selectedAnswer === null) {
        return;
    }


    totalPoints +=
        questions[currentQuestion].points[selectedAnswer];


    currentQuestion++;


    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showNenResult();

    }
}


// ------------------------------------------
// NEN RESULT
// ------------------------------------------

function showNenResult() {

    let type;
    let description;
    let symbol;


    if (totalPoints <= 7) {

        type = "ENHANCER";
        symbol = "💥";

        description =
            "Bold, determined and straightforward. " +
            "You trust your instincts and don't hesitate.";

    }

    else if (totalPoints <= 11) {

        type = "TRANSMUTER";
        symbol = "⚡";

        description =
            "Creative, unpredictable and a little chaotic. " +
            "Nobody knows what you'll do next.";

    }

    else if (totalPoints <= 15) {

        type = "CONJURER";
        symbol = "✨";

        description =
            "Careful, imaginative and prepared. " +
            "You like having a clever plan.";

    }

    else {

        type = "SPECIALIST";
        symbol = "👁️";

        description =
            "Mysterious and impossible to categorize. " +
            "Your aura does its own thing.";

    }


    finalNenType = type;


    document.getElementById("nenType").textContent =
        type;

    document.getElementById("nenSymbol").textContent =
        symbol;

    document.getElementById("nenDescription").textContent =
        description;


    document.querySelector(".quiz-box")
        .classList.add("hidden");


    document.getElementById("nenResult")
        .classList.remove("hidden");
}


// ------------------------------------------
// RESTART QUIZ
// ------------------------------------------

function restartQuiz() {

    currentQuestion = 0;
    totalPoints = 0;
    selectedAnswer = null;


    document.getElementById("nenResult")
        .classList.add("hidden");


    document.querySelector(".quiz-box")
        .classList.remove("hidden");


    loadQuestion();
}


// ------------------------------------------
// NAVIGATION
// ------------------------------------------

function goToNen() {

    document.getElementById("nen")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function goToGame() {

    document.getElementById("game")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ------------------------------------------
// HUNTER REACTION GAME
// ------------------------------------------

let timeLeft = 20;
let gameTimer;
let gameRunning = false;


function startGame() {

    score = 0;
    timeLeft = 20;
    gameRunning = true;


    document.getElementById("score").textContent =
        score;

    document.getElementById("time").textContent =
        timeLeft;


    document.getElementById("gameResult")
        .classList.add("hidden");


    document.getElementById("gameMessage")
        .textContent =
        "CATCH THE AURA! ⚡";


    document.getElementById("startGameButton")
        .textContent =
        "GAME RUNNING...";


    document.getElementById("target")
        .classList.remove("hidden");


    moveTarget();


    clearInterval(gameTimer);


    gameTimer = setInterval(function() {

        timeLeft--;


        document.getElementById("time")
            .textContent =
            timeLeft;


        if (timeLeft <= 0) {

            endGame();

        }

    }, 1000);

}


// ------------------------------------------
// MOVE TARGET
// ------------------------------------------

function moveTarget() {

    if (!gameRunning) {
        return;
    }


    const area =
        document.getElementById("gameArea");

    const target =
        document.getElementById("target");


    const maxX =
        area.clientWidth - target.offsetWidth;

    const maxY =
        area.clientHeight - target.offsetHeight;


    const randomX =
        Math.random() * maxX;

    const randomY =
        Math.random() * maxY;


    target.style.left =
        randomX + "px";

    target.style.top =
        randomY + "px";
}


// ------------------------------------------
// HIT TARGET
// ------------------------------------------

function hitTarget() {

    if (!gameRunning) {
        return;
    }


    score++;


    document.getElementById("score")
        .textContent =
        score;


    moveTarget();
}


// ------------------------------------------
// END GAME
// ------------------------------------------

function endGame() {

    gameRunning = false;


    clearInterval(gameTimer);


    document.getElementById("target")
        .classList.add("hidden");


    document.getElementById("startGameButton")
        .textContent =
        "TRY AGAIN 🎯";


    let message;


    if (score < 10) {

        message =
            "Rookie Hunter energy 😭 Keep training!";

    }

    else if (score < 20) {

        message =
            "Not bad! You might survive the exam 👀";

    }

    else {

        message =
            "SERIOUS Hunter reflexes! 🔥";

    }


    document.getElementById("gameResultText")
        .textContent =
        "You scored " +
        score +
        " points. " +
        message;


    document.getElementById("gameResult")
        .classList.remove("hidden");
}


// ------------------------------------------
// LICENSE GENERATOR
// ------------------------------------------

function generateLicense() {

    const input =
        document.getElementById("hunterName");


    const name =
        input.value.trim();


    if (name === "") {

        alert(
            "Enter your Hunter name first! 👀"
        );

        return;
    }


    document.getElementById("licenseName")
        .textContent =
        name.toUpperCase();


    document.getElementById("licenseNen")
        .textContent =
        "Nen Type: " +
        finalNenType;


    document.getElementById("licenseScore")
        .textContent =
        "Exam Score: " +
        score;


    let rank;


    if (score >= 20) {

        rank = "ELITE HUNTER";

    }

    else if (score >= 10) {

        rank = "LICENSED HUNTER";

    }

    else {

        rank = "ROOKIE HUNTER";

    }


    document.getElementById("licenseRank")
        .textContent =
        rank;


    document.getElementById("finalLicense")
        .classList.remove("hidden");


    document.getElementById("finalLicense")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ------------------------------------------
// SECRET EASTER EGG
// ------------------------------------------

function secretEasterEgg() {

    alert(
        "👀 YOU FOUND THE SECRET!\n\n" +
        "Your Hunter instincts are improving..."
    );
}


// ------------------------------------------
// ABOUT
// ------------------------------------------

function showAbout() {

    alert(
        "H×H FAN PLAYGROUND\n\n" +
        "A small unofficial fan-made web toy " +
        "inspired by Hunter × Hunter.\n\n" +
        "Made with HTML, CSS & JavaScript ✦"
    );
}


// ------------------------------------------
// START QUIZ
// ------------------------------------------

loadQuestion();