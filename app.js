var express             = require('express'),
    app                 = express(),
    body                = require('body-parser'),
    mongoose            = require('mongoose'),
    Article             = require('./models/article.js'),
    Rocket              = require('./models/rocket.js'),
    expressSanitizer    = require('express-sanitizer'),
    seedDB              = require("./seeds.js");

var unshow = false;
var show = true;
app.use(expressSanitizer());
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/pegasys",{ useNewUrlParser: true, useUnifiedTopology: true, });
app.use(express.static(__dirname + "/public"));
app.use(body.urlencoded({extended : true}));
app.set("view engine","ejs");
seedDB();
// Landing Page
app.get("/",function(req, res)
{
    res.render("landing",{show:unshow});
});
// Home Page
app.get("/home",function(req, res)
{
    Article.find({},function(err,article){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("home",{show:show,article:article});
        }
    })
});
// Show Page
app.get("/updates/:id",function(req, res){
    var id = req.params.id;
    Article.findOne({Title:id},function(err,article){
        if(err)
        {
            res.redirect("/home");
        }
        else
        {
            res.render("show",{show:show,article:article});
            // console.log(article);
            // res.redirect("/home");
        }
    })
});
// Rocket info page
app.get("/rocket/:id",function(req,res)
{
    var id = req.params.id;
    
    Rocket.findOne({Name:id},function(err,rocket)
    {
        if(err)
        {
            res.redirect("/home");
        }
        else
        {
            res.render("rocket",{show:show,rocket:rocket});
        }
    })
});
// Articles list page
app.get("/updates",function(req,res){
    Article.find({},function(err, articles){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("updates",{show:show,articles:articles});
        }
    })
});
// Careers Page
app.get("/careers",function(req, res){
    res.render("careers",{show:show});
});
app.post("/careers/:dept",function(req, res)
{
    var job = req.params.id;

});
app.listen(3000,function(){
    console.log("Server is running!");
});