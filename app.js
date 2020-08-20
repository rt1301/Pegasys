var express             = require('express'),
    app                 = express(),
    body                = require('body-parser'),
    mongoose            = require('mongoose'),
    Article             = require('./models/article.js'),
    Rocket              = require('./models/rocket.js'),
    Query               = require('./models/query.js'),
    expressSanitizer    = require('express-sanitizer'),
    flash               = require('connect-flash'),
    seedDB              = require("./seeds.js"),
    adminBro            = require("admin-bro"),
    adminBroExpress     = require("admin-bro-expressjs");
    const formidableMiddleware = require('express-formidable');
adminBro.registerAdapter(require("admin-bro-mongoose"));
var unshow = false;
var show = true;
// Resources definitions
const Admin = mongoose.model('Admin', {
    id: { type: String, required: true },
    encryptedPassword: { type: String, required: true },
    role: { type: String, enum: ['admin', 'restricted'], required: true },
});
const admin = new adminBro({
    databases: [mongoose],
    resources: [{
        resource: Admin,
        options: {
          properties: {
            encryptedPassword: {
              isVisible: false,
            },
            password: {
              type: 'string',
              isVisible: {
                list: false, edit: true, filter: false, show: false,
              },
            },
          },
          actions: {
            new: {
              before: async (request) => {
                if(request.payload.record.password) {
                  request.payload.record = {
                    ...request.payload.record,
                    encryptedPassword: await bcrypt.hash(request.payload.record.password, 10),
                    password: undefined,
                  }
                }
                return request
              },
            }
          }
        }
      }],
    rootPath: '/admin',
});
const ADMIN = {
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    password: process.env.ADMIN_PASSWORD || '1234',
}
// Build and use a router which will handle all AdminBro routes
const router = adminBroExpress.buildAuthenticatedRouter(admin,{
    cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
    cookiePassword: process.env.ADMIN_COOKIE_PASSWORD || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
    authenticate: async (email,password)=>{
        if(email == ADMIN.email && password == ADMIN.password)
        {
            return ADMIN;
        }
        else
        {
            return null;
        }
    }
});
app.use(admin.options.rootPath, router);
app.use(expressSanitizer());
app.use(formidableMiddleware());
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/pegasys",{ useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false });
app.use(express.static(__dirname + "/public"));
app.use(body.urlencoded({extended : true}));
app.use(require("express-session")({
    secret: "This is a secret message",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(function(req, res, next)
{
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
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
// Mission Page
app.get("/mission",function(req, res){
    res.render("mission",{show:show});
});
// Mars Mission Page
app.get("/mission/mars",function(req, res){
    res.render("mars",{show:show});
});
// Contact Page
app.get("/contact",function(req, res){
    res.render("contact",{show:show,key:process.env.KEY});
});
app.post("/contact",function(req, res){
    var newQuery = req.body.query;
    Query.create(newQuery,function(err, newQuery){
        if(err)
        {
            console.log(err);
            res.redirect('back');
        }
        else
        {
            console.log("Success");
            req.flash("success","Your Query is submitted, we will Contact you soon!!");
            res.redirect("/contact");
        }
    })
})
app.listen(3000,function(){
    console.log("Server is running!");
});