const express = require("express");
const hbs = require("hbs");

const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
    console.log(new Date().toDateString() + " : request for " + req.url);
    next();
})

app.use((req, res, next) => {
    res.render("maintainance.hbs", {
        pageTitle: "Home page",
        currentYear: new Date(),
        welcomeMessage: "Welcome my first node.js website."
    });
    // next();
})

app.get("/", (req, res) => {
    var data = { "name": "abc" };
    // var data = "hello."
    // res.send(data);
    res.render("home.hbs", {
        pageTitle: "Home page",
        currentYear: new Date(),
        welcomeMessage: "Welcome my first node.js website."
    });
});

app.get("/about", (req, res) => {
    // var data = {"name":"abc"};
    // va   r data = "hello."
    // res.send("About page.");
    res.render("about.hbs", {
        pageTitle: "About page",
        currentYear: new Date().toString()
    });
});


app.listen(3000, () => {
    console.log("Server started on port 3000...")
});