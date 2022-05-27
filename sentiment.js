
//This script loads the JSON data, parses it for comments and timestamps, searches the comments for keywords, then outputs the results to graphs. 
//The JSON currently being displayed is a test file. The cors proxy is no longer working. 
//You should import your own JSON and dictionary to suit your needs. 

$(document).ready(function() {
var newPosEntry = $('#posUserKeywords').text(),
    newNegEntry = $('#negUserKeywords').text();
  
var posDict = ["bull", "bullish", "moon", "miss out", "wtf was that", "WTFWT", "gonna make it", "make it", "waiting room", "pump", "pump it", "pumping", "chad", "FOMO", "rally", "comfy", "WAGMI", "long", "buy the dip", "accumulate", "accumulating"],
    
  negDict = ["pink wojack", "crash", "bobo", "red", "fud", "fear", "bear", "bogged", "bulltrap", "dump", "lost everything", "ascending triangle", "ahhhhhh", "ahhhhhhhh","aaaaaaaaahhhhhhhhhhhhh", "weak hands", "broke", "losses", "loss", "rejected", "buy the dip", "reversal", "short", "cash out", "take profit"]; 

//You can input your own json data here
  function getComments(){
$.getJSON("https://12uler.github.io/example.json",
          
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
  
  //Sort times of successful comment keyword match. 
var posTimeIndex = [],
    negTimeIndex = [],
    posTimeData = [],
    negTimeData = [],
    posComments = [],
    negComments = [];
  
for(let i=0; i<comments.length; i++){
  for(let x=0;x<posDict.length; x++){
    if(comments[i].includes(posDict[x])){
    posTimeIndex.push(i);
      posComments.push(comments[i]);
    } //posTimeIndex.push(comments.findIndex(dict => dict == posDict[x]));  
  }
}
  for(let x=0; x<posTimeIndex.length; x++){
    posTimeData.push(times[posTimeIndex[x]]);
  }
  
console.log(posComments[0]);
  
for(let i=0; i<comments.length; i++){
  for(let x=0;x<negDict.length; x++){
    if(comments[i].includes(negDict[x])){
    negTimeIndex.push(i); 
      negComments.push(comments[i]);
    } //posTimeIndex.push(comments.findIndex(dict => dict == posDict[x]));  
  }
}
  for(let x=0; x<negTimeIndex.length; x++){
    negTimeData.push(times[negTimeIndex[x]]);
  }  
 console.log(negComments[0]);
  
//filter comments
var
 posData = posComments.length,
 negData = negComments.length,
 timeData;
  
 if (posTimeData.length > negTimeData.length){
   timeData = posTimeData;
 } else {
   timeData = negTimeData;
 } 
timeData.sort();
console.log(timeData);
  
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
    label: 'Positive Posts',
    borderColor: 'green',
    borderWidth: 2,
    data: posTimeIndex
  },
  {
  label: 'Negative Posts',
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
          labelString: 'post'
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

//Positive or Negative? 
if(posData>negData){
    return $('#result').text("Positive"),
    $('#result').css("background-color", "#56e31e");
  } else if (negData > posData){
    return $('#result').text("Negative"),
     $('#result').css("background-color", "tomato");
  }  else {
    return $('#result').text("No Change"),
     $('#result').css("background-color", "gray");
  }
});  //JSON sort function end 
    
$('#posDict').text(posDict);
$('#negDict').text(negDict);    
 console.log(posDict);
 console.log(negDict);
} 
 
//onclick events for updating data
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

}); 
