var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParse=require('body-parser');
var session=require('express-session');
var config={
    user:'dovikas1369',
    database:'dovikas1369',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
}
var app = express();
app.use(morgan('combined'));
app.use(bodyParse.json());
app.use(session({
     secret:'someSecretValue',
     cookie:{maxAge:1000*60*60*30}
}));
var articles={
'articleOne':{
    title:'Article one | Vikas Yadav',
    heading:'Article one',
    date:'16 August 2017',
    content:`<p>This is the content my first article.This is the content my first article.This is the content my first article.
            This is the content my first article.This is the content my first article.This is the content my first article.
            </p>
            <p>This is the content my first article.This is the content my first article.This is the content my first article.
            This is the content my first article.This is the content my first article.This is the content my first article.
            </p>
            <p>This is the content my first article.This is the content my first article.This is the content my first article.
            This is the content my first article.This is the content my first article.This is the content my first article.
            </p>`
            
},
'articleTwo':{
     title:'Article two | Vikas Yadav',
    heading:'Article two',
    date:'16 August 2017',
    content:`<p>This is the content my first article.This is the content my first article.This is the content my first article.
            This is the content my first article.This is the content my first article.This is the content my first article.
            </p>
            <p>This is the content my first article.This is the content my first article.This is the content my first article.
            This is the content my first article.This is the content my first article.This is the content my first article.
            </p>
            <p>This is the content my first article.This is the content my first article.This is the content my first article.
            This is the content my first article.This is the content my first article.This is the content my first article.
            </p>`
},
'articleThree':{
     title:'Article three | Vikas Yadav',
    heading:'Article three',
    date:'16 August 2017',
    content:`<p>This is the content my first article.This is the content my first article.This is the content my first article.
            This is the content my first article.This is the content my first article.This is the content my first article.
            </p>
            <p>This is the content my first article.This is the content my first article.This is the content my first article.
            This is the content my first article.This is the content my first article.This is the content my first article.
            </p>
            <p>This is the content my first article.This is the content my first article.This is the content my first article.
            This is the content my first article.This is the content my first article.This is the content my first article.
            </p>`
}
};
function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
var htmlTemplate=`
    <html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date.toDateString()}
        </div>
        <div>
           ${content}
        </div>
        </div>
    </body>
</html>
    `;
    return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var counter=0;
app.get('/counter',function(req,res){
    counter+=1;
    res.send(counter.toString());
});
var names=[];
app.get('/submit-name',function(req,res){//URL: /submit-name?name=xxxx
    var name=req.query.name;
    names.push(name);
    //console.log(names);
    res.send(JSON.stringify(names));
});
var pool=new Pool(config);
app.get('/test-db',function(req,res){
    //make a select request to database
    pool.query("SELECT * FROM test",function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
    //return the response
});
app.get('/articles/:articleName',function(req,res){
    var articleName=req.params.articleName;
    //Previously, before adding single quote it was taking article-one as article and one as two separate columns
    //SQL Injection possible here
    //'; DELETE FROM article WHERE title='article-three
    //"SELECT * FROM article WHERE title='"+req.params.articleName+"'"
    pool.query("SELECT * FROM article WHERE title=$1",[req.params.articleName],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } else{
           if(result.rows.length===0){
               res.status(404).send("Article not found");
           }else{
               var articleData=result.rows[0];
                res.send(createTemplate(articleData));
           }
       }
    });
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','main.js'));
});
app.get('/hash/:input',function(req,res){
   var hashedString=hash(req.params.input,'this-is-some-random-string');
   res.send(hashedString);
});
app.post('/createuser',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    pool.query('INSERT INTO "user"(username,password) VALUES($1,$2)',[username,dbString],function(err,result){
        if(err){
           res.status(500).send(err.toString());
       } else{
            res.send('User created successfully '+username);
       }
    });
});
app.post('/login',function(req,res){
   var username=req.body.username;
   var password=req.body.password;
   pool.query('SELECT * FROM "user" WHERE username=$1',[username],function(err,result){
        if(err){
           res.status(500).send(err.toString());
       } else{
           if(result.rows.length===0){
               res.send(403).send('Username or password is invalid');
           }else{
               var dbString=result.rows[0].password;
               var salt=dbString.split('$')[2];
               var hashedPassword=hash(password,salt);//creating a hash based on the password submitted and the original salt
               if(hashedPassword===dbString){
                   //set the session
                   req.session.auth={userId:result.rows[0].id};
                   //set cookie with session id
                   //on the server side it maps the session id to the object
                   //{auth:{userid}}
                   res.send('Credentials correct');
               }else{
                   res.send(403).send('Username or password is invalid');
               }
           }
       }
    });
});
app.get('/check-login',function(req,res){
    if(req.session && req.session.auth && req.session.auth.userId){
        res.send("You are logged in "+req.session.auth.userId.toString());
    }    
    else{
         res.send("You are not logged in");
    }
});
app.get('/logout',function(req,res){
   delete req.session.auth;//delete session object
   res.send("You are not logged in");
});
function hash(input,salt){
    //How do we create hash
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","1000",salt,hashed.toString('hex')].join('$');
}

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
