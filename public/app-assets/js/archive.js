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
var onSnapshot;
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
    onSnapshot = exportData.onSnapshot;
    createTable();
})
async function createTable() {
    $("#table-1").DataTable().destroy();
    $("#dataTable").html('');
    var url_string = window.location.href;
    var url = new URL(url_string);
    var doc_id = url.searchParams.get("Id");
    var uniqueId = url.searchParams.get("uniqueId");
    
    $('#headingW').html(doc_id +" " + uniqueId +  " Archives");
    $('#competetions-h').html(doc_id +" " + uniqueId);
    
    var archive = collection(db, "competition_templates", doc_id, "GameSessions");
    const q = query(archive,orderBy("gameStarted"));
    try {
        onSnapshot(q, (querySnapshot)=>{
            $("#table-1").DataTable().destroy();
            $("#dataTable").html('');
            if (querySnapshot.size > 0) {
                querySnapshot.forEach(function (doc) {
                    var data = doc.data();
                    var gameClientSessionId = data.gameClientSessionId;
                    var challengeType = data.challengeType;
                    var gameStarted = data.gameStarted;
                    var gameEnded = data.gameEnded;
                    var fname = data.fname;
                    var gameName = data.gameName;
                    var attempt = data.attempt;
                    var ranking = data.ranking;
                    var score = data.score;
                    var model = data.model;
                    var needToInspect = data.needToInspect;
                    var state = data.state;
                    var headshots = data.headshots;
                    var kills = data.kills;
                    var events = data.events == undefined?"-": data.events.toString();
                    var disqualifyReasons = data.disqualifyReasons == undefined?"-": data.disqualifyReasons.toString();
                    
                    gameStarted = gameStarted == undefined?"-": gameStarted.toDate();
                    var startsort = gameStarted != "-"?gameStarted.getTime():1;
                    gameStarted = gameStarted == "-"?"-": $.format.date(gameStarted, 'dd-MMM-yyyy HH:mm:ss');
                    gameEnded = gameEnded == undefined?"-": gameEnded.toDate();
                    var endsort = gameEnded != "-"?gameEnded.getTime():1;
                    gameEnded = gameEnded == "-"?"-": $.format.date(gameEnded, 'dd-MMM-yyyy HH:mm:ss');

                    if (state == "PLAYING") {
                        var label = '<div class="custombadge-outline col-green custombadge-shadow">Playing</div>';
                    }
                    else if (state == "DISQUALIFIED") {
                        var label = '<div class="custombadge-outline col-red custombadge-shadow">Disqualified</div>';
                    }
                    else if (state == "ENDED") {
                        var label = '<div class="custombadge-outline col-orange custombadge-shadow">Ended</div>';
                    }
                    var value = '<input type="hidden" value="'+events+'" id="v-'+doc.id+'" />';
                    var dReasons = '<input type="hidden" value="'+disqualifyReasons+'" id="d-'+doc.id+'" />';
                    var eventNodeId = "v-" + doc.id;
                    var disNodeId = "d-" + doc.id;
                    var action = '<a style="color: #fff;cursor:pointer;margin-left:2px;" onclick="showViewModal(\'' + eventNodeId + '\')" class="btn btn-primary badge-shadow"><i class="fas fa-eye"></i></a>' + value;
                    var reason = disqualifyReasons != "-"?'<a style="color: #fff;cursor:pointer;margin-left:2px;" onclick="showViewModal(\'' + disNodeId + '\')" class="btn btn-primary badge-shadow"><i class="fas fa-eye"></i></a>' + dReasons:"-";
                    var row = '<tr><td>'+gameClientSessionId+'</td><td><span style="display:none">'+startsort+'</span>' + gameStarted + '</td><td>' + challengeType + '</td><td><span style="display:none">'+endsort+'</span>' + gameEnded + '</td><td>' + fname + '</td><td>' + label + '</td><td>' + score + '</td><td>' + attempt + '</td><td>' + ranking + '</td><td>' + model + '</td><td>' + needToInspect + '</td><td>' + gameName + '</td><td>' + headshots + '</td><td>' + kills + '</td><td>' + action + '</td><td>'+reason+'</td></tr>';
                    $('#dataTable').append(row);
                })
            }
            else {
                MixinSweet("No data to show", "", "info", 2000);
            }
            $('#table-1').DataTable({
                "aaSorting": [],
            });
        })
    }
    catch (ex) {
        console.log(ex);
    }
}


function showViewModal(Id){
    $('#desc').html("");
    var s =  $('#' + Id).val();
    var ul = s.split(',');
    ul.forEach(function(p){
        $('#desc').append('<p>'+p+'</p>');
    })
    $('#viewModal').modal('show');
}
