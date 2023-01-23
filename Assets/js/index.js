// Variable declarations
let questions = [{
    question: "1. How do you write 'Hello World' in an alert box?",
    choices: ["msg('Hello World')", "msgBox('Hello World');", "alertBox('Hello World');", "alert('Hello World');"],
    correctAnswer: 3
}, {
    question: "2. How do you empty an array in JavaScript?",
    choices: ["arrayList[]", "arrayList(0)", "arrayList.length=0", "arrayList.len(0)"],
    correctAnswer: 2
}, {
    question: "3. What functions are used to add an element at the beginning or end of an array?",
    choices: ["push,unshift", "unshift,push", "first,push", "unshift,last"],
    correctAnswer: 1
}, {
    question: "4. What will this output? var a = [1, 2, 3]; console.log(a[6]);",
    choices: ["undefined", "0", "prints nothing", "Syntax error"],
    correctAnswer: 0
}, {
    question: "5. What would the following code return? console.log(typeof typeof 1);",
    choices: ["string", "number", "Syntax error", "undefined"],
    correctAnswer: 0
},{
	question: "6. Which software company developed JavaScript?",
    choices: ["Mozilla", "Netscape", "Sun Microsystems", "Oracle"],
    correctAnswer: 1
},{
	question: "7. What would be the result of 3+2+'7'?",
    choices: ["327", "12", "14", "57"],
    correctAnswer: 3
},{
	question: "8. Look at the following selector: $('div'). What does it select?",
    choices: ["The first div element", "The last div element", "All div elements", "Current div element"],
    correctAnswer: 2
},{
	question: "9. How can a value be appended to an array?",
    choices: ["arr(length).value;", "arr[arr.length]=value;", "arr[]=add(value);", "None of these"],
    correctAnswer: 1
},{
	question: "10. What will the code below output to the console? console.log(1 +  +'2' + '2');",
    choices: ["'32'", "'122'", "'13'", "'14'"],
    correctAnswer: 0
}];
let correctAnswers = 0;
let currentQuestion = 0;
let timeRemaining = 300;
let userScores = {};

// DOM Variable declarations
let cardTop = document.querySelector('#top-card');
let cardMiddle = document.querySelector('#middle-card');
let cardBottom = document.querySelector('#bottom-card');
let btnStart = document.querySelector('#btnStart');
let timeElement = document.querySelector('#time-container');
let viewScores = document.querySelector('#view-score');
let mainElement = document.querySelector('main');


// Declare the game functions
function gameStart() {
    countdown();
    displayQuestion();
}

// Define timer function
function countdown() {
    
    // Start the timer
    let timeInterval = setInterval( function() {
        timeRemaining--;
        timeElement.textContent = timeRemaining;
        
        // If the game is over, stop the timer and run the game over function
        if (timeRemaining == 0 || currentQuestion == questions.length) {                    
            clearInterval(timeInterval);
            gameOver();
        }
    }, 1000) 
}

// Define displayQuestion function
function displayQuestion() {
    // Empty the card
    cardTop.innerHTML = "";
    cardMiddle.innerHTML = "";

    // Add the question to the card top
    let cardQuestion = document.createElement('h1');
    cardQuestion.textContent = questions[ currentQuestion ].question;
    cardTop.appendChild(cardQuestion);

    // Add the answers to the card middle
    for (let i=0; i < questions[currentQuestion].choices.length; i++ ) {
        let cardAnswer = document.createElement('button');
        cardAnswer.textContent = questions[currentQuestion].choices[i];
        cardAnswer.setAttribute('class', 'btn-answer');
        cardAnswer.setAttribute('data-choice-index', i);
        cardMiddle.appendChild(cardAnswer);
    } 
}

// Define checkAnswer function
function checkAnswer( userAnswer ) {

    // Empty the previous notification in the card bottom
    cardBottom.innerHTML = "";

    // Compare user guess to correct answer and notify the player if they are correct
    if (userAnswer == questions[currentQuestion].correctAnswer) {
        correctAnswers++;
        let notification = document.createElement('p');
        notification.innerHTML = "Correct!!";
        notification.setAttribute('id', 'notification');
        cardBottom.appendChild(notification);
    } else {
        timeRemaining = timeRemaining - 5;

        let notification = document.createElement('p');
        notification.innerHTML = "Wrong! : (";
        notification.setAttribute('id', 'notification');
        cardBottom.appendChild(notification);
    }

    // Update the current question number and bring up a new question
    currentQuestion++;
    if (currentQuestion < 10) {
        displayQuestion()
    }
}

// Define the gameOver function 
function gameOver() {
    // Empty the card and timer
    cardTop.innerHTML = "";
    cardMiddle.innerHTML = "";   
    cardBottom.innerHTML = "";
    timeElement.innerHTML = "";

    // Update card top
    let header = document.createElement('h1')
    header.innerText = 'Submit Score';
    cardTop.appendChild(header);

    // Update card middle
    let submitLabel = document.createElement('label');
    let submitInput = document.createElement('input');
    submitLabel.innerHTML = "Enter your initials: ";
    submitLabel.setAttribute('id', 'submit-label')
    submitInput.setAttribute('id', 'submit-input')
    submitInput.setAttribute('type', 'text');
    cardMiddle.appendChild( submitLabel );
    cardMiddle.appendChild( submitInput );

    // Update card Bottom
    let buttonHome = document.createElement('button');
    let buttonSaveScore = document.createElement('button');
    buttonHome.innerHTML = "Home";
    buttonSaveScore.innerHTML = 'Save Score';
    buttonHome.setAttribute('id', 'btnHome');
    buttonSaveScore.setAttribute('id', 'btnSave');
    cardBottom.appendChild( buttonHome );
    cardBottom.appendChild( buttonSaveScore );

    // Make view highScore button clickable
    viewScores.disabled = false;
}

// Define the getScores function to retrieve the userScores object
function getScores() {
    let scoreHistory = JSON.parse( localStorage.getItem('userScores') );
    return scoreHistory;
}

// Define the init function to retrieve the userScores history on load
function init() {
    if (getScores() == null) {
        userScores = {};
    } else {
        userScores = getScores();
    }
}

// Define a function to create a table 
function createTable(tableData) {
    // clear the main element
    mainElement.innerHTML = "";

    // Get the keys as a variable. Length and index are used in creating table
    let scoresStored = Object.keys(userScores);

    // Create the table and table headers
    let table = document.createElement('table');
    let tableBody = document.createElement('tbody');
    let tableHead = document.createElement('thead');
    let rowHead = document.createElement('tr');
    let cellName = document.createElement('td');
    let cellScore = document.createElement('td');
    cellName.textContent = "Name";
    cellScore.textContent = "Score";
    tableHead.appendChild(rowHead);
    rowHead.appendChild(cellName);
    rowHead.appendChild(cellScore);    
  
    // Create a table row and populate cells for each score saved
    for (let i = 0; i < scoresStored.length; i++ ) {
        let row = document.createElement('tr');
        let cellKey = document.createElement('td');
        let cellValue = document.createElement('td');
        cellKey.appendChild(document.createTextNode( scoresStored[i] ));
        row.appendChild(cellKey);
        cellValue.appendChild(document.createTextNode(tableData[ scoresStored[i] ]));
        row.appendChild(cellValue);

        tableBody.appendChild(row);
    }

    // Append the table to the main element
    table.appendChild( tableHead );
    table.appendChild( tableBody );
    mainElement.appendChild( table );

    // Add an ID to the main element to update the border styling
    mainElement.setAttribute('id', 'main-scores');

    // Add a home button to the main element
    let homeBtn = document.createElement('button');
    homeBtn.textContent = "Home";
    homeBtn.setAttribute('id', 'btnHome')
    mainElement.appendChild(homeBtn);
  }

// Retrieve the saved scores from local memory
init();


// Event Listeners
// Add an event listener for the start button. Click works.
btnStart.addEventListener('click', function(event){
    event.stopPropagation();
    btnStart.disabled = true;
    viewScores.disabled = true;
    gameStart();
})

// Add an event listener to the card middle for buttons during quiz. 
cardMiddle.addEventListener('click', function(event) {
    // Make a variable for what HTML element was clicked
    let element = event.target;

    // Check that a button was clicked. Grab the index and use it to in checkAnswer 
    if ( element.matches('button') ) {
        let userChoice = element.getAttribute("data-choice-index");
        checkAnswer( userChoice );
    }
})

// Add an event listener to the card bottom for the submit button
cardBottom.addEventListener('click', function(event) {
    let element = event.target;
    
    // Make sure the save button was clicked
    if ( element.matches('button') && element.id =='btnSave') {
        let submitInput = document.querySelector('#submit-input');

        // Make sure the user entered a name to save their data
        if ( submitInput.value !== "" ){
            let inputUserName = submitInput.value;
            userScores[inputUserName] = correctAnswers;
            localStorage.setItem('userScores', JSON.stringify(userScores));

            let updateText = document.createElement('p');
            updateText.innerHTML = "You're score has been saved!"
            cardMiddle.appendChild(updateText);
        }
    }
})

// Add an event listener to the main element for refreshing the page.
// Note: used in the submission and view highscores sections of the page.
mainElement.addEventListener('click', function(event) {
    let element = event.target;
    
    // Ensure the home button was clicked
    if ( element.matches('button') && element.id == 'btnHome' ) {
        // Make the page refresh
        window.location.reload();
    }
})

// Add an event listener to view saved scores
viewScores.addEventListener('click', function(event) {
    userScores = getScores();
    createTable( userScores );
})