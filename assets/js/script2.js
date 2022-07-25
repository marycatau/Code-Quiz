var HighestScore;
var scoreList = document.querySelector("#ScoreList");
var clearbtn = document.querySelector("#ClearScore");


var ThisScore = [];
var ScoreRecord=[];
var length;
var StoredScore= [];

function showRecord(StoredScore){
    for(i=0; i<StoredScore.length; i++){
        var ScoreRecord = StoredScore[i];
        var li = document.createElement("li");
        li.textContent = ScoreRecord.name +"       SCORES      "+ ScoreRecord.score;
        li.setAttribute("data-index", i);
        scoreList.appendChild(li);
       
    }

}

function init(){ 
    StoredScore = JSON.parse(localStorage.getItem("StoredScore"));
    //length = StoredScore.length
    console.debug(StoredScore);
    console.debug(typeof(StoredScore));
    console.debug(StoredScore.length);
    console.debug(scoreList);
    //console.debug(ScoreRecord);
    //nameList.textContent = ThisScore.name;
    //scoreList.textContent = ThisScore.score;
    showRecord(StoredScore);
}

function clearRecord(){
    scoreList.textContent = "";
    var StoredScore = "";
    localStorage.setItem("StoredScore", JSON.stringify(StoredScore));
}

clearbtn.addEventListener("click", clearRecord);
init();
