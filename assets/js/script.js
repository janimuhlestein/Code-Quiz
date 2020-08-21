//Let's set up the global variables we'll need
var startButtonEl = document.querySelector("#start-btn");
var ansButtonEl = document.getElementsByClassName("ans-button");
var timeLeft = document.getElementById("counter");
var cardEl = document.querySelector("#card");
var correctAns = "";
var count = 0;
var timer;
var seconds = 60;

//Create the questions
var question1 = {
    title: "Commonly used data types do not include _____",
    answer1: "Strings",
    answer2: "Alerts",
    answer3: "Booleans",
    answer4: "Integers",
    correctAns: "Alerts",
}

var question2 = {
    title: "All of the following are good debugging tools, except ______",
    answer1: "Console.log",
    answer2: "bash",
    answer3: "debugger",
    answer4: "javascript",
    correctAns: "bash"
}

var question3 = {
    title: "What is the command to push code to GitGub?",
    answer1: "git push origin master",
    answer2: "git config",
    answer3: "git branch",
    answer4: "git clone",
    correctAns: "git push origin master"
}

var question4 = {
    title: "What function would you call to check whether a button was clicked?",
    answer1: "button.click()",
    answer2: "getClick()",
    answer3: "click.check()",
    //make this answer fit on the button
    answer4: "addEvent Listener",
    correctAns: "addEvent Listener"
}

var question5 = {
    title: "box-sizing is a property that changes the calculation of _____",
    answer1: "width",
    answer2: "height",
    answer3: "margin",
    answer4: "both width and height",
    correctAns: "both width and height"
}

//create an array of the questions so that we can iterate through it
var questionList = [question1, question2, question3, question4, question5];

var myTimer = function() {
    if(seconds > 0) {
     var counter = document.getElementById("counter");
     counter.textContent = String(seconds);
     console.log(seconds);
     seconds--;
 }
 else{
     clearInterval(timer);
     alert("time's up!");
 }
 }
 
 var resetTimer = function(){
     clearInterval(timer);
     var time = document.getElementById("counter").textContent;
     time = parseInt(time);
     seconds = time -20;
     if(time > 1){
         timer= setInterval(myTimer,1000);
         runQuiz;
     }
     else {
        quizEnd;
     }
 }

//ask a question
var askQuestion = function(questNo) {
    //clear the card
    cardEl.innerHTML = "";
    questObj = questNo;
    //display a title
    var titleEl = document.createElement("h1");
    titleEl.className = "questTitle";
    titleEl.textContent = questObj.title;
    cardEl.appendChild(titleEl);
    //create a new div to hold the buttons
    var ansDivEl = document.createElement("div");
    ansDivEl.className = "answer";
    var answers = [
        questObj.answer1, questObj.answer2, questObj.answer3, questObj.answer4
    ];
    //add the butttons to the div
        for(i=0; i<answers.length; i++){
        var ansElement = document.createElement("button");
        ansElement.className = "ans-button";
        ansElement.id = "ans-button" + count++;
        ansElement.textContent = answers[i];
        ansDivEl.appendChild(ansElement);
        cardEl.appendChild(ansDivEl);
    }
    //set the correct answer
    correctAns = questObj.correctAns;
    //add the listener, and call for a check of the answer then call checkAns
    //listener should be removed because of once: true option.
    ansDivEl.addEventListener("click", function(){
        checkAns(event.target.textContent);
    }, { once: true });
};

//check the answer and inform the user
var checkAns = function(textContent){
    //add a new div for the information
    var checkTxt = document.createElement("div");
    checkTxt.className = "checkAns";
    //if they got it right, let them know, then run to the next question
    if(textContent === correctAns){
        checkTxt.textContent = "Correct";
        cardEl.appendChild(checkTxt);
        //cut off the question list so that we don't just keep repeating questions
        questionList.splice(0,1);
        //had to have a short timeout because otherwise my computer was running so fast 
        //I never saw the text. It just displayed the next question!
        setTimeout(()=> { runQuiz(); }, 2000);
    }
    //If they got it wrong, let them know, and cut the timer by 20 seconds, Ouch!
    else {
        checkTxt.textContent = "Incorrect";
        cardEl.appendChild(checkTxt);
        questionList.splice(0,1);
        setTimeout(()=> { runQuiz(); }, 2000);
        //take 20 seconds off the timer
        resetTimer();
    }
};

//Our main function to run the quiz.
var runQuiz = function() {
    //first, get the time
    var timeLeft = document.getElementById("counter").textContent;
    timeLeft = parseInt(timeLeft);
    //If the question list array is not empty, or the timer is not up, ask questions
    if(questionList.length !=0 && timeLeft != 1) {
           var questNum = questionList[0];
          askQuestion(questNum);
    }
    else {
        //otherwise, close the quiz out
        cardEl.innerHTML = "";
        quizEnd();
    }
    }
    
//when the timer runs out, or they complete all the questions, they get a  new card
//and the choice to end or restart
var quizEnd =  function() {
    var endTitleEl = document.createElement("h1");
    endTitleEl.className = "card";
    endTitleEl.textContent = "You've completed the quiz!";
    cardEl.appendChild(endTitleEl);
};

//add a listener to start the whole thing.
startButtonEl.addEventListener("click", function(){
    runQuiz();
    timer = setInterval(myTimer,1000)
});