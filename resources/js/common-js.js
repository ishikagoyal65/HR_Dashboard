
var baseURL = "http://api.login2explore.com:5577";
var connToken = "90933147|-31949216140698701|90963223";
var jpdbirl = "/api/irl";
var jpdbiml = "/api/iml";
var jpdbmail="/serverless/send_email";
var empDBName = "Emp-DB";
var empRelationName = "EmpData";
var userRelationName = "UserRel";

setBaseUrl(baseURL);

var myName, myStatus;
var empID = "id";
var useremail = "email";
var userphone = ["phone"];

function checkSession()
{
    console.log("inside:checkSession()");
    jQuery.ajax({async: false});
    var sessionStatus = isJpdbSessionTokenExists(connToken, empDBName, userRelationName);
    jQuery.ajax({aysnc: true});
    console.log("sessionStatus " + sessionStatus);
    if (sessionStatus === 400 || sessionStatus === null)
    {
        if (myStatus === "in")
        {
            window.location.href = "login.html";
        } else{
            return;
        }
    } else if (sessionStatus === 200)
    {
        if (myStatus === "out")
        {
            window.location.href = "home.html";
        } else
        {
            return;
        }
    }

    return;
}

function loadHeader() {
    $("#header").load("resources/header.html");
    currentTab();
    loadName();

}
function loadName()
{
    var email = localStorage.getItem("userID");
    $("#myUser").html(email);
    return;
}
function loadFooter()
{
    $("#footer").load("resources/footer.html");
    currentTab();
    loadName();
}
function currentTab()
{
    if (myName === "home")
    {
        $("#myhome").prop("class", "active");
    }
    if (myName === "profile")
    {
        $("#myprofile").prop("class", "active");
    }
    if (myName === "change")
    {
        $("#mychange").prop("class", "active");
    }
    if (myName === "form")
    {
        $("#myform").prop("class", "active");
    }
    return;
}
function deleteSession()
{

    var removeSession = removeSessionTokenFromJPDB(connToken, empDBName, userRelationName);

    if (removeSession === 200)
    {
        console.log("Session removed");
        localStorage.removeItem("rec_no");
        window.location.replace("login.html");
    } else
    {
        return;
    }
}
