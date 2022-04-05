const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

function getInfoFromScorecard(url) {
    // console.log(,url);
    request(url, cb);
  }


  function cb(err,res,body) {
    if (err) {
        console.log(err);
    }
    else if (res.statusCode == 404) {
      console.log("Page not found");
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
   
    let matchResult = matchResEle.text()
    
    // 4. team name
   let teamNamesArr = selecTool(".name-detail>.name-link");

   let ownTeam  = selecTool(teamNamesArr[0]).text();
   let opponentTeam  = selecTool(teamNamesArr[1]).text();

   console.log(ownTeam);
   console.log(opponentTeam);
//    5. get batsman detail
   let allBatsmenTable =  selecTool(".table.batsman tbody");
//    console.log(allBatsmenRows.text());

// let htmlString = "";

for(let i = 0 ; i < allBatsmenTable.length ; i++){
    // htmlString+=selecTool(allBatsmenTable[i]).html();

    let allRows = selecTool(allBatsmenTable[i]).find("tr");
    if (i == 1) {
      let temp = ownTeam;
      ownTeam = opponentTeam;
      opponentTeam = temp;
    }
    console.log(ownTeam);
    console.log(opponentTeam);


    for(let i = 0 ; i < allRows.length ; i++){
         //Check to see if any of the matched elements have the given className
         let row = selecTool(allRows[i]);
         let firstColmnOfRow = row.find("td")[0];
         if(selecTool(firstColmnOfRow).hasClass("batsman-cell")){

           
          let pn = selecTool(row.find("td")[0]).text().split("");
        // console.log(pn);
        // console.log(pn.join(""));
        let playerName = "";
        //Determines whether an array includes a certain element, returning true or false as appropriate.
        if (pn.includes("(")) {
          playerName = pn.join("").split("(")[0];
          // console.log(playerName);
        } else if (pn.includes("†")) {
          playerName = pn.join("").split("†")[0];
          // console.log(playerName);
        } else playerName = pn.join("");
        //playerName = "hello"; //†


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

           
              processInformation(
 
              dateOfMatch,
              venueOfMatch,
              matchResult,
             ownTeam,
              opponentTeam,
              playerName,
              runs,
              balls,
              numberOf4,
              numberOf6,
              sr
             );





         }
        }

    }



  function processInformation(dateOfMatch,venueOfMatch,matchResult,ownTeam,opponentTeam,playerName,runs,balls,numberOf4,numberOf6,sr){

    let teamNamePath = path.join(__dirname,"IPL",ownTeam);

    if(!fs.existsSync(teamNamePath)){
        fs.mkdirSync(teamNamePath);
    }
  

  let playerPath = path.join(teamNamePath , playerName + ".xlsx");
  let content = excelReader(playerPath , playerName);

  let playerObj = {

    dateOfMatch,
    venueOfMatch,
    matchResult,
    ownTeam,
    opponentTeam,
    playerName,
    runs,
    balls,
    numberOf4,
    numberOf6,
    sr

  };
  content.push(playerObj);
  excelWriter(playerPath , content , playerName);




    }

}


function excelReader(playerPath , sheetName){
    if(!fs.existsSync(playerPath)){
        return [];
    }

  let workBook = xlsx.readFile(playerPath);

  let excelData = workBook.Sheets[sheetName];
  let playerObj = xlsx.utils.sheet_to_json(excelData);
  return playerObj;

}


function excelWriter(playerPath , jsObject , sheetName){
//Creates a new workbook
    let newWorkBook = xlsx.utils.book_new();
 //Converts an array of JS objects to a worksheet.
    let newWorkSheet = xlsx.utils.json_to_sheet(jsObject);
  //it appends a worksheet to a workbook
    xlsx.utils.book_append_sheet(newWorkBook ,newWorkSheet, sheetName);
 // Attempts to write or download workbook data to file
    xlsx.writeFile(newWorkBook ,playerPath);
}




module.exports = {

    gifs:getInfoFromScorecard
}