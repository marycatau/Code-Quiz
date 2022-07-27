//set reference to the html elements
var scoreList = document.querySelector('#ScoreList');
var clearbtn = document.querySelector("#ClearScore");

// set the array to store the score details
var StoredScore= [];

function showRecord(StoredScore){
    for(i=0; i<StoredScore.length; i++){
        var ScoreRecord = StoredScore[i];


        var tr= document.createElement("tr");
        var th =document.createElement("th");
        th.textContent = i+1;
        th.setAttribute("scope", "row");

        var td1 = document.createElement("td");
        td1.textContent=ScoreRecord.name;

        var td2 = document.createElement("td");
        td2.textContent=ScoreRecord.score;

        scoreList.appendChild(tr);
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);

    }

}

function init(){ 
    StoredScore = JSON.parse(localStorage.getItem("StoredScore"));

    console.debug(StoredScore);
    console.debug(typeof(StoredScore));
    console.debug(StoredScore.length);


    //sorting from highest to lowest score        
    for(i = 0 ; i < StoredScore.length;i++)
    {
        for(j = i+1 ; j< StoredScore.length;j++)
        {
            if(StoredScore[i].score < StoredScore[j].score)
            {   
                var tempScore;
                tempScore = StoredScore[j];
                StoredScore[j] = StoredScore[i];
                StoredScore[i] = tempScore;
            }
        }
    }

    
    showRecord(StoredScore);
}

function clearRecord(){
    scoreList.textContent = "";
    var StoredScore = "";
    localStorage.setItem("StoredScore", JSON.stringify(StoredScore));
}

clearbtn.addEventListener("click", clearRecord);
init();
