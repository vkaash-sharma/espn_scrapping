const request = require("request");
const cheerio = require("cheerio");
const {gifs} = require("./scoreCard");

function getAllMatch(url){
    request(url,cb);
}

function cb(err , res , body){
  
    if(err){
        // console.log("hii");
        console.error("error" , err);
    }else{
        extractAllMatchLink(body);
    }
}


function extractAllMatchLink(html){

    let selecTool  = cheerio.load(html);
    let scoreCardElemArr = selecTool('a[data-hover="Scorecard"]');

    for(let i = 0 ; i < scoreCardElemArr.length ; i++){
        let scorecardLink = selecTool(scorecardElemArr[i]).attr("href");
        // console.log(i + 1 + ") " + scorecardLink);
        let fullLink = "https://www.espncricinfo.com" + scorecardLink;
        // getScorecardObj.gifs(fullLink);
        gifs(fullLink);
    }
  
}

module.exports = {
    getAllMatch: getAllMatch,
}