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
    GetPartners();
})
async function GetPartners() {
    const usersRef = collection(db, "partners");
    const q = query(usersRef);
    const querySnapshot = await getDocs(q);
    try {
        $("#partner").html('');
        if (querySnapshot.size > 0) {
            querySnapshot.forEach(function (doc) {
                var data = doc.data();
                var name = data.name;
                var row = `<option value="${doc.id}">${name}</option>`;
                $('#partner').append(row);
            })
        }
        else {
            MixinSweet("No data to show", "", "info", 2000);
        }
    }
    catch (ex) {
        console.log(ex);
    }
}
async function SaveCompetition(){
    var header = $('#header').val();
    var maxParticipants = $('#maxParticipants').val();
    var rank = $('#rank').val();
    var teamSizeMode = $('#teamSizeMode').val();
    var maxAttempts = $('#maxAttempts').val();
    var type = $('#type').val();
    var rewardType = $('#rewardType').val();
    var reward = $('#reward').val();
    var mapName = $('#mapName').val();
    var entryFee = $('#entryFee').val();
    var startDate = $('#startDate').val();
    var shortDescription = $('#shortDescription').val();
    var partner = $('#partner').val();
    var reviewTime = parseInt($('#reviewTime').val());
    var days = $('#days').val();
    var hours = $('#hours').val();
    var mins = $('#mins').val();
    var recurring = document.getElementById('recurring').checked;
    var start_Date = new Date(startDate);
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

    if(!days.replace(/\s/g, '').length){
        sweetMessage("Warning!","Please enter days","warning");
        return false;
    }
    if(!hours.replace(/\s/g, '').length){
        sweetMessage("Warning!","Please enter hours","warning");
        return false;
    }
    if(!mins.replace(/\s/g, '').length){
        sweetMessage("Warning!","Please enter mins","warning");
        return false;
    }

    if(start_Date < new Date()){
        sweetMessage("Warning!","Start date cannot be smaller than todays date","warning");
        return false;
    }
    $('add_btn').addClass("btn-progress");
    var durtionMins = (days *1440) + (hours * 60) + mins; 
    var timestamp = new Date().getTime().toString()
    await setDoc(doc(db, "competition_templates", header), {
        header:header,
        maxParticipants:parseInt(maxParticipants),
        rank:rank,
        teamSizeMode:teamSizeMode,
        maxAttempts:parseInt(maxAttempts),
        type:type,
        rewardType:rewardType,
        reward:parseInt(reward),
        entryFee:parseInt(entryFee),
        reviewTime_min:reviewTime,
        competitionid:timestamp,
        nextEventDate:start_Date,
        mapName:mapName,
        shortDescription:shortDescription,
        partner:partner,
        recurring:recurring,
        comp_mode:"LeaderBoard",
        partnerid:partner,
        duration_min:parseInt(durtionMins),
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