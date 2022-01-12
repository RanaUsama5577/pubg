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
async function SaveCompetition(){
    var header = $('#header').val();
    var maxParticipants = $('#maxParticipants').val();
    var rank = $('#rank').val();
    var teamSizeMode = $('#teamSizeMode').val();
    var maxAttempts = $('#maxAttempts').val();
    var target = $('#target').val();
    var type = $('#type').val();
    var rewardType = $('#rewardType').val();
    var reward = $('#reward').val();
    var mapName = $('#mapName').val();
    var entryFee = $('#entryFee').val();
    var endDate = $('#endDate').val();
    var startDate = $('#startDate').val();
    var shortDescription = $('#shortDescription').val();
    var partner = $('#partner').val();
    var reviewTime = parseInt($('#reviewTime').val());
    var recurring = document.getElementById('recurring').checked;

    var start_Date = new Date(startDate);
    var end_Date = new Date(endDate);
    
    if(!header.replace(/\s/g, '').length){
        sweetMessage("Warning!","Please enter header value","warning");
        return false;
    }
    if(!maxParticipants.replace(/\s/g, '').length){
        sweetMessage("Warning!","Please enter Max Participants","warning");
        return false;
    }
    if(!maxAttempts.replace(/\s/g, '').length){
        sweetMessage("Warning!","Please enter Max Attempts","warning");
        return false;
    }
    if(!target.replace(/\s/g, '').length){
        sweetMessage("Warning!","Please enter Target","warning");
        return false;
    }
    if(!reward.replace(/\s/g, '').length){
        sweetMessage("Warning!","Please enter Reward","warning");
        return false;
    }
    if(!mapName.replace(/\s/g, '').length){
        sweetMessage("Warning!","Please enter map name","warning");
        return false;
    }
    if(!entryFee.replace(/\s/g, '').length){
        sweetMessage("Warning!","Please enter Entry Fee","warning");
        return false;
    }
    if(!shortDescription.replace(/\s/g, '').length){
        sweetMessage("Warning!","Please enter Short Description","warning");
        return false;
    }
    if(!partner.replace(/\s/g, '').length){
        sweetMessage("Warning!","Please enter Partner","warning");
        return false;
    }
    if(start_Date < new Date()){
        sweetMessage("Warning!","Start date cannot be smaller than todays date","warning");
        return false;
    }
    if(end_Date < start_Date){
        sweetMessage("Warning!","End date cannot be smaller than end date","warning");
        return false;
    }
    var endDate2 = end_Date;
    var S = new Date(endDate2);
    var getHours = reviewTime/60;
    S = S.setTime(S.getTime() + (getHours*60*60*1000));
    $('add_btn').addClass("btn-progress");
    var timestamp = new Date().getTime().toString()
    await setDoc(doc(db, "competition_templates", header), {
        header:header,
        maxParticipants:parseInt(maxParticipants),
        rank:rank,
        teamSizeMode:teamSizeMode,
        maxAttempts:parseInt(maxAttempts),
        target:parseInt(target),
        type:type,
        rewardType:rewardType,
        reward:parseInt(reward),
        entryFee:parseInt(entryFee),
        reviewDate:end_Date,
        endDate: new Date(S),
        reviewTime_min:reviewTime,
        competitionid:timestamp,
        nextEventDate:start_Date,
        state:0,
        mapName:mapName,
        shortDescription:shortDescription,
        partner:partner,
        recurring:recurring,
        comp_status:"idle",
        joined:0,
        partnerid:null,
    })
    .then(function(){
        TimerSweet("Success!","Saved Successfully","success",2000);
        setTimeout(function(){
            location.reload();
        },2000);
    })
    .catch(function(error){
        console.log(error);
    })

}