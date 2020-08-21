var startButtonEl = document.querySelector("#start-btn");
var ansButtonEl = document.getElementsByClassName("ans-button");
var timeLeft = document.getElementById("counter");
var cardEl = document.querySelector("#card");
var correctAns = "";
var count = 0;

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
    answer3: "debugger;",
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
    title: "The * selector selects all HTML elements and applies a style to them.",
    answer1: "true",
    answer2: "false",
    correctAns: "true"
}

var question5 = {
    title: "box-sizing is a property that changes the calculation of _____",
    answer1: "width",
    answer2: "height",
    answer3: "margin",
    answer4: "both width and height",
    correctAns: "both width and height"
}

var questionList = [question1, question2, question3, question4, question5];

var askQuestion = function(questNo) {
    //clear the card
    cardEl.innerHTML = "";
    questObj = questNo;
    //ask the question
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
    for(i=0; i<answers.length; i++){
        var ansElement = document.createElement("button");
        ansElement.className = "ans-button";
        ansElement.id = "ans-button" + count++;
        ansElement.textContent = answers[i];
        cardEl.appendChild(ansElement);
        cardEl.appendChild(ansDivEl);
    }

    //add the answer buttons
    //add the listeners\
    var buttonClicked = ansButtonEl;
    for(i=0; i<buttonClicked.length; i++){
        ansButtonEl[i].addEventListener("click", function() {
            checkAns(this.textContent);
        });
        //after they've clicked, kill the listener
        ansButtonEl[i].removeEventListener("click", function() {
            checkAns(this.textContent);
        });
    }
    
    //after they've clicked, kill the event listeners
    
    correctAns = questObj.correctAns;


}

var checkAns = function(choice){
    debugger;
    cardEl = document.querySelector("#card");
    var newDivEl = document.createElement("div");
    newDivEl.className = "checkAns";
    newDivEl.className = "checkAns";
    if(choice === correctAns){
        newDivEl.textContent = "Correct";
        cardEl.appendChild(newDivEl);
    }
    else {
        newDivEl.textContent = "Incorrect";
        cardEl.appendChild(newDivEl);
    }
    if(questionList.length != 0){
        for(i=0; i<questionList.length; i++) {
            askQuestion(questionList[i]);
            questionList.splice(0,1);
        }
    }
    else{
        //clear the card
        cardEl.innerHTML = "";
        var endTitleEl  = document.createElement("h1");
        endTitleEl.classsName = "card";
        endTitleEl.textContent = "You've completed the quiz!";
        cardEl.appendChild(endTitle);
    }

    }


var nextQuest = function(num) {
    cardEl.InnerHTML = "";
}

var start = function() {
askQuestion(question1);

}

startButtonEl.addEventListener("click", start);