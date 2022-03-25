const request = require("request");
const cheerio = require("cheerio");

function getInfoFromScorecard(url) {
    // console.log(,url);
    request(url, cb);
  }


  function cb(err,res,body) {
    if (err) {
        console.log(err);
    }
    else {
        getMatchDetails(body);
    }
}

function getMatchDetails(html){

    let selecTool = cheerio.load(html);

    //1. get venue

    let desc = selecTool(".match-header-info.match-info-MATCH");

    let descArr = desc.text().split(",");


     //Match (N), Abu Dhabi, Oct 25 2020, Indian Premier League

    let dateOfMatch = descArr[2];  // it tell the date of the match

    console.log(dateOfMatch);
    let venueOfMatch = descArr[1]; // it tells the venue of the match
    
    console.log(venueOfMatch);
    let matchResEle = selecTool(".match-info.match-info-MATCH.match-info-MATCH-half-width>.status-text");

    console.log(matchResEle.text());
    // 4. team name
   let teamNames = selecTool(".name-detail>.name-link");

   let team1  = selecTool(teamNames[0]).text();
   let team2  = selecTool(teamNames[1]).text();

   console.log(team1);
   console.log(team2);
//    5. get batsman detail
   let allBatsmenTable =  selecTool(".table.batsman tbody");
//    console.log(allBatsmenRows.text());

let htmlString = "";

for(let i = 0 ; i < allBatsmenTable.length ; i++){
    htmlString+=selecTool(allBatsmenTable[i]).html();

    let allRows = selecTool(allBatsmenTable[i]).find("tr");

    for(let i = 0 ; i < allRows.length ; i++){
         //Check to see if any of the matched elements have the given className
         let row = selecTool(allRows[i]);
         let firstColmnOfRow = row.find("td")[0];
         if(selecTool(firstColmnOfRow).hasClass("batsman-cell")){

            let playerName = selecTool(row.find("td")[0]).text();
            let runs = selecTool(row.find("td")[2]).text();
            let balls = selecTool(row.find("td")[3]).text();
            let numberOf4 = selecTool(row.find("td")[5]).text();
            let numberOf6 = selecTool(row.find("td")[6]).text();
            let sr = selecTool(row.find("td")[7]).text();
            if(i == 0){
            console.log("PlayeName | Runs | Balls | 4s | 6s | strikeRate ");
            }
            console.log(
                    ` ${playerName}  |  ${runs}  |  ${balls} | ${numberOf4}  | ${numberOf6}  | ${sr}`
              );

         }
        }

    }

}








module.exports = {

    gifs:getInfoFromScorecard
}