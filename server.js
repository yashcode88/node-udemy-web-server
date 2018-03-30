const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const app = express();

const port = process.env.PORT || 3000;

var sdata = {};

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
    console.log(new Date().toDateString() + " : request for " + req.url);
    next();
});

app.use((req, res, next) => {
    sdata = getSiteData();
    if (!sdata.count[req.url]) sdata.count[req.url] = 0;

    // res.render("maintainance.hbs", {
    //     pageTitle: "Home page",
    //     currentYear: new Date(),
    //     welcomeMessage: "Welcome my first node.js website."
    // });
    next();
})

app.get("/", (req, res) => {
    var sdata1 = updateSiteData(sdata, req.url);
    var data = { "name": "abc" };
    // var data = "hello."
    // res.send(data);
    res.render("home.hbs", {
        pageTitle: "Home page",
        currentYear: new Date(),
        welcomeMessage: "Welcome my first node.js website.",
        visitorCount: sdata1.count[req.url]
    });
});
app.get("/home", (req, res) => {
    var sdata1 = updateSiteData(sdata, req.url);
    var data = { "name": "abc" };
    // var data = "hello."
    // res.send(data);
    res.render("home.hbs", {
        pageTitle: "Home page",
        currentYear: new Date(),
        welcomeMessage: "Welcome my first node.js website.",
        visitorCount: sdata1.count[req.url]
    });
});

app.get("/about", (req, res) => {
    var sdata1 = updateSiteData(sdata, req.url);
    // var data = {"name":"abc"};
    // va   r data = "hello."
    // res.send("About page.");
    res.render("about.hbs", {
        pageTitle: "About page",
        currentYear: new Date().toString(),
        visitorCount: sdata1.count[req.url]
    });
});

app.get("/projects", (req, res) => {
    var sdata1 = updateSiteData(sdata, req.url);
    // var data = {"name":"abc"};
    // va   r data = "hello."
    // res.send("About page.");
    res.render("projects.hbs", {
        pageTitle: "Projects page",
        currentYear: new Date().toString(),
        visitorCount: sdata1.count[req.url]
    });
});

var getSiteData = function () {
    var data = {"count":{}};
    try{
        data = JSON.parse(fs.readFileSync("sitedata.json", "utf8") || '{"count":{}}');
    }catch(e){
        // data = "";
    }
    // console.log(JSON.stringify(data))
    return data
}

var updateSiteData = function (obj, url) {
    if (!obj.count[url]) obj.count[url] = 0;
    obj.count[url]++;
    fs.writeFileSync("sitedata.json", JSON.stringify(obj), (err) => {
        console.log("Error : " + err);
    })
    console.log(`Visitor no : ${obj.count[url]}`);
    return obj;
}


app.listen(port, () => {
    console.log(`Server started on port ${port}...`)
});