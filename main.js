//https://cors-anywhere.herokuapp.com/https://a.4cdn.org/biz/10.json
//https://cors-anywhere.herokuapp.com/https://a.4cdn.org/biz/10.json
$(document).ready(function() {
var newPosEntry = $('#posUserKeywords').text(),
    newNegEntry = $('#negUserKeywords').text();
  
var posDict = ["bull", "bullish", "moon", "miss out", "wtf was that", "gonna make it", "make it", "waiting room", "pump", "pump it", "whale", "linker", "no linker", "link marines", "rally", "comfy", "space mission"],
    
  negDict = ["pink wojack", "crash", "bobo", "red", "fud", "bear", "dump", "ahhhhhh", "ahhhhhhhh","aaaaaaaaahhhhhhhhhhhhh", "weak hands", "broke", "losses", "loss", "stinkers", "stinker", "buy the dip", "short", "reversal"]; 

  function getComments(){
$.getJSON("https://raw.githubusercontent.com/12uler/12uler.github.io/master/biz.json",
          
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
 
//document.getElementById('comments').innerHTML = negComments;
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
     }
   }
}); 

    //Positive or Negative? 

if(posData>negData){
    return $('#result').text("Positive Sentiment"),
    $('#result').css("background-color", "green");
  } else if (negData > posData){
    return $('#result').text("Negative Sentiment"),
     $('#result').css("background-color", "red");
  } else {
    return $('#result').text("No Change"),
     $('#result').css("background-color", "gray");;
  }  
 
});  //JSON sort function end 
    
$('#posDict').text(posDict);
$('#negDict').text(negDict);    
 console.log(posDict);
 console.log(negDict);
} 
 
$('#updateButton').on('click', getComments); //Click to reload button   

$('#enterPosKey').on('click', function(){
    let newWords = prompt("Input Keywords. Ex: yay, great, pump");
    if(newWords != null){
      newWords.toString();
      let tempArr = newWords.split(', ');
      for(let i=0; i<tempArr.length; i++){
      posDict.push(tempArr[i]);
      }
    }
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
    console.log(negDict);
  });
  
 getComments(); 
  
}); //doc on ready func end

