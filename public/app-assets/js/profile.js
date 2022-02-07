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
var limit;
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
    limit = exportData.limit;
})
function change_tab(type) {
    $(".mytabs").removeClass('show');
    if (type == 1) {
        $("#show1").addClass('show');
        $("#tab1").show();
        $("#tab2").hide();
    }
    else if (type == 2) {
        $("#show2").addClass('show');
        $("#tab1").hide();
        $("#tab2").show();
    }
}

$("#editPasswordForm").submit(function (e) {
    e.preventDefault();
    uid = $("#uid").val();
    var email = $("#email").val();
    if ($(this).find("#password").val() != $(this).find("#password2").val()) {
        sweetMessage("Warning", "Password does not match.", "warning", 4000);
        $(this).find("#password").addClass('is-invalid');
        $(this).find("#password2").addClass('is-invalid');
    }
    else if ($(this).find("#password").val().length < 6) {
        sweetMessage("Warning", "Password length must be at least 6 characters or more.", "warning", 4000);
        $(this).find("#password").addClass('is-invalid');
        $(this).find("#password2").addClass('is-invalid');
    }
    else {
        $(this).find("#password").removeClass('is-invalid');
        $(this).find("#password2").removeClass('is-invalid');
        $(this).find("#password").addClass('is-valid');
        $(this).find("#password2").addClass('is-valid');
        $("#updatePwdBtn").addClass('btn-progress');
        var getaUth = auth.getAuth();
        const user = getaUth.currentUser;
        auth.updatePassword(user, $(this).find("#password").val()).then(() => {
            sweetMessage("Successfull!", "Password updated successfully!", "success", 4000);
            $("#updatePwdBtn").removeClass('btn-progress');
            var usrRef = doc(db, "admin", email);
            updateDoc(usrRef,{
                status: 1,
            })
            .then(function (ref) {
                location.reload();
            })
        }).catch((error) => {
            sweetMessage("Warning!", "Please Login again to reset" + error, "error", 4000);
        });
    }
});

function shower(type) {
    if (type == 1) {
        $("#closer").show();
        $("#shower").hide();
        $("#editBasicForm").find('input').attr('disabled', false);
    }
    else {
        $("#editBasicForm").find('input').attr('disabled', true);
        $("#closer").hide();
        $("#shower").show();
    }
}

$("#editBasicForm").submit(function (e) {
    e.preventDefault();
    var email = $("#email").val();
    if ($(this).find("#first_name").val() == "") {
        sweetMessage("Warning!", "Please enter your first name", "warning", 5000);
        return false;
    }
    else if ($(this).find("#last_name").val() == "") {
        sweetMessage("Warning!", "Please enter your last name", "warning", 5000);
        return false;
    }
    else if ($(this).find("#phone").val() == "") {
        sweetMessage("Warning!", "Please enter your phone", "warning", 5000);
        return false;
    }
    $("#basicSbBtn").addClass('btn-progress');

    var usrRef = doc(db, "admin", email);
    updateDoc(usrRef,{
        name: $(this).find("#user-name").val(),
        status: 1,
    })
        .then(function (ref) {
            sweetMessage("Successfull!", "Basic details updated successfully!", "success");
            $("#basicSbBtn").removeClass('btn-progress');
            $("#editBasicForm").find('input').attr('disabled', true);
            $("#closer").hide();
            $("#shower").show();
            setTimeout(function () {
                location.reload();
            }, 1000);
        })
        .catch(function (error) {
            $("#basicSbBtn").removeClass('btn-progress');
            sweetMessage("Warning!", error, "error", 5000);
        });

});
