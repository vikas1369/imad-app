console.log('Loaded!');
var img=document.getElementById('img');
var marginLeft=0;
img.onclick=function(){
  setIterval(function(){
      
      img.style.marginLeft=marginLeft+'10px';  
  }
  ,100);
};