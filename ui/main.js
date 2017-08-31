//counter code
/*var button=document.getElementById('counter');
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
};*/

//sumbit username password to login

//submit name

var submit=document.getElementById('sub_button');
submit.onclick=function(){
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
      if(request.readyState === XMLHttpRequest.DONE){
          if(request.status === 200){
            console.log("User is logged in");
            alert('Login successful');
          }else if(request.status===403){
                  alert("username or password is incorrect");
          }
          else if(request.status===500){
              alert("Something went wrong on the server");
          } 
         
          //take some action
      }  
      //Not done
    };
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    console.log(username+'\n'+password);
    request.open('POST','http://dovikas1369.imad.hasura-app.io/login'+name,true);
    request.setRequestHeader('Content-type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
    //Make a requst to the server and send the name
   
};
