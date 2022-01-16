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
    
    var archive = collection(db, "competitions", doc_id, "GameSessions");
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
                    
                    var imagesModal = '<a style="color: #fff;cursor:pointer;margin-left:2px;" onclick="showImageModal(\'' + doc.id + '\')" class="btn btn-primary badge-shadow"><i class="fas fa-eye"></i></a>';
                    var targetsModal = '<a style="color: #fff;cursor:pointer;margin-left:2px;" onclick="showtargetModal(\'' + doc.id + '\')" class="btn btn-primary badge-shadow"><i class="fas fa-eye"></i></a>';

                    var row = '<tr><td>'+gameClientSessionId+'</td><td><span style="display:none">'+startsort+'</span>' + gameStarted + '</td><td>' + challengeType + '</td><td><span style="display:none">'+endsort+'</span>' + gameEnded + '</td><td>' + fname + '</td><td>' + label + '</td><td>' + score + '</td><td>' + attempt + '</td><td>' + ranking + '</td><td>' + model + '</td><td>' + needToInspect + '</td><td>' + gameName + '</td><td>' + headshots + '</td><td>'+imagesModal+'</td><td>'+targetsModal+'</td><td>' + kills + '</td><td>' + action + '</td><td>'+reason+'</td></tr>';
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

function showImageModal(doc_id){
    $('#desc').html("");
    var url_string = window.location.href;
    var url = new URL(url_string);
    var doc_id2 = url.searchParams.get("Id");
    var archive = doc(db, "competitions", doc_id2, "GameSessions",doc_id);
    getDoc(archive).then(function(docSnapshot){
        if(docSnapshot.exists){
            var data = docSnapshot.data();
            var Imghashtag = data.imgUrls.hashtag;
            var Imgkills = data.imgUrls.kills;
            var ImguserLevel = data.imgUrls.userLevel;

            var images ='<a href="' + Imghashtag + '">' +
            '<img class="img-responsive thumbnail" src="' + Imghashtag + '" width="100" height="100">' +
            '</a>';
            images += '<a href="' + Imgkills + '">' +
            '<img class="img-responsive thumbnail" src="' + Imgkills + '" width="100" height="100">' +
            '</a>';
            images += '<a href="' + ImguserLevel + '">' +
            '<img class="img-responsive thumbnail" src="' + ImguserLevel + '" width="100" height="100">' +
            '</a>';

            $('#desc').html('<div class="aniimated-thumbnials">'+images+'</div>');
            $('.aniimated-thumbnials').lightGallery({
                thumbnail: true,
                selector: 'a'
            });
            $('#viewModal').modal('show');
        }
    })
    


    
}

function showtargetModal(doc_id){
    $('#desc').html("");
    var url_string = window.location.href;
    var url = new URL(url_string);
    var doc_id2 = url.searchParams.get("Id");
    var archive = doc(db, "competitions", doc_id2, "GameSessions",doc_id);
    getDoc(archive).then(function(docSnapshot){
        if(docSnapshot.exists){
            var data = docSnapshot.data();
            var ended = data.targets.ENDED;
            var KILLS = data.targets.KILLS;
            var LOBBY = data.targets.LOBBY;
            var MAP_AND_MODE = data.targets.MAP_AND_MODE;
            var USER_LEVEL = data.targets.USER_LEVEL;
            var USER_LEVEL = data.targets.USER_LEVEL;
            var HASHTAG = data.targets.HASHTAG;
            var START = data.targets.START;
            var endedList = GetImagesFromArray(ended);
            var killsList = GetImagesFromArray(KILLS);
            var LOBBYList = GetImagesFromArray(LOBBY);
            var MAP_AND_MODEList = GetImagesFromArray(MAP_AND_MODE);
            var USER_LEVELList = GetImagesFromArray(USER_LEVEL);
            var HASHTAGList = GetImagesFromArray(HASHTAG);
            var STARTList = GetImagesFromArray(START);
            $('#desc').append('<p>Ended</p><div class="aniimated-thumbnials">'+endedList+'</div>');
            $('#desc').append('<p>Kills</p><div class="aniimated-thumbnials">'+killsList+'</div>');
            $('#desc').append('<p>Lobby</p><div class="aniimated-thumbnials">'+LOBBYList+'</div>');
            $('#desc').append('<p>Map and Mode</p><div class="aniimated-thumbnials">'+MAP_AND_MODEList+'</div>');
            $('#desc').append('<p>User Level</p><div class="aniimated-thumbnials">'+USER_LEVELList+'</div>');
            $('#desc').append('<p>Hashtag</p><div class="aniimated-thumbnials">'+HASHTAGList+'</div>');
            $('#desc').append('<p>Start</p><div class="aniimated-thumbnials">'+STARTList+'</div>');
            
            $('.aniimated-thumbnials').lightGallery({
                thumbnail: true,
                selector: 'a'
            });
            $('#viewModal').modal('show');
        }
    })
}

function GetImagesFromArray(array){
    var imgList = "";
    var rem = 0;
    if (array != undefined) {
        var checkImages = array;
        var length = checkImages.length;
        for (var count = 0; count < length; count++) {
            if (count < 2) {
                imgList += '<a href="' + checkImages[count] + '">' +
                    '<img class="img-responsive thumbnail" src="' + checkImages[count] + '" width="60" height="60">' +
                    '</a>';
            }
            else if (count == 2 && length > 3) {
                rem = length - (count + 1);
                imgList += '<a href="' + checkImages[count] + '" class="container234">' +
                    '<img class="img-responsive thumbnail" src="' + checkImages[count] + '" width="60" height="60">' +
                    '<div class="overlay">' +
                    '   <div class="text">+' + rem + '</div>' +
                    '</div>' +
                    '</a>';
            }
            else if (count > 2) {
                imgList += '<a style="display:none;" href="' + checkImages[count] + '">' +
                    '<img class="img-responsive thumbnail" src="' + checkImages[count] + '" width="60" height="60">' +
                    '</a>';
            }
        }
    }
    else {
        imgList = "-";
    }
    return imgList;
}