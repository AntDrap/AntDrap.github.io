const express = require('express');
const portNumber = 8080;
const mysql = require('mysql');

const con = mysql.createConnection
({
    host:'localhost',
    user:'root',
    database:'bradleygamearchive'
});

exports.con = con;

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.get("/getGame/:id", function(req, res){
    const q = "SELECT * FROM game WHERE game_ID = ?"
    con.query(q, req.params.id, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    })
});

app.get("/getGames", function(req, res){
    const q = "SELECT * FROM game"

    con.query(q, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    })
});

app.post("/update/:id", function(req, res){
    const gameEntry = 
    {
        game_ID: req.params.id,
        game_name: req.body.game_name, 
        game_release: req.body.game_release, 
        game_link: req.body.game_link, 
        game_videoID: youtube_parser(req.body.game_videoID), 
        game_description: req.body.game_description,
        game_contributors: req.body.game_contributors
    }

    var q = "DELETE FROM game WHERE game_ID = ?"

    con.query(q, req.params.id, (err, results) => {
        if(err) throw err
    })

    q = "INSERT INTO game SET ?"

    con.query(q, gameEntry, (err, results) => {
        if(err) throw err
        else
        {
            return res.redirect('/message.html?msg=Game-Successfully-Updated');
        }
    })
}); 

app.post("/create", function(req, res){
    const gameEntry = 
    {
        game_name: req.body.game_name, 
        game_release: req.body.game_release, 
        game_link: req.body.game_link, 
        game_videoID: youtube_parser(req.body.game_videoID), 
        game_description: req.body.game_description,
        game_contributors: req.body.game_contributors
    }

    const q = "INSERT INTO game SET ?"

    con.query(q, gameEntry, (err, results) => {
        if(err) throw err
        else
        {
            return res.redirect('/message.html?msg=Game-Successfully-Created');
        }
    })
}); 

app.listen(portNumber, function () {
    console.log(`App listening on port: ${portNumber}`);
});

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : "";
}