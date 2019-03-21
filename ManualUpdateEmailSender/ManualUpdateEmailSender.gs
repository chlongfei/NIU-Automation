function sendEmailUpdate() {
  //read in highlighted spreadsheet information
  var sheet = SpreadsheetApp.getActiveSheet()
  var range = sheet.getActiveRange();
  Logger.log(range);
  
  //reterive recipient information
  var name = range.getValues()[0];
  var email = range.getValues()[1];
  var team = range.getValues()[2];
  Logger.log(name);
  Logger.log(email);
  Logger.log(team);
  
  //reterive data (col A)
  var row = 6;
  var itemRange = sheet.getRange(row,1);
  var itemList =[];
  while (itemRange.isBlank() == false){
    itemRange = sheet.getRange(row,1);
    var item = itemRange.getValue();
    Logger.log(item);
    itemList.push(item);
    row++;
  }  //item = col A6 till EOF
   
  //reterieve data (col $)
  row = 6;
  var qtyCol = range.getColumn();
  itemRange = sheet.getRange(row, qtyCol);
  Logger.log(qtyCol);
  var qtyList = [];
  while (itemRange.isBlank() == false){
    itemRange = sheet.getRange(row, qtyCol);
    var item = itemRange.getValue();
    Logger.log(item);
    qtyList.push(item);
    row++;
    }//qtyList = col & till EOF
  Logger.log(itemList);
  Logger.log(qtyList);
  
  
  //grab username
  var user = Session.getActiveUser().getEmail(); //user email
  var dotPosn = user.search(".");
  var atPosn = user.search("@");
  var userName = user.slice(1,dotPosn) + user.slice(dotPosn,atPosn);
  Logger.log(userName);
  
  var text = "";
  var out;
  for (out = 0; out < row; out++){
    if ((qtyList[out] != undefined)&&(qtyList[out] != 0)&&(itemList[out] != 0)&&(itemList[out] != 0)){
    text += "( " + qtyList[out]+ " ) - - " + itemList[out] + "<br>";
    }
  }
  
  var htmlContent = 
      '<body>'+
        'Hello '+ name +',<br>'+
        '<b>Your equipment request has been updated.</b><br><br>'+
        'Please review the information below to ensure it is correct.<br><br>'+
        'If you believe that there is an error in the information, please contact Longfei (longfei.chen@power-unit.org) immediately.<br><br>'+
        '--<br>'+
        'Updated by: ' + userName + '<br>' +
        '--(Qty) Requested Items--<br>' +
        text +
        '--<br>' +
        '<br> For your own reference, retain the most recent copy of this email.<br>'+
        '<br> Thank You,<br> <b>Night it Up! Logistics</b><br>'+
     '</body>'+
     '<br><br><footer>* This is an automated email sent on behalf of Night it Up! Logistics, do not reply directly to this email as it is not monitored * </footer>'
  
    var response = SpreadsheetApp.getUi().alert('Email confirmation:\n' +
                                 '--\n' +
                                 'sent to: ' + name + '(' + email + ')\n'  +
                                 'by: ' + userName + '(' + user + ')\n'+
                                 '--\n'+
                                 'Do you wish to send email?', SpreadsheetApp.getUi().ButtonSet.YES_NO);
  
  
  if (response == SpreadsheetApp.getUi().Button.YES){
  //EMAIL SENDER VIA GMAIL APP - USING NOREPLY@POWER-UNIT.ORG  
  GmailApp.sendEmail(email, 'NIU! Equipment Request UPDATED','', {
    htmlBody: htmlContent,
    noReply: true,
    cc: ('longfei.chen@power-unit.org', user),
    replyTo: 'noreply@power-unit.org',
  })
  
  SpreadsheetApp.getUi().alert("Email Sent.");
  }
  else{
    return;
    }

}
