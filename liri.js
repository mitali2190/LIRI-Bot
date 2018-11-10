require("dotenv").config();
var request = require("request");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var moment = require("moment");;
var fs = require("fs");

var args = process.argv.slice(2);

// OMDB API with the movie specified
if (args[0] === "movie-this") {
    if (args.length == 1) {
        request("http://www.omdbapi.com/", function (error, response, body) {

            if (!error && response.statusCode === 200) {
                //console.log(body);
                console.log("Movie's title is: " + JSON.parse(body).Title);
                console.log("Movie's Year is: " + JSON.parse(body).Year);
                console.log("Movie's ratings is: " + JSON.parse(body).imdbRating);
                console.log("Country where movie was produced: " + JSON.parse(body).Country);
                console.log("Language of the movies: " + JSON.parse(body).Language);
                console.log("Plot of the movies: " + JSON.parse(body).Plot);
                console.log("Actors in the movie: " + JSON.parse(body).Actors);
            }
        });
    }
    else {

        request("http://www.omdbapi.com/" + args[1] + "", function (error, response, body) {

            if (!error && response.statusCode === 200) {
                //console.log(body);
                console.log("Movie's title is: " + JSON.parse(body).Title);
                console.log("Movie's Year is: " + JSON.parse(body).Year);
                console.log("Movie's ratings is: " + JSON.parse(body).imdbRating);
                console.log("Country where movie was produced: " + JSON.parse(body).Country);
                console.log("Language of the movies: " + JSON.parse(body).Language);
                console.log("Plot of the movies: " + JSON.parse(body).Plot);
                console.log("Actors in the movie: " + JSON.parse(body).Actors);
            }
        });
    }
}

if (args[0] == "spotify-this-song") {
    if (args.length === 1) {
        var spotify = new Spotify({
            id: "",
            secret: ""
        });

        spotify
          .search({ type: 'track', query: "The Sign" })
          .then(function (response) {
              console.log("Artist(s): " + response.tracks.items[0].album.artists[0].name);
              console.log("The Song's name: " + response.tracks.items[0].name);
              console.log("Preview link from Spotify: " + response.tracks.items[0].preview_url);
              console.log("Album name: " + response.tracks.items[0].album.name);
          })
          .catch(function (err) {
              console.log(err);
          });
    }
    else {
        var name_arr = args.slice(1);
        var name = "";
        for (var i = 0; i < name_arr.length; i++) {
            name = name + " " + name_arr[i];
        }
        var spotify = new Spotify({
            id: "",
            secret: ""
        });

        spotify
          .search({ type: 'track', query: name })
          .then(function (response) {
              console.log("Artist(s): " + response.tracks.items[0].album.artists[0].name);
              console.log("The Song's name: " + response.tracks.items[0].name);
              console.log("Preview link from Spotify: " + response.tracks.items[0].preview_url);
              console.log("Album name: " + response.tracks.items[0].album.name);
          })
          .catch(function (err) {
              console.log(err);
          });
    }
}   

if (args[0] === "hey") {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        console.log(data);
        // Then split it by commas 
        var dataArr = data.split(",");

        var spotify = new Spotify({
            id: "",
            secret: ""
        });

        spotify
          .search({ type: 'track', query: dataArr[1] })
          .then(function (response) {
              console.log("Artist(s): " + response.tracks.items[0].album.artists[0].name);
              console.log("The Song's name: " + response.tracks.items[0].name);
              console.log("Preview link from Spotify: " + response.tracks.items[0].preview_url);
              console.log("Album name: " + response.tracks.items[0].album.name);
          })
          .catch(function (err) {
              console.log(err);
          });

    });
}