//https://cors-anywhere.herokuapp.com/https://a.4cdn.org/biz/10.json
//This script loads the JSON data, parses it for comments and timestamps, searches the comments for keywords, then outputs the results to graphs. 

$(document).ready(function() {
var newPosEntry = $('#posUserKeywords').text(),
    newNegEntry = $('#negUserKeywords').text();
  
var posDict = ["bull", "bullish", "moon", "miss out", "wtf was that", "gonna make it", "make it", "waiting room", "pump", "pump it", "whale", "linker", "no linker", "link marines", "rally", "comfy", "space mission", "long"],
    
  negDict = ["pink wojack", "crash", "bobo", "red", "fud", "bear", "dump", "ahhhhhh", "ahhhhhhhh","aaaaaaaaahhhhhhhhhhhhh", "weak hands", "broke", "losses", "loss", "stinkers", "stinker", "buy the dip", "short", "reversal", "short"]; 

  function getComments(){
$.getJSON("https://cors-anywhere.herokuapp.com/https://a.4cdn.org/biz/10.json",
          
function(getData){
var rawComments = [],
    rawTimes = [],
ctx = document.getElementById('barGraph').getContext('2d'),
ctx2 = document.getElementById('lineGraph').getContext('2d');

for(let x = 0; x < 14; x++) {
  for (let i = 0; i < getData.threads[x].posts.length; i++)
     {
rawComments.push(getData.threads[x].posts[i].com);    rawTimes.push(getData.threads[x].posts[i].now);
     }
   }
 
//raw comments refinement to lowercase
var comments = rawComments.join('|').toLowerCase().split('|');
var times = [];
for(var i = 0; i < rawTimes.length; i++){
  let time = rawTimes[i].substring(13,21);
  let tempArray = time.split(':').join('');
  times.push(parseInt(tempArray, 10));
}
  

//filter functions
function checkPos(val){
  return posDict.every(function(v){return val.indexOf(v) == -1 });
};

function checkNeg(value){
  return negDict.every(function(z){return value.indexOf(z) == -1 });
};
  
  
  //Sort times of successful comment keyword match. 
var posTimeIndex = [],
    negTimeIndex = [],
    posTimeData = [],
    negTimeData = [];
  
for(let i=0; i<comments.length; i++){
  for(let x=0;x<posDict.length; x++){
    if(comments[i].includes(posDict[x])){
    posTimeIndex.push(i);
    } //posTimeIndex.push(comments.findIndex(dict => dict == posDict[x]));  
  }
}
  for(let x=0; x<posTimeIndex.length; x++){
    posTimeData.push(times[posTimeIndex[x]]);
  }
  
for(let i=0; i<comments.length; i++){
  for(let x=0;x<negDict.length; x++){
    if(comments[i].includes(negDict[x])){
    negTimeIndex.push(i); 
    } //posTimeIndex.push(comments.findIndex(dict => dict == posDict[x]));  
  }
}
  for(let x=0; x<negTimeIndex.length; x++){
    negTimeData.push(times[negTimeIndex[x]]);
  }
  
  
//filter comments
var posComments = comments.filter(checkPos),
 negComments = comments.filter(checkNeg),
 posData = posComments.length,
 negData = negComments.length,
 timeData;
    
//Determine X scale for line graph
if(posTimeData.length > negTimeData.length){
    timeData = posTimeData;
} else {
    timeData = negTimeData;
}
    
timeData.sort();
console.log(timeData);
    
    
 //build the graphs
 var chart = new Chart(ctx, {
  type: 'bar',
  responsive: true,
  barValueSpacing: 2,
  data: {
    labels: ['positive', 'negative'],
    datasets: [{
      barPercentage: 0.5,
      label: '4chan/biz Market Sentiment Analysis',
      backgroundColor: ['#56e31e', 'tomato'],
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
  
var lineChart = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: timeData,
    datasets: [{
    label: 'Positive Post',
    borderColor: 'green',
    borderWidth: 2,
    data: posTimeIndex
  },
  {
  label: 'Negative Post',
  borderColor: 'red',
  borderWidth: 2,
    data: negTimeIndex
  }],
  },
  options: {
    title: {
      text: 'Post Time Frequency'
    },
   scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Post Index #'
        }
      }],
      xAxes: [{
        scaleLabel:{
          display: true,
          labelString: 'Time'
        }
      }],
    },
    maintainAspectRatio: false
  }
});

  
//Positive or Negative? Report results
if(posData>negData){
    return $('#result').text("Positive"),
    $('#result').css("background-color", "#56e31e");
  } else if (negData > posData){
    return $('#result').text("Negative"),
     $('#result').css("background-color", "tomato");
  }  else {
    return $('#result').text("Neutral"),
     $('#result').css("background-color", "gray");
  }
    
});  //JSON sort function end 
    
      
//set dictionary text to html
$('#posDict').text(posDict);
$('#negDict').text(negDict);    
} 
 
  
//onclick events for updating keyword data on user input
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
  });
  
 getComments(); 

}); //doc on ready end
