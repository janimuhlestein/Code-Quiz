var startButton = document.querySelector("#start-btn");
var ansButton = document.getElementsByClassName("ans-button");
//console.log(ansButton);
var correctAns;
var answer;
var timer;
var seconds = 60;
var count = 0;

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
    }
    else {
        alert("time's up");
    }
}

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

//We have to check all the answers
var checkAns = function (ans) {
    var card = document.querySelector("#card");
    var newDiv = document.createElement("div");
    answer = ans;
    newDiv.className = "checkAns";
    if(ans === correctAns) {
        newDiv.textContent = "Correct!"
        card.appendChild(newDiv);
    }
    else {
        newDiv.textContent = "Incorrect!"
        card.appendChild(newDiv);
        resetTimer();
    }
}
//ask the questions (shuffle questions in case they do it several times)
var question = function() {
    var questionList = [question1, question2, question3, question4, question5];

     questionList = _.shuffle(questionList);
     var questObj = questionList[0];
    //clear out the card html
    var card = document.querySelector("#card");
    card.innerHTML = "";
    var title = document.createElement("h2");
    title.className = "quest-title";
    title.textContent = questObj.title;
    card.appendChild(title);

       var newDivEl = document.createElement("div");
       newDivEl.className = "question";
       var answers = [questObj.answer1, questObj.answer2, questObj.answer3, questObj.answer4];
       //shuffle the answers, too
       answers = _.shuffle(answers);
       for(var i = 0; i < answers.length; i++){
       var ans = document.createElement("button");
       ans.className = "ans-button";
       ans.id = "ans-button" + count++;
       ans.textContent = answers[i];
       newDivEl.appendChild(ans);
       card.appendChild(newDivEl);
    }
    correctAns = questObj.correctAns;
    startButton.removeEventListener("click", startQuiz);
    //Let's remove that question from the shuffle
    questionList.splice(0,1);
    var buttonClicked = ansButton;
    //check the answer
    for(i=0; i<buttonClicked.length; i++){
        // var ansButton=document.getElementById("#ans-button[i]");
         console.log(buttonClicked[i]);
 
         ansButton[i].addEventListener("click", function() {
             checkAns(this.textContent);
         });
         //after they've clicked, kill the listener
         ansButton[i].removeEventListener("click", function() {
             checkAns(this.textContent);
         });
     }

}

var startQuiz = function() {
    //once the start button is clicked, then start the quiz
    //start countdown
    question();
    timer = setInterval(myTimer,1000);
    /*

    for(i=0; i<ansButton.length; i++){
       // var ansButton=document.getElementById("#ans-button[i]");
        console.log(ansButton[i]);

        ansButton[i].addEventListener("click", function() {
            checkAns(this.textContent);
        });
        //after they've clicked, kill the listener
        ansButton[i].removeEventListener("click", function() {
            checkAns(this.textContent);
        });
        
    }
    */
}

startButton.addEventListener("click", startQuiz);
