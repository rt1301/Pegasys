var mongoose = require('mongoose');
var rocketSchema = new mongoose.Schema({
    Name: String,
    Height: String,
    Diameter: String,
    Mass: String,
    LEO: String,
    GTO: String,
    Tagline: String,
    img1: String,
    Content: String,
    Camera_x : Number,
    Camera_y : Number,
    Camera_z : Number,
    Position: Number,
    Header : String,
    img2: String,
    img3: String,
    img4: String,
    desc1: String,
    desc2: String,
    desc3: String,
});

module.exports = mongoose.model("Rocket",rocketSchema);