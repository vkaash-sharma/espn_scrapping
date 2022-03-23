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


}



module.exports = {

    gifs:getInfoFromScorecard
}