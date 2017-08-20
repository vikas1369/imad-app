console.log('Loaded!');
var img=document.getElementById('img');
img.onclick=function(){
  setIterval(function(){
      img.style.marginLeft=img.style.marginLeft+'10px';  
  }
  ,100);
};