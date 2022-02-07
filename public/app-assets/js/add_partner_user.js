var exportData;
var db;
var collection;
var doc;
var getDoc;
var getDocs;
var auth;
var query;
var where;
var orderBy;
var updateDoc;
var deleteDoc;
var setDoc;
$(async function () {
    await import('/app-assets/js/firebase.js').then(function (exports) {
        exportData = exports;
    });
    db = exportData.db;
    doc = exportData.doc;
    collection = exportData.collection;
    getDoc = exportData.getDoc;
    getDocs = exportData.getDocs;
    query = exportData.query;
    where = exportData.where;
    orderBy = exportData.orderBy;
    auth = exportData.auth;
    updateDoc = exportData.updateDoc;
    setDoc = exportData.setDoc;
    deleteDoc = exportData.deleteDoc;
})
async function AddPartnerUser(){
    var user_name = $('#user-name').val();
    var user_email = $('#user-email').val();
    var password = $('#user-password').val();
    var confirm_password = $('#user-confirm-password').val();

    if(!user_name.replace(/\s/g, '').length){
        sweetMessage("Warning!","Please enter user name","warning");
        return false;
    }
    if(!user_email.replace(/\s/g, '').length){
        sweetMessage("Warning!","Please enter user email","warning");
        return false;
    }
    if(!password.replace(/\s/g, '').length){
        sweetMessage("Warning!","Please enter password","warning");
        return false;
    }
    if(!confirm_password.replace(/\s/g, '').length){
        sweetMessage("Warning!","Please enter confirm password","warning");
        return false;
    }

    if(password != confirm_password){
        sweetMessage("Warning!","Password should be equal to confirm password","warning");
        return false;
    }
    
    $('#add_btn').addClass("btn-progress");
    var baseUrl = 'https://us-central1-cgameapp-ac1d4.cloudfunctions.net/app/CreatePartnerUser';
    var getaUth = auth.getAuth();
    var user = getaUth.currentUser;
    var frame= $('#dashboardIfframe').html();
    var res = await getResponseFromUrl("Get",baseUrl+"?username="+ user_name + '&email=' +user_email + '&password=' + password,null,true);
    if(res.code == 200){
        var user_data = {
            "name" : user_name,
            "img_url" : "/default-user-icon-4.jpg",
            "role" : 2,
            "user_email" : user_email,
            "user_id" : res.result,
            "created_by" : user.email,
            "status":0,
            "created_at":new Date(),
            "dashboard_iframe":frame,
        };
        await setDoc(doc(db, "admin", user_email),user_data)
        .then(function(){
            $('#add_btn').removeClass("btn-progress");
            TimerSweet("Success!","Created Successfully","success",2000);
            setTimeout(function(){
                location.reload();
            },2000);
        })
        .catch(function(error){
            console.log(error);
        })
    }
    else{
        sweetMessage(res.code,res.result,"error");
        $('#add_btn').removeClass("btn-progress");
    }
    
}


var getResponseFromUrl = function (requestType, requestUrl, requestData,async,header) {
    return $.ajax({
        type: requestType,
        url: requestUrl,
        data: requestData,
        data: requestData,
        async: async,
        processData: false,
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        contentType: false,
        success: function(data, textStatus, xhr) {
            console.log(xhr.status);
        },
        error: function (error) {
            return error;
        },
    });
}