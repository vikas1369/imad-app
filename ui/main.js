var button=document.getElementById('counter');

button.onclick=function(){
    var request=XMLHttpRequest();
    request.onreadystatechange=function(){
      if(request.readyState==XMLHttpRequest.DONE){
          if(request.status==200){
              var counter=request.responseText
              var span=document.getElementById('count');
                span.innerHTML=counter.toString();
          }
          //take some action
      }  
      //Not done
    };
    request.open('GET','http://dovikas1369.imad.hasura-app.io/counter');
};