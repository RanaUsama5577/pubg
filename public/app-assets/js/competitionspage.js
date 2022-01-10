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
    const usersRef = collection(db, "competition_templates");
    const q = query(usersRef,orderBy("startDate"));
    //const querySnapshot = await getDocs(q);
    try {
        onSnapshot(q, (querySnapshot)=>{
            $("#table-1").DataTable().destroy();
            $("#dataTable").html('');
            if (querySnapshot.size > 0) {
                querySnapshot.forEach(function (doc) {
                    var data = doc.data();
                    var header = data.header;
                    var startDate = data.startDate;
                    var endDate = data.endDate;
                    var type = data.type;
                    var joined = data.joined == undefined?0:data.joined;
                    var maxAttempts = data.maxAttempts;
                    var rank = data.rank;
                    var reward = data.reward;
                    var mapName = data.mapName == undefined?"-":data.mapName;
                    var partner = data.partner;
                    var teamSizeMode = data.teamSizeMode;
                    var competitionid = data.competitionid == undefined?"-":data.competitionid;
                    var comp_status = data.comp_status == undefined?"Idle":data.comp_status;
                    startDate = startDate.toDate();
                    var sortingDate = startDate;
                    sortingDate = sortingDate.getTime();
                    startDate = $.format.date(startDate, 'd-MMM-yyyy HH:mm:ss');
                    endDate = endDate.toDate();
                    var sortingEnd = endDate;
                    sortingEnd = sortingEnd.getTime();
                    endDate = $.format.date(endDate, 'd-MMM-yyyy HH:mm:ss');
    
                    var label = '<div class="custombadge-outline col-info custombadge-shadow">'+comp_status+'</div>';
    
                    var action = '<a style="color: #fff;cursor:pointer;margin-left:2px;" onclick="showDeleteModal(\'' + doc.id + '\')" class="btn btn-danger badge-shadow"><i class="fas fa-trash"></i></a>';
                    var a = "<a target='_blank' href='archive.html?Id="+doc.id+"&uniqueId="+competitionid+"'>"+header+"</a>";
                    var getLeaderboard = '<a onclick ="GetLeaderBoard(\'' + doc.id + '\')" class="btn btn-primary">LeaderBoard</a>';
                    var row = '<tr><td>'+competitionid+'</td><td><span style="display:none">'+sortingDate+'</span>' + startDate + '</td><td><span style="display:none;">'+sortingEnd+'</span>' + endDate + '</td><td>' + a + '</td><td>' + label + '</td><td>'+type+'</td><td>' + joined + '</td><td>' + rank + '</td><td>' + maxAttempts + '</td><td>' + partner + '</td><td>' + reward + '</td><td>' + teamSizeMode + '</td><td>' + data.description + '</td><td>' + mapName + '</td><td>'+action+'</td></tr>';
                    $('#dataTable').append(row);
                })
            }
            else {
                MixinSweet("No data to show", "", "info", 2000);
            }
            $('#table-1').DataTable({
                "aaSorting": [],
            });
            $('.hideColumn').hide();
        })
    }
    catch (ex) {
        console.log(ex);
    }
}

function showDeleteModal(Id) {
    Swal.fire({
        title: 'Are you sure you want to delete?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        showLoaderOnConfirm:true,
        preConfirm:(login)=>{
            return new Promise(async function (resolve, reject) {
                DeleteCompetition(Id);
            })
        },
        confirmButtonText: 'Confirm!'
    }).then((result) => {
        if (result.isConfirmed) {
            
        }
    })
}

function DeleteCompetition(Id){
    deleteDoc(doc(db, "competition_templates", Id))
        .then(function(){
            MixinSweet("DeletedSuccessfully","","success",2000);
        })
        .catch(function(error){
            console.log(error);
        })
}

function GetLeaderBoard(Id){
    
}