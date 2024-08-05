

function disableCtrl(ctrl)
{
    $("#new").prop("disabled", ctrl);
    $("#save").prop("disabled", ctrl);
    $("#edit").prop("disabled", ctrl);
    $("#change").prop("disabled", ctrl);
    $("#reset").prop("disabled", ctrl);
}
function disableNav(ctrl)
{
    $("#first").prop("disabled", ctrl);
    $("#prev").prop("disabled", ctrl);
    $("#last").prop("disabled", ctrl);
    $("#next").prop("disabled", ctrl);
}
function disableForm(bvalue)
{
    $("#eid").prop("disabled", bvalue);
    $("#ename").prop("disabled", bvalue);
    $("#bs").prop("disabled", bvalue);
    $("#hra").prop("disabled", bvalue);
    $("#da").prop("disabled", bvalue);
    $("#dd").prop("disabled", bvalue);
}
function initEmpForm() {
    
    console.log("initForm() - done");
}
function newData()
{
    makeDataFormEmpty();
    disableForm(false);
    $("#eid").focus();
    disableNav(true);
    disableCtrl(true);
    $("#save").prop("disabled", false);
    $("#reset").prop("disabled", false);
}
function makeDataFormEmpty()
{
    $("#eid").val('');
    $("#ename").val('');
    $("#bs").val('');
    $("#hra").val('');
    $("#da").val('');
    $("#dd").val('');
}
function isNoRecordPresent()
{
    if (getFirstRec() === "0" && getLastRec() === "0")
    {
        return true;
    }
    return false;

}
function saveData()
{

    var jsonStrObj = validateData();

    if (jsonStrObj === '')
    {
        return '';
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, empDBName, empRelationName);
    jQuery.ajaxSetup({async: false});
    var jsonObj = executeCommand(putRequest, jpdbiml);
    jQuery.ajaxSetup({async: true});
    if (isNoRecordPresent())
    {
        setFirstRec(jsonObj);
    }
    setLastRec(jsonObj);
    setCurrRec(jsonObj);
    resetForm();


}
function getEmpIdAsJsonObj()

{
    var empid=$("#eid").val();
    var jsonStr={
        id:empid
    };
    return JSON.stringify(jsonStr);
    }
function getEmp()
{
    var empId=getEmpIdAsJsonObj();
    //alert(empId);
    var getRequest=createGET_BY_KEYRequest(connToken,empDBName,empRelationName,empId);
    //alert(getRequest);
    jQuery.ajaxSetup({async:false});
    var jsonObj=executeCommandAtGivenBaseUrl(getRequest,baseURL,jpdbirl);
    //alert(JSON.stringify(jsonObj));
    jQuery.ajaxSetup({async:true});
    if(jsonObj.status === 200)
    {
        //alert("inside if");
        $("#eid").prop("disabled",true);
        alert("Id already exist");
        resetForm();
    }
}
function resetForm()
{
    disableCtrl(true);
    disableNav(false);
    var getCurrRequest = createGET_BY_RECORDRequest(connToken, empDBName, empRelationName, getCurrRec());
    //alert(getCurrRequest);
    jQuery.ajaxSetup({async: false});
    var result = executeCommand(getCurrRequest, jpdbirl);
    jQuery.ajaxSetup({async: true});
    if (isNoRecordPresent())
    {
        //alert("1");
        makeDataFormEmpty();
        disableNav(true);
    }
    $("#new").prop("disabled", false);
    if (isOnlyOneRecordPresent())
    {
        showData(result);
        disableNav(true);
        $("#edit").prop("disabled", false);
    }
    else{
    showData(result);
    }
    disableForm(true);
}
function editData()
{
    disableForm(false);
    $("#eid").prop("disabled", true);
    $("#ename").focus();
    disableNav(true);
    disableCtrl(true);
    $("#change").prop("disabled", false);
    $("#reset").prop("disabled", false);
}
function changeData()
{
    jsonObj = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonObj, empDBName, empRelationName, getCurrRec());
    jQuery.ajaxSetup({async: false});
    var jsonObj = executeCommandAtGivenBaseUrl(updateRequest, baseURL, jpdbiml);
    jQuery.ajaxSetup({async: true});
    console.log(jsonObj);
    resetForm();
    $("#eid").focus();
    $("#edit").focus();
}
function validateData()
{
    var empid, empname, empsal, hra, da, deduct;
    empid = $("#eid").val();
    empname = $("#ename").val();
    empsal = $("#bs").val();
    hra = $("#hra").val();
    da = $("#da").val();
    deduct = $("#dd").val();
    if (empid === "")
    {
        alert("Employee ID missing");
        $("#eid").focus();
        return "";
    }
    if (empname === "")
    {
        alert("Employee Name missing");
        $("#ename").focus();
        return "";
    }
    if (empsal === "")
    {
        alert("Employee Salary missing");
        $("#ba").focus();
        return "";
    }
    if (hra === "")
    {
        alert("Employee HRA missing");
        $("#hra").focus();
        return "";
    }
    if (da === "")
    {
        alert("Employee DA missing");
        $("#da").focus();
        return "";
    }
    if (deduct === "")
    {
        alert("Employee Deduction missing");
        $("#dd").focus();
        return "";
    }
    var jsonStrObj = {
        id: empid,
        name: empname,
        salary: empsal,
        hra: hra,
        da: da,
        deduct: deduct
    };
    return JSON.stringify(jsonStrObj);
}
function getCurrRec()
{
    return localStorage.getItem('rec_no');
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
function getFirstRec()
{

    return localStorage.getItem('first_rec_no');
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
function getLastRec()
{
    return localStorage.getItem('last_rec_no');
}
function setCurrRec(jsonObj)
{
    var data = JSON.parse(jsonObj.data);
    localStorage.setItem('rec_no', data.rec_no);
}
function getFirst()
{
    var getFirstRequest = createFIRST_RECORDRequest(connToken, empDBName, empRelationName);
    //alert(getFirstRequest);
    jQuery.ajaxSetup({async: false});
    var result = executeCommand(getFirstRequest, jpdbirl);
    //alert(JSON.stringify(result));
    showData(result);
    setFirstRec(result);
    jQuery.ajaxSetup({async: true});
    $('#eid').prop("disabled", true);
    $('#first').prop("disabled", true);
    $('#prev').prop("disabled", true);
    $('#next').prop("disabled", false);
    $('#save').prop("disabled", true);
}
function getLast()
{
    var getLastRequest = createLAST_RECORDRequest(connToken, empDBName, empRelationName);
    jQuery.ajaxSetup({async: false});
    var result = executeCommand(getLastRequest, jpdbirl);
    showData(result);
    setLastRec(result);
    jQuery.ajaxSetup({async: true});
    $('#eid').prop("disabled", true);
    $('#first').prop("disabled", false);
    $('#prev').prop("disabled", false);
    $('#last').prop("disabled", true);
    $('#next').prop("disabled", true);
    $('#save').prop("disabled", true);
}
function getPrev()
{
    var r = getCurrRec();
    if (r === 1)
    {
        $("#prev").prop("disabled", true);
        $("#first").prop("disabled", true);
    }
    var getPrevRequest = createPREV_RECORDRequest(connToken, empDBName, empRelationName, r);
    jQuery.ajaxSetup({async: false});
    var result = executeCommand(getPrevRequest, jpdbirl);
    jQuery.ajaxSetup({async: true});
    showData(result);
    var r = getCurrRec();

    if (r === 1)
    {
        $("#prev").prop("disabled", true);
        $("#first").prop("disabled", true);
    }
    $("#save").prop("disabled", true);
}
function getNext()
{
    var r = getCurrRec();
    var getNextRequest = createNEXT_RECORDRequest(connToken, empDBName, empRelationName, r);
    jQuery.ajaxSetup({async: false});
    var result = executeCommand(getNextRequest, jpdbirl);
    jQuery.ajaxSetup({async: true});
    showData(result);
    var r = getCurrRec();
    $("#save").prop("disabled", true);

}
function showData(jsonObj)
{
    if (jsonObj.status === 400)
    {
        return;
    }
    var data = JSON.parse(jsonObj.data).record;
    setCurrRec(jsonObj);
    $("#eid").val(data.id);
    $("#ename").val(data.name);
    $("#bs").val(data.salary);
    $("#hra").val(data.hra);
    $("#da").val(data.da);
    $("#dd").val(data.deduct);

    disableNav(false);
    disableForm(true);

    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#new").prop("disabled", false);
    $("#edit").prop("disabled", false);

    if (getCurrRec() === getLastRec())
    {

        $("#next").prop("disabled", true);
        $("#last").prop("disabled", true);
        return;
    }
    if (getCurrRec() === getFirstRec())
    {
        $("#first").prop("disabled", true);
        $("#prev").prop("disabled", true);
        return;
    }
}
function isOnlyOneRecordPresent() {
    if (isNoRecordPresent())
    {
        return false;
    }
    if (getFirstRec() === getLastRec()) {
        return true;
    }
}
function checkForNoRecord() {
    if (isNoRecordPresent()) {
        disableForm(true);
        disableNav(true);
        disableCtrl(true);
        $("#new").prop("disabled", false);
        return;
    }
    if (isOnlyOneRecordPresent()) {
        disableForm(true);
        disableNav(true);
        disableCtrl(true);
        $("#new").prop("disabled", false);
        $("#edit").prop("disabled", false);
        return;
    }
}
initEmpForm();
getFirst();
getLast();
checkForNoRecord();



