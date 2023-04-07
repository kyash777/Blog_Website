
const express = require("express");

const bodyparser = require("body-parser");

const ejs = require("ejs");

const _ = require("lodash");

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect("mongodb+srv://Yash_Kshatriya:Yash%402001@cluster0.g5wkfi7.mongodb.net/BlogDB", { useNewUrlParser: true });
// mongodb+srv://Yash_Kshatriya:Yash%402001@cluster0.g5wkfi7.mongodb.net/BLOGDB

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
})

const Post = mongoose.model("Post", postSchema);


const { json } = require("stream/consumers");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static("public"));

// var postarray=[];

app.get("/", function (req, res) {

    Post.find({}, function (err, posts) {
        res.render("home", {
            s_content: homeStartingContent,
            postarray: posts,
        });
    });

})

app.get("/:customlistname", function (req, res) {

    const listname = _.capitalize(req.params.customlistname);

    if (listname == "Contact") {
        res.render("contact", { s_content: contactContent })
    }

    if (listname == "About") {
        res.render("about", { s_content: aboutContent })

    }
    if (listname == "Home") {
        res.render("home", {
            s_content: homeStartingContent,
            postarray: Post,

        })

    }
    if (listname == "Compose") {
        res.render("compose")
    }

})

app.get("/posts/:postId", function (req, res) {

    const requestedPostId = req.params.postId;

    Post.findOne({ _id: requestedPostId }, function (err, post) {

        res.render("post", {
            title: post.title,
            content: post.content,

        });

    })


})
app.post("/compose", function (req, res) {

    var post = new Post({
        title: _.capitalize(_.lowerCase(req.body.posttitle)),
        content: _.capitalize(_.lowerCase(req.body.postblog)),
    });
    post.save(function (err) {
        if (!err) {
            res.redirect("/");
        }
    })

});





app.listen(3000, function () {
    console.log("server started at port 3000")
})


