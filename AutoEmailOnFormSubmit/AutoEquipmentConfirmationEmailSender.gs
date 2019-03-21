//THE FOLLOWING CODE WAS WRITTEN BY LONG FEI CHEN FOR NIGHT IT UP! LOGISTICS, AND SHALL NOT BE MODIFIED WITHOUT PRIOR CONSENT
function onFormSubmit(e) { 
  var emailOut = e.namedValues.PUmail;
  var nameTO = e.namedValues.Name;
  var timeStamp = e.namedValues.Timestamp;
  var reqType = e.namedValues.Request;
  var team = e.namedValues.Team;
  var teamOther = e.namedValues.specify;
  var formFile= e.namedValues.Upload;

/* The associated google sheets file should have the 
 * headings specified after the dot in e.namedValues.[header]
 * to have the script read in data, case sensative.
 */

//FOR OUTPUT TO GSCRIPT LOGGER - DEBUGGING USE  
  Logger.log(emailOut);
  Logger.log(timeStamp);
  Logger.log(reqType);
  Logger.log(nameTO);
  Logger.log(team);
  Logger.log(teamOther);
  Logger.log(formFile);
  
//EMAIL BODY (NEW REQUEST); 
if (reqType == "New Request"){
  var htmlContent = 
      '<body>'+
        'Hello '+ nameTO +',<br>'+
        'Thank you for submitting your teams equipment request for Night it Up! 2019!<br>'+
        'Please review the information below to ensure that it is correct.<br>'+
        'If you believe that there is an error in the information, please contact [enter admin contact info here] immediately.<br><br>'+
        '--<br>'+
        'Submitted on: ' + timeStamp + '<br>'+
        'Team: ' + team + ' ' + teamOther + '<br>' +
        'File Submitted: ' + formFile + '<br>' +
        '--<br>'+
        '<br>For your own reference, retain the most recent copy of this email.<br>'+
        '<br> Thank You,<br> <b>Night it Up! Logistics</b><br>'+
     '</body>'+
     '<br><br><footer>* This is an automated email sent on behalf of Night it Up! Logistics, do not reply directly to this email as it is not monitored * </footer>'
  }
  else if (reqType == "Change/Update Existing Request"){
    var htmlContent = 
      '<body>'+
        'Hello '+ nameTO +',<br>'+
        'We have received your updated equipment request.<br>'+
        'Please review the information below to ensure that it is correct.<br>'+
        'If you believe that there is an error in the information, please contact [enter admin contact info here] immediately.<br><br>'+
        '--<br>'+
        'Submitted on: ' + timeStamp + '<br>'+
        'Team: ' + team + ' ' + teamOther + '<br>' +
        'File Submitted: ' + formFile + '<br>' +
        '--<br>'+
        '<br>Please allow some time for us to process your request, a confirmation email will be sent to you once it has been succesfully processed.<br>' +
        'For your own reference, retain the most recent copy of this email.<br>'+
        '<br> Thank You,<br> <b>Night it Up! Logistics</b><br>'+
     '</body>'+
     '<br><br><footer>* This is an automated email sent on behalf of Night it Up! Logistics, do not reply directly to this email as it is not monitored * </footer>'
  }
          
//EMAIL SENDER VIA GMAIL APP - USING GSUITE NOREPLY EMAIL - AVAILABLE ON GSUITE ONLY
  GmailApp.sendEmail(emailOut, 'NIU! Equipment Request Confirmation','', {
    htmlBody: htmlContent,
    noReply: true,
    cc: '', //enter email if want to be CC'ed in email
    replyTo: '', //default email address for direct replies to auto mail
  })
  
}


//THE FOLLOWING CODE WAS WRITTEN BY LONG FEI CHEN FOR NIGHT IT UP! LOGISTICS, AND SHALL NOT BE MODIFIED WITHOUT PRIOR CONSENT

