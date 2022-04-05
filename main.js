let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595"
const path = require("path");
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const allMatchObj = require("./allMatch");

request(url,cb);

function cb (err , res , body){

    if (err){
        console.error.log("error",err);
    }else{
        handleHTML(body);
    }
}


let iplPath = path.join(__dirname,"IPL");
if(!fs.existsSync(iplPath)){
    fs.mkdirSync(iplPath);
}


function handleHTML(html){

    let selecTool = cheerio.load(html);

    let anchorElem = selecTool('a[data-hover="View All Results"]'); //to select the anchor element

    let relativeLink = anchorElem.attr("href");

    console.log("hii");

    let fullLink = "https://www.espncricinfo.com" + relativeLink;
    // console.log(fullLink);
    console.log(relativeLink);
    console.log(fullLink)
    allMatchObj.getAllMatch(fullLink);
    console.log(fullLink);
}