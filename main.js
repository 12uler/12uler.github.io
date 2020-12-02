//https://cors-anywhere.herokuapp.com/https://a.4cdn.org/biz/10.json
$.getJSON("https://cors-anywhere.herokuapp.com/https://a.4cdn.org/biz/10.json", function(getData) {
 
var 
posDict = ["bull", "bullish", "moon", "miss out", "wtf was that", "gonna make it", "make it", "waiting room", "pump", "pump it", "whale", "linker", "no linker", "link marines", "rally", "comfy", "space mission"],
negDict = ["pink wojack", "crash", "bobo", "red", "fud", "bear", "dump", "ahhhhhh", "ahhhhhhhh","aaaaaaaaahhhhhhhhhhhhh", "weak hands", "broke", "losses", "loss", "stinkers", "stinker", "buy the dip", "short", "reversal"],  
rawComments = [],  
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
var posComments = comments.filter(checkPos);
var negComments = comments.filter(checkNeg);
var posData = posComments.length;
var negData = negComments.length;
console.log(posComments.length);
console.log(negComments.length);
//document.getElementById('comments').innerHTML = negComments;
 
      //Positive or Negative? 
    if(posData>negData){
     return $('#result').text("Positive Sentiment Detected"),
     $('#result').css("background-color", "green");
    } else if (negData > posData){
     return $('#result').text("Negative Sentiment Detected"),
      $('#result').css("background-color", "red");
    } else {
     return $('#result').text("No Change"),
      $('#result').css("background-color", "gray");;
    }
 
 //build the graph
var sentimentChart = new Chart(ctx, {
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

  
}); //getData end 
