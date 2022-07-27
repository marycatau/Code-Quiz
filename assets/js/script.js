// Get references to button element in step 1
var startBtn = document.querySelector("#startbtn");


//Get references to the question content in step 2
var NextBtn = document.querySelector("#NextQuest");

var questNo = document.querySelector("#QuestNo");
var QuestDetail = document.querySelector("#QuestDetail");
var ansA = document.querySelector("#ansA");
var ansB = document.querySelector("#ansB");
var ansC = document.querySelector("#ansC");
var ansD = document.querySelector("#ansD");

var userAns ;
var AnsStatus = document.querySelector("#AnsStatus");


//Get ref and variable for timer in step 2
var timeEl = document.querySelector("#TimerCount");
var secondsLeft = 60;

//set variable for quiz score and ongoing question counter in step 2 and 3
var questStatus=0;
var score=0;

//set reference in step 3 -- enter initial
var userScore=document.querySelector("#Score");
var userName= document.querySelector("#username");

var submitbtn = document.querySelector("#Submit");


// Question details refer to W3 
const questions = [];
questions[0] = {
    question: "Inside which HTML element do we put the JavaScript?",
    answerOption: ["<script>", "<scripting>", "<js>", "<javascript>",] ,
    ans:"A",
};

questions[1] = {
    question: "What is the correct JavaScript syntax to change the content of the HTML element below? <p id='demo'>This is a demonstration.</p>",
    answerOption: [" document.getElement('id').innerHTML = 'Hello World!'" , " #demo.innerHTML = 'Hello World!'" , "document.querySelector.innerHTML ='Hello World'" , "document.getElementById('demo').innerHTML = 'Hello World'",],
    ans:"D",
};

questions[2] = {
    question: "Where is the correct place to insert a JavaScript?",
    answerOption: [" The <head> section " , "The <body> section " , "The <header> section" , "Both <head> and <body> section",],
    ans:"D",
};
questions[3] = {
    question: "How do you write 'Hi' in an alert box?",
    answerOption: ["alert('Hi')" , "window('Hi')" , "windowbox('Hi')" , "alertwindow('Hi')",],
    ans:"A",
};
questions[4] = {
    question: "How does a for loop start",
    answerOption: ["for (i=0)" , "for(i=0; i <10; i++)" , "for (i=0: i<10: i++)" , "for (i=0, i<10, i++)",],
    ans:"B",
};
questions[5] = {
    question: "How do you create a function in JavaScript?</p>",
    answerOption: ["function myfuntion()" , " create myfunction()" , "int myfunction()" , "var myfunction()",],
    ans:"A",
};
questions[6] = {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    answerOption: ["script href='xxx.js'" , " script src='xxx.js'" , "script input='xxx.js'" , "script name='xxx.js'",],
    ans:"B",
};
questions[7] = {
    question: "How does the while loop start?",
    answerOption: [" While (i<=10)" , "While 'i<=10'" , "do {} While (i<=10)" , "while{i<=10}",],
    ans:"A",
};
questions[8] = {
    question: "Which syntax is used to indicate the start of an multi-line comments?",
    answerOption: [" <" , " #" , "//" , "/*",],
    ans:"D",
};


function init(){
    hideElement('step2');
    hideElement('step3');
  }


function SetTimer(){
    var timerInterval = setInterval(function() {    
        if(secondsLeft <= 0) {
          // Stops execution of action at set interval
          clearInterval(timerInterval);
          secondsLeft=0;
          timeEl.textContent = secondsLeft;
          EndofQuiz();
          return;
        }

        secondsLeft--;
        timeEl.textContent = secondsLeft;
      }, 1000);
}

function ShowQuestionPage(){
    hideElement('step1');
    hideElement('step3');
    showElement('step2');
    SetTimer();
    ShowQuestion();

}

 //show questions details   
function ShowQuestion(){   
    questNo.textContent = questStatus+1;
    QuestDetail.textContent = questions[questStatus].question;
    ansA.textContent = questions[questStatus].answerOption[0];
    ansB.textContent = questions[questStatus].answerOption[1];
    ansC.textContent = questions[questStatus].answerOption[2];
    ansD.textContent = questions[questStatus].answerOption[3];
    
}

function checkAns(){
    var ans = document.getElementsByName('Ans');
    console.debug(ans.value);

    for (let i of ans) {
        if (i.checked) {
            userAns= i.value;
        }
    }
    console.debug(userAns);
    console.debug(questions[questStatus].ans);
    console.debug(questStatus)

    if (userAns === questions[questStatus].ans){
        AnsStatus.textContent = "That's Correct";
        score += 1;
        console.debug(score);
    }
    else if (!userAns){
        alert("Not Answered Yet");
        return;
    }
    else {
        AnsStatus.textContent = "Oh! Wrong Answer."
        secondsLeft -= 5;    
    }  
   
   questStatus=questStatus+1;  
   
   if(questStatus<questions.length) {
        ShowQuestion();
    }
    else
    {
        questStatus = 0;
        secondsLeft = 0;
    }


}





function EndofQuiz(){
    hideElement('step1');
    hideElement('step2');
    showElement('step3');
    userScore.textContent = score;
}



function enterInital(){
    var storedScore = JSON.parse(localStorage.getItem("StoredScore"));
    console.debug(storedScore);
    var ThisScore = {
        name: userName.value,
        score: score,
    }
    
    if(!Array.isArray(storedScore)){
        storedScore = [];
    }

    console.debug(ThisScore);    
    storedScore.push(ThisScore);  
    
    console.debug(storedScore);
    localStorage.setItem("StoredScore", JSON.stringify(storedScore));

    
    window.location.href = "./HighestScore.html"

}


function hideElement(id){
    document.getElementById(id).style.display = "none";
}

function showElement(id){
    document.getElementById(id).style.display = 'block';
}





startBtn.addEventListener("click", ShowQuestionPage);
NextBtn.addEventListener("click", checkAns);
submitbtn.addEventListener("click", enterInital);
init();