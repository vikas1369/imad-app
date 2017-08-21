var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
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
            ${date}
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
app.get('/submit-name/:name',function(req,res){//URL: /submit-name?name=xxxx
    var name=req.query.name;
    names.push(name);
    console.log(names);
    res.send(JSON.stringify(names));
});
app.get('/article1',function(req,res){
    res.send('Article one is requested. I am article 1');
});
app.get('/article2',function(req,res){
    res.send('Article two is requested. I am article 2');
});
app.get('/article3',function(req,res){
    res.send('Article three is requested. I am article 3');
});
app.get('/:articleName',function(req,res){
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
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
var names=[];


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
