// Variable declarations
var questions = [{
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
var quizOver;
var userSelectedAnswer = [];
var correctAnswers = 0;
var currentQuestion = 0;
var timeRemaining = 300;



// Variable DOM declarations
let cardTop = document.querySelector('#top-card');
let cardMiddle = document.querySelector('#middle-card');
let cardBottom = document.querySelector('#bottom-card');
let btnStart = document.querySelector('#btnStart');
let timeElement = document.querySelector('#time-container')

// Define gameStart function. Sets quizOver to false
// Starts timer and displays first question
function gameStart() {
    quizOver = false;
    countdown();
    displayQuestion();
}

// Define timer function
function countdown() {
    
    let timeInterval = setInterval( function() {
        timeRemaining--;
        timeElement.textContent = timeRemaining;
        
        // If quizOver is true, stop interval and run gameOver 
        // And run gameOver
        if (timeRemaining == 0 || currentQuestion == questions.length) {            
            quizOver = true;         
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
    // Create a h1 element, fill it with text and append it to the header 
    let cardQuestion = document.createElement('h1');
    cardQuestion.textContent = questions[ currentQuestion ].question;
    cardTop.appendChild(cardQuestion);

    // Add the answers to the card bottom
    // Loop through answer array length, create buttons for answer
    // Fill text-content for each button
    // Create data attribute to give the btn a class of btn
    // Create data attribute for each button to correspond index
    // Append the buttons to the middle container
    for (let i=0; i < questions[currentQuestion].choices.length; i++ ) {
        let cardAnswer = document.createElement('button');
        cardAnswer.textContent = questions[currentQuestion].choices[i];
        cardAnswer.setAttribute('class', 'btn-answer');
        cardAnswer.setAttribute('data-choice-index', i);
        cardMiddle.appendChild(cardAnswer);
    } 
}

// Define registerAnswer function
function checkAnswer( userAnswer ) {
    // store the selected answer
    userSelectedAnswer.push(userAnswer);

    // Empty the previous notification in the card bottom
    cardBottom.innerHTML = "";

    // Compare user guess to correct answer
    if (userAnswer == questions[currentQuestion].correctAnswer) {
        correctAnswers++;
        // Update the bottom container to say "Correct!"
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
    console.log(currentQuestion)
    if (currentQuestion < 10) {
        displayQuestion()
    }
}

// Define the gameOver function 
// display 

function gameOver() {
    // Empty the card and timer
    cardTop.innerHTML = "";
    cardMiddle.innerHTML = "";   
    cardBottom.innerHTML = "";
    timeElement.innerHTML = "";

    // Update card top
    let header = document.createElement('h1')
    let paragraph = document.createElement('p')
    header.innerText = 'Submit Score';
    // "Enter your initials and click submit to save your score!"
    cardTop.appendChild(header);
    // cardTop.appendChild(paragraph);

    // Update card middle
    let submitLabel = document.createElement('label');
    let submitInput = document.createElement('input');
    submitLabel.innerHTML = "Enter your initials: ";
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
    cardBottom.appendChild( buttonHome )
    cardBottom.appendChild( buttonSaveScore )
}


// Add an event listener for the start button. Click works.
btnStart.addEventListener('click', function(event){
    event.stopPropagation();
    btnStart.disabled = true;
    gameStart();
})

// Add an event listener to the card middle for buttons during quiz. 
cardMiddle.addEventListener('click', function(event) {
    // Make a variable for what HTML element was clicked
    let element = event.target;

    // If what was clicked was a button in the middle container
    // then enter the choosen answer into the checkAnswer function
    if ( element.matches('button') ) {
        // Grab the data-choice index and use it in the checkAnswer function
        let userChoice = element.getAttribute("data-choice-index");
        checkAnswer( userChoice );
    }
})

// Add an event listener to the card bottom for the submit initials button


// Add an event listener to the card bottom for going back home


// Add an event listener to view saved scores