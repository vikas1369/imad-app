console.log('Loaded!');
var img=document.getElementById('img');
var marginLeft=0;
img.onclick=function(){
  var interval=setInterval(function(){
      marginLeft+=10;
      img.style.marginLeft=marginLeft+'px';  
  }
  ,100);
};