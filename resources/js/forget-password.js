function hrSendEmail()
{
    if(isEmailIdExists() ===  false){
        $("#eadd").focus();
    }
    else{
    hrchangePassword();
    var email = $("#eadd").val();
    var emailSubject, emailContent, emailTo;
    var jsonStr = {
        emailTo: email,
        emailSubject: "Password-reset",
        emailContent: "Welcome to HR- Dashboard\nYour new password is :- JqSRt89\nPlease update new password after login"
    };
    //alert(JSON.stringify(jsonStr));
    var createRequest = createEmailToSendReq(connToken, JSON.stringify(jsonStr));
    //alert(createRequest);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommand(createRequest, jpdbmail);
    jQuery.ajaxSetup({async: true});
    //alert(JSON.stringify(resJsonObj));
    alert("Email Sent Succesfully");
}
}
function getRecNoFromDB()
{
    var email = $("#eadd").val();
    var jsonObj = {
        eadd: email
    };
    //alert(JSON.stringify(jsonObj));
    var getRequest = createGET_BY_KEYRequest(connToken, empDBName, userRelationName, JSON.stringify(jsonObj));
    //alert("getRecNo: getReq" + getRequest);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommand(getRequest, jpdbirl);
    //alert("getRecNo: resJsonObj" + JSON.stringify(resJsonObj));
    jQuery.ajaxSetup({async: true});
//    alert("after ajax");
    if (resJsonObj.status === 200) {
//        alert("inside if");
        var data = JSON.parse(resJsonObj.data);
        return(data.rec_no);


    } else if (resJsonObj.status === 400)
    {
        return;

    }
}
function isEmailIdExists()
{
    var email = $("#eadd").val();
    
    var jsonStr = {
        eadd: email
       };
    var details = JSON.stringify(jsonStr);
    var getRequest = createGET_BY_KEYRequest(connToken, empDBName, userRelationName, details);
    //alert(getRequest);
       jQuery.ajaxSetup({async: false});
    var jsonResObj = executeCommand(getRequest, jpdbirl);
    //alert(JSON.stringify(jsonResObj));
    jQuery.ajaxSetup({async: true});
    if (jsonResObj.status === 200) {
        return;
    }else if (jsonResObj.status === 400) {
            alert("Incorrect email ");
            //$("#eadd").focus();
            return false;
        }
    
}
function validatePassword()
{
    var pass, repass;

    pass = "JqSRt89";
    repass="JqSRt89";
    var jsonStrObj = {
        pass: pass,
        repass: repass
    };
    return (JSON.stringify(jsonStrObj));
}
function hrchangePassword()
{
    //checkOldPassword();
    //alert("First" + getRecNoFromDB());
    jsonObj = validatePassword();

    var recNo = getRecNoFromDB();
    //alert("Second" + getRecNoFromDB());

    //alert(jsonObj);
    var updateRequest = createUPDATERecordRequest(connToken, jsonObj, empDBName, userRelationName, recNo);


    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommand(updateRequest, jpdbiml);

    jQuery.ajaxSetup({async: true});
    //alert("Password updated successfully");
    //resetForm();
}
