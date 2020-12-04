//https://cors-anywhere.herokuapp.com/https://a.4cdn.org/biz/10.json


//Initializing
$(document).ready(function() {
    
var newPosEntry = $('#posUserKeywords').text(),
    newNegEntry = $('#negUserKeywords').text();
  
var posDict = ["bull", "bullish", "moon", "miss out", "wtf was that", "gonna make it", "make it", "waiting room", "pump", "pump it", "whale", "linker",
               "no linker", "link marines", "rally", "comfy", "space mission", "mansion", "lambo", "ath", "all time high"], 
  negDict = ["pink wojack", "crash", "bobo", "red", "fud", "bear", "bearish", "dump", "ahhhhhh", "ahhhhhhhh","aaaaaaaaahhhhhhhhhhhhh", "weak hands", "broke", "losses",
             "loss", "stinkers", "dump it", "buy the dip", "short", "reversal", "tether up"]; 

function getComments(){
    
$.getJSON("https://cors-anywhere.herokuapp.com/https://a.4cdn.org/biz/10.json",
function(getData){
    
var rawComments = [],  
ctx = document.getElementById('graph').getContext('2d');
  
for(let x = 0; x < 14; x++) {
  for (let i = 0; i < getData.threads[x].posts.length; i++)
     {
rawComments.push(getData.threads[x].posts[i].com);
     }
   }
 
//raw comments refinement to lowercase
var comments = rawComments.join('|').toLowerCase().split('|');
  
//filter functions
function checkPos(val){
  return posDict.every(function(v){return val.indexOf(v) == -1 });
};

function checkNeg(value){
  return negDict.every(function(z){return value.indexOf(z) == -1 });
};

//filter comments
    
var posComments = comments.filter(checkPos),
 negComments = comments.filter(checkNeg),
 posData = posComments.length,
 negData = negComments.length;
console.log(posComments.length);
console.log(negComments.length);
 
//build the graph
    
 var chart = new Chart(ctx, {
  type: 'bar',
  responsive: true,
  barValueSpacing: 2,
  data: {
    labels: ['positive', 'negative'],
    datasets: [{
      barPercentage: 0.5,
      label: '4chan/biz Market Sentiment Analysis',
      backgroundColor: ['lightgreen', 'tomato'],
      borderColor: ['green','red'],
      data: [posData, negData],
    }]
  },
   options: {
     scales: {
       yAxes: [{
         ticks: {
             suggestedMin: 30,
             suggestedMax: 80
         }
       }]
     },
     maintainAspectRatio: false
   }
}); 

//Positive or Negative? Report.
    
if(posData>negData){
    return $('#result').text("Positive Sentiment"),
    $('#result').css("background-color", "#56e31e");
  } else if (negData > posData){
    return $('#result').text("Negative Sentiment"),
     $('#result').css("background-color", "tomato");
  } else {
    return $('#result').text("Neutral"),
     $('#result').css("background-color", "gray");;
  }  
 
}); //JSON sort function end 
    
//Dispaly active dictionaries on page
$('#posDict').text(posDict);
$('#negDict').text(negDict);    
 console.log(posDict);
 console.log(negDict);
} 
 
//onclick events and updating the dictionaries with user input
    
$('#updateButton').on('click', getComments); //Click to reload button   
$('#refreshButton').on('click', getComments); //Refresh button for phones
    
$('#enterPosKey').on('click', function(){
    let newWords = prompt("Input Keywords. Ex: yay, great, pump");
    if(newWords != null){
      newWords.toString();
      let tempArr = newWords.split(', ');
      for(let i=0; i<tempArr.length; i++){
      posDict.push(tempArr[i]);
      }
    }
    getComments();
    console.log(posDict);
  });
  
 $('#enterNegKey').on('click', function(){
    let newWords = prompt("Input Keywords. Ex: bad, drop, red");
    if(newWords != null){
      newWords.toString();
      let tempArr = newWords.split(', ');
      for(let i=0; i<tempArr.length; i++){
      negDict.push(tempArr[i]);
      }
    }
     getComments();
    console.log(negDict);
  });
  
 getComments(); 
  
}); //doc on ready func end

