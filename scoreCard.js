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
   let allBatsmenRows =  selecTool(".table.batsman tbody>tr");
   console.log(allBatsmenRows.text());



}




module.exports = {

    gifs:getInfoFromScorecard
}