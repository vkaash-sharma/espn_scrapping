const request = require("request");
const cheerio = require("cheerio");
const {gifs} = require("./scoreCard");

function getAllMatch(url){
    request(url,cb);
}

function cb(err , res , body){
  
    if(err){
        console.error.log("error" , err);
    }else{
        extractAllMatchLink(body);
    }
}


function extractAllMatchLink(html){

    let selecTool  = cheerio.load(html);
    let scoreCardElemArr = selecTool('a[data-hover="Scorecard"]');

    for(let i = 0 ; i < scoreCardElemArr.length ; i++){

        let scoreCardLink = selecTool(scoreCardElemArr[i]).attr("href");
        let fullLink = "https://www.espncricinfo.com" + scoreCardLink;
        gifs(fullLink)
    }
  
}

module.exports = {
    getAllMatch: getAllMatch,
}