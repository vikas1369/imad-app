//counter code
var button=document.getElementById('counter');
button.onclick=function(){
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
      if(request.readyState === XMLHttpRequest.DONE){
          if(request.status === 200){
              var counter=request.responseText
              var span=document.getElementById('count');
                span.innerHTML=counter.toString();
          }
          //take some action
      }  
      //Not done
    };
    request.open('GET','http://dovikas1369.imad.hasura-app.io/counter',true);
    request.send(null);
};

//submit name
var nameInput=document.getElementById('name');
var name=nameInput.value;
var submit=document.getElementById('sub_button');
submit.onclick=function(){
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
      if(request.readyState === XMLHttpRequest.DONE){
          if(request.status === 200){
            var names=request.responseText;
            names=JSON.parse(names);
            var list='';
            for(var i=0;i<names.length;i++){
                list+="<li>"+names[i]+"</li>";
            }
            var ul=document.getElementById('namelist');
            ul.innerHTML=list;  
          }
          //take some action
      }  
      //Not done
    };
    request.open('GET','http://dovikas1369.imad.hasura-app.io/submit-name?name='+name,true);
    request.send(null);
    //Make a requst to the server and send the name
   
};
