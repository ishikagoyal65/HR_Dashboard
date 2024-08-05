function disableForm(ctrl)
{
    $("#uname").prop("disabled", ctrl);
    $("#eadd").prop("disabled", ctrl);
    $("#phone").prop("disabled", ctrl);
}
function hrshowData()
{

    $("#save").prop("disabled", true);
    var getCurrRequest = createGET_BY_RECORDRequest(connToken, empDBName, userRelationName, getRecNoFromDB());
//    alert(getCurrRequest);
    jQuery.ajaxSetup({async: false});
    var result = executeCommand(getCurrRequest, jpdbirl);
//    alert(JSON.stringify(result));
    jQuery.ajaxSetup({async: true});
    var data = JSON.parse(result.data).record;
    console.log(data);
    $("#uname").val(data.uname);
    $("#eadd").val(data.eadd);
    $("#phone").val(data.phone);
    disableForm(true);



}
function editData()
{
    disableForm(false);
    $("#eadd").prop("disabled", true);
    $("#uname").focus();
    $("#save").prop("disabled", false);


}
function getRecNoFromDB()
{
    var email = getDatafromLS();
    var jsonObj = {
        eadd: email
    };
    //alert(JSON.stringify(jsonObj));
    var getRequest = createGET_BY_KEYRequest(connToken, empDBName, userRelationName, JSON.stringify(jsonObj));
    //console.log("getRecNo: getReq" + getRequest);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommand(getRequest, jpdbirl);
//    console.log(resJsonObj);
//    alert("getRecNo: resJsonObj" + (resJsonObj.status));
    jQuery.ajaxSetup({async: true});
//    alert("after ajax");
    if (resJsonObj.status === 200) {
//        alert("inside if");
        var data = JSON.parse(resJsonObj.data);
        return (data.rec_no);


    } else if (resJsonObj.status === 400)
    {
        return;

    }
}

function saveDataToJpdb()
{
    //alert("inside save data");
    jsonObj = validateData();
    var recNo = getRecNoFromDB();
    //alert(recNo);
    var updateRequest = createUPDATERecordRequest(connToken, jsonObj, empDBName, userRelationName, recNo);
    //console.log("after update Request");
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommand(updateRequest, jpdbiml);
    //console.log(JSON.stringify(resJsonObj));
    jQuery.ajaxSetup({async: true});
    alert("Data Updated Successfully");
    $("#save").prop("disabled", true);


}
function validateData()
{
    var username, phone;
    username = $("#uname").val();

    phone = $("#phone").val();


    var phonelen = phone.length;

    if (username === "")
    {
        alert("User name  missing");
        $("#uname").focus();
        return "";
    }

    if (phone === "" || phonelen !== 10)
    {
        alert("Invalid phone number");
        $("#phone").focus();
        return "";
    }
    var jsonStrObj = {
        uname: username,
        phone: phone,
    };
    return JSON.stringify(jsonStrObj);
}

function getDatafromLS()
{
    return localStorage.getItem("userID");
}
