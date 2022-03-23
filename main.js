let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595"

const request = require("request");
const cheerio = require("cheerio");
const allMatchObj = require("./allMatch");

request(url , cb);

function cb (err , res , body){

    if (err){
        console.error.log("error",err);
    }else{
        handleHTML(body);
    }
}


function handleHTML(html){

    let selecTool = cheerio.load(html);

    let anchorElem = selecTool('a[data-hover="View All Results"]'); //to select the anchor element

    let relativeLink = anchorElem.attr("href");

    let fullLink = "https://www.espncricinfo.com" + relativeLink;
    // console.log(fullLink);
    allMatchObj.getAllMatch(fullLink);
}