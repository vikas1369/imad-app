console.log('Loaded!');
var img=document.getElementById('img');
img.onclick=function(){
  setInterval(function(){
      img.style.marginLeft=img.style.marginLeft+'10px';  
  }
  ,100);
};