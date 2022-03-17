const functions = require("firebase-functions");
const admin = require("firebase-admin"); 
admin.initializeApp();
exports.CreatePartnerUser = functions.https.onRequest(async (req, res) => {
    var username = req.query.username;
    var email = req.query.email;
    var password = req.query.password;
    console.log("queries");
    try{
      var userRecord = await admin.auth().createUser({
        email: email,
        password: password,
        displayName: username,
      });
      res.status(200).send(userRecord.uid);
    }
    catch(ex){
      res.status(401).send(ex.message);
    }
})

