var mongoose = require('mongoose');
var Article = require("./models/article.js");
var Rocket = require("./models/rocket.js");

const csvtojson = require("csvtojson");
function seedDB()
{
    Article.deleteMany({},function(err)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            csvtojson()
            .fromFile("data.csv")
            .then(csvData => {
             for(var i=0;i<csvData.length;i++)
             {
              Article.create(csvData[i],function(err, file){
                  if(err)
                  {
                      console.log(err);
                  }
              });
             }
              
          });
        }
    });
    Rocket.deleteMany({},function(err)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            csvtojson()
            .fromFile("rocket.csv")
            .then(csvData => {
             for(var i=0;i<csvData.length;i++)
             {
              Rocket.create(csvData[i],function(err, file){
                  if(err)
                  {
                      console.log(err);
                  }
              });
             }
            // console.log(csvData);  
          });
        }
    }); 
}

module.exports = seedDB;
