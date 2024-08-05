
function disableForm(bvalue)
{
    $("#uname").prop("disabled", bvalue);
    $("#eadd").prop("disabled", bvalue);
    $("#phone").prop("disabled", bvalue);
    $("#pass").prop("disabled", bvalue);
    $("#repass").prop("disabled", bvalue);

}
function initForm() {
    //localStorage.clear();
    console.log("initForm() - done");
    makeDataFormEmpty();
    disableForm(false);
    $("#uname").focus();

}
function makeDataFormEmpty()
{
    $("#uname").val('');
    $("#eadd").val('');
    $("#phone").val('');
    $("#pass").val('');
    $("#repass").val('');
}
function register()
{
    if (jsonStrObj === '')
    {
        return '';
    }


    if (getpassword() === 1)
    {

        var jsonStrObj = validateData();
        var putRequest = createPUTRequest(connToken, jsonStrObj, empDBName, userRelationName);
        jQuery.ajaxSetup({async: false});
        var jsonObj = executeCommand(putRequest, jpdbiml);
        jQuery.ajaxSetup({async: true});
        setCurrRec(jsonObj);
        alert("Registration Successful");
        window.location.replace("login.html")
        
    } else
    {
        alert("Passwords do not match");
        $("#pass").focus();

    }
}
function setCurrRec(jsonObj)
{
    var data = JSON.parse(jsonObj.data);
    localStorage.setItem('rec_no', data.rec_no);
}
function validateData()
{
    var username, uemail, phone, pass, repass;
    username = $("#uname").val();
    uemail = $("#eadd").val();
    phone = $("#phone").val();
    pass = $("#pass").val();
    repass = $("#repass").val();
    
    var phonelen=phone.length;
    
    if (username === "")
    {
        alert("User name  missing");
        $("#uname").focus();
        return "";
    }
    if (uemail === "")
    {
        alert("User Email missing");
        $("#uemail").focus();
        return "";
    }
    if (phone === "" || phonelen !== 10)
    {
        alert("Invalid phone number");
        $("#phone").focus();
        return "";
    }
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
        uname: username,
        eadd: uemail,
        phone: phone,
        pass: pass,
        repass: repass
    };
    return JSON.stringify(jsonStrObj);
}
function getEmpIdAsJsonObj()

{
    var empid = $("#eadd").val();
    var jsonStr = {
        eadd: empid
    };
    return JSON.stringify(jsonStr);
}
function getEadd()
{
    var empId = getEmpIdAsJsonObj();
    //alert(empId);
    var getRequest = createGET_BY_KEYRequest(connToken, empDBName, userRelationName, empId);
    //alert(getRequest);
    jQuery.ajaxSetup({async: false});
    var jsonObj = executeCommandAtGivenBaseUrl(getRequest, baseURL, jpdbirl);
    //alert(JSON.stringify(jsonObj));
    jQuery.ajaxSetup({async: true});
    if (jsonObj.status === 200)
    {
        //  alert("inside if");
        $("#eadd").prop("disabled", true);
        alert("Email already exist");
        resetForm();
        $("#eadd").prop("disabled", false);


    }
}
function getpassword()
{
    var p = $("#pass").val();
    //alert(p);
    var re = $("#repass").val();
    //alert(re);
    if (p === re)
    {
        return 1;
    }
}
function resetForm()
{

    makeDataFormEmpty();
}
function setLastRec(jsonObj)
{
    var data = JSON.parse(jsonObj.data);
    if (data.rec_no === undefined)
    {
        localStorage.setItem("last_rec_no", "0");
    } else {
        localStorage.setItem("last_rec_no", data.rec_no);
    }
}
function setFirstRec(jsonObj)
{
    var data = JSON.parse(jsonObj.data);
    if (data.rec_no === undefined)
    {
        localStorage.setItem("first_rec_no", "0");
    } else {
        localStorage.setItem("first_rec_no", data.rec_no);
    }
}
function isNoRecordPresent()
{
    if (getFirstRec() === "0" && getLastRec() === "0")
    {
        return true;
    }
    return false;

}
//function validatePhone(event){
//    event.preventDefault();
//    var phoneNumber= document.getElementById('phone').value.trim();
//    var phonePattern=/^[6-9]\d{9}$/;
//    if(phonePattern.test(phoneNumber)){
//        alert("valid");
//    }
//    else
//    {
//        alert("invalid number");
//    }
//            
//    
//    
//}
initForm();