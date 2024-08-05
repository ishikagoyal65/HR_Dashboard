function changePass()
{
    //alert(checkOldPassword());
    jsonObj = validatePassword();
    if (checkOldPassword() === true) {
        //alert(checkOldAndNewPass());
        if (checkOldAndNewPass() === false) {
            var recNo = getRecNoFromDB();
            var updateRequest = createUPDATERecordRequest(connToken, jsonObj, empDBName, userRelationName, recNo);
            jQuery.ajaxSetup({async: false});
            var resJsonObj = executeCommand(updateRequest, jpdbiml);
            jQuery.ajaxSetup({async: true});
            alert("Password updated successfully");
            resetForm();
            deleteSession();
            //window.location.href="login.html";

        }
    }
}
function checkOldAndNewPass() {
    var oldpwd = $("#oldpass").val();
    //alert(oldpwd);
    var newpwd = $("#pass").val();
    //alert(newpwd);
    if (oldpwd === newpwd)
    {
        //alert("inside if");
        alert("Changed Password cannot be same");
        $("#pass").val('');
        $("#repass").val('');
        $("#pass").focus();
        return true;
    } else {
        return false;
    }
}
function checkOldPassword()
{
    var email = getDataFromLS();

    var oldpwd = $("#oldpass").val();

    var jsonObj = {
        eadd: email
    };

    var getRequest = createGET_BY_KEYRequest(connToken, empDBName, userRelationName, JSON.stringify(jsonObj));

    jQuery.ajaxSetup({async: false});
    var jsonResObj = executeCommand(getRequest, jpdbirl);

    jQuery.ajaxSetup({async: true});
    if (jsonResObj.status === 200) {

        var data = JSON.parse(jsonResObj.data).record;

        if ((data.pass) === oldpwd) {
            return true;
        } else {
            alert("Incorrect Old Password");
            $("#oldpass").focus();
        }
    } else if (jsonResObj.status === 400) {
        alert("Invalid data ");
    }
}
function resetForm()
{
    $("#oldpass").val('');
    $("#pass").val('');
    $("#repass").val('');
}
function validatePassword()
{
    var pass, repass;

    pass = $("#pass").val();
    repass = $("#repass").val();



    if (pass === "")
    {
        alert("Password missing");
        $("#pass").focus();
        return "";
    }
    if (repass === "")
    {
        alert("Re-type password missing");
        $("#repass").focus();
        return "";
    }
    var jsonStrObj = {
        pass: pass,
        repass: repass
    };
    return (JSON.stringify(jsonStrObj));
}
function getRecNoFromDB()
{
    var email = getDataFromLS();
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

function getDataFromLS()
{
    return localStorage.getItem("userID");
}