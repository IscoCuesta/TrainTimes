  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB61_LZNVl0TkHOw7_A6oVyuHVwW5KC4Fw",
    authDomain: "train-times-fd929.firebaseapp.com",
    databaseURL: "https://train-times-fd929.firebaseio.com",
    projectId: "train-times-fd929",
    storageBucket: "train-times-fd929.appspot.com",
    messagingSenderId: "19794649235"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#AddButton").on("click", function(){
    var name = $("#nameInput").val();
    var Destination = $("#DestinationInput").val();
    var First = $("#FirstInput").val();
    var frequency = $("#frequencyInput").val();



    database.ref("/Trains").push({
        
        dbname:name,
        dbDestination:Destination,
        dbFirst:First,
        dbfrequency:frequency,

      });
      
    var name = $("#nameInput").val("");
    var Destination = $("#DestinationInput").val("");
    var First = $("#FirstInput").val("");
    var frequency = $("#frequencyInput").val("");
});

database.ref("/Trains").on("child_added", function(snapshot) {
        
    var tr=$("<tr>");
    var tdname= $("<td>"+ snapshot.val().dbname +"</td>");
    var tdDestination= $("<td>"+ snapshot.val().dbDestination +"</td>");
    var tdFrequency= $("<td>"+ snapshot.val().dbfrequency +"</td>");

    var tFrequency = snapshot.val().dbfrequency;


    var firstTime = snapshot.val().dbFirst;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var tdNext= $("<td>"+ moment(nextTrain).format("HH:mm") +"</td>");
    var tdminutes = $("<td>"+ tMinutesTillTrain +"</td>");

    
    tr.append(tdname,tdDestination, tdFrequency, tdNext, tdminutes);
    $("#DisplayTable").append(tr);

}, function(errorObject) {
console.log("The read failed: " + errorObject.code);
});