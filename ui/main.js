console.log('Loaded!');
var img=document.getElementById('img');
var marginLeft=0;
img.onclick=function(){
  var interval=setInterval(function(){
      
      img.style.marginLeft=marginLeft+'10px';  
  }
  ,100);
};