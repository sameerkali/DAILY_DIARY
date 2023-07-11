//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent =
  "With this app you can do a lot like blog posting. You can post anything anonymously, without any restrictions. You can share news, tell about your problems .And you can do it all by keeping Anonymous one knows who posted which. Below this you will see all latest posts";
const aboutContent =
  "Daily Diary - With this app you can do a lot like blog posting. You can post anything anonymously, without any restrictions. You can share news, tell about your problems. And you can do it all by keeping Anonymous one knows who posted which. ABOUT DEVLOPER -- Hello my name is Sameer Faridi and I am a curious IT student . From UK. Love to do coding. I am active learner . I know C++, C, MERN.I am currently work on my - DSA. Also I have complete knowledge of computer hardware. Cyber security is my advantage subject. always try to make some good webapps for you guys.";
const contactContent =
  "Hello, My name is Sameer Faridi and my -- e-mail is s.faridi007@gmail.com and i would like to discuss about this project  thankyou 😊";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://SameerFaridi:Delcrm2601@sameerscluster.fgfiay0.mongodb.net/blogDB?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.listen(process.env.PORT || 5000);
