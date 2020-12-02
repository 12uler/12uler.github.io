//sticky navbar code
window.onscroll = function() {stickyNav()};
var navbar = document.getElementById("navbar"),
    sticky = navbar.offsetTop;

function stickyNav(){
  if(window.pageYOffset >= sticky){
 navbar.classList.add("sticky");
  } else { navbar.classList.remove("sticky");
  }
}

//drawing circles
function wrapper() {
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var circles = [],
    min = 5,
    max = 100,
    colors = ["#a85e32" ,"#a89632" ,"#6ba832" , "#32a894", "#3257a8","#5532a8" ,"#7d32a8" , "#a83283","#a83246","#a85e32" ,"#a89632" ,"#6ba832" , "#32a894", "#3257a8","#5532a8" ,"#7d32a8" , "#a83283","#a83246","#a85e32" ,"#a89632" ,"#6ba832" , "#32a894", "#3257a8","#5532a8" ,"#7d32a8" , "#a83283","#a83246","#a85e32" ,"#a89632" ,"#6ba832" , "#32a894", "#3257a8","#5532a8" ,"#7d32a8" , "#a83283","#a83246","#a85e32" ,"#a89632" ,"#6ba832" , "#32a894", "#3257a8","#5532a8" ,"#7d32a8" , "#a83283","#a83246"];
  
draw();

function draw() {
  var c = createCircle();
  var count = 0;
  while(!isValid(c)){
    c.x = Math.random() * canvas.width;
    c.y = Math.random() * canvas.height;
    count++;
    if(count > 1000){
      return;
    }
  }
  while(isValid(c)){
      c.r++;
  }
  c.r -= 2;
  circles.push(c);
  drawCircle(c);
  requestAnimationFrame(draw);
}

function isValid(c){
  if(c.r > max){
    return false;
  }
  for(let i = 0; i < circles.length; i++){
    let c2 = circles[i],
        dx = c2.x - c.x,
        dy = c2.y - c.y,
        dist = Math.sqrt(dx * dx + dy * dy);
        ctx.fillStyle = colors[i];
    if(dist<c2.r+c.r){
      return false;
    }
  }
  return true;
}

function createCircle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: min
  };
}

function drawCircle(c) {
  if(c.r > max * 0.5) return;
  ctx.beginPath();
  //ctx.fillStyle = colors[1];
  ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2)
  ctx.fill();
}
  

 
};

wrapper();
