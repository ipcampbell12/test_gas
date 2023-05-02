const app = SpreadsheetApp;
const ss = app.getActiveSpreadsheet();
const leadSheet = ss.getSheetByName('Lead Sheet')
const sentSheet = ss.getSheetByName('Sent Sheet')
const leadSheetData = leadSheet.getRange(1,1,leadSheet.getLastRow(),4).getValues()
const sentSheetData = ss.getSheetByName('sentSheet')
const specialsData = ss.getSheetByName('Special List').getRange(2,1,6,1).getValues().flat()

function initMenu(){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Drip Scripts")
  .addItem("Move Data","moveRows")
  .addToUi();
}

function onOpen(e){
  
  initMenu();
  
}


function logs(){
  Logger.log(leadSheetData)
}


function moveRows(){
    for (let lead of leadSheetData){
      //Logger.log(lead)
      if(lead[3] > 25){
        let remaining = checkRemaining(leadSheetData, specialsData)
        if (remaining == 2){
            sendEmailToClient()
        }
        //  Logger.log(lead[3])
        sentSheet.insertRowAfter(sentSheet.getLastRow()).getRange(sentSheet.getLastRow()+1,1,1,4).setValues([lead])
        let row = ss.createTextFinder(lead[0]).matchEntireCell(true).findNext().getRow();

        //SHOULD RETURN 5
        
        leadSheet.deleteRow(row)
        // Logger.log(`Row ${row} deleted`)
        break;
      }
    }
}

function sendEmailToClient(){
  
  const email = 'ipcampbell12@gmail.com';
  const messageBody = "After this lead gets sent, there will be only 1 lead left for this client!";
  const subjectLine = "New Lead Sent";

  MailApp.sendEmail(email,subjectLine,messageBody);
  
}

function checkRemaining(valArr, checkArr){
    const remaining = valArr.filter(person => checkArr.includes(person[0])).length
    Logger.log(remaining)
    return remaining
}






// function checkRemainingTest(){
//   Logger.log(leadSheetData)
//   Logger.log(specialsData)
//    const remaining = leadSheetData.filter(person => specialsData.includes(person[0]))
//     Logger.log(remaining)
//     return remaining
// }












