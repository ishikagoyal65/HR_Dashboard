function checkUser()
{
    var email = $("#eadd").val();
    var pwd = $("#pass").val();
    var jsonStr = {
        eadd: email
    };
    var details = JSON.stringify(jsonStr);
    var getRequest = createGET_BY_KEYRequest(connToken, empDBName, userRelationName, details);
    jQuery.ajaxSetup({async: false});
    var jsonResObj = executeCommand(getRequest, jpdbirl);
    jQuery.ajaxSetup({async: true});
    if (jsonResObj.status === 200) {
        var data = JSON.parse(jsonResObj.data).record;
        if ((data.pass) === pwd) {
            console.log("creating session");
            createSession(email);
        } else {

            alert("Incorrect Password");
            $("#pass").val('');
            $("#pass").focus();
        }
    } else if (jsonResObj.status === 400) {
        alert("Email ID does not exists !!! Register Yourself");
    }

}
function createSession(email) {
    jQuery.ajaxSetup({async: false});
    var sessionTokenStatus = createJpdbSessionToken(connToken, 1, empDBName, userRelationName, email);
    jQuery.ajaxSetup({async: true});
    if (sessionTokenStatus === 200) {
        if (localStorage.getItem("req_url") !== null) {
            window.location.href = localStorage.getItem("req_url");
            localStorage.removeItem("req_url");

        } else
            window.location.replace("home.html");
    } else
    {
        $("#eadd").val();
        $("#pass").val();
        alert("Unable to login");

    }

    return;
}