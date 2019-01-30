require("dotenv").config();
var request = require("request");
var Spotify = require('node-spotify-api');
// var keys = require("./keys.js");
var moment = require("moment");;
var fs = require("fs");


// // var spotify = new Spotify (keys.spotify);
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

let opr = process.argv[2];
let term = process.argv[3];

main(opr)

function main(switchTerm){
    switch(switchTerm){
        case "movie":
            console.log('movie');
            OMDBmovie(term);
            break;
        case "concert":
            console.log("consert");
            concertThis(term);
            break;
        case "spotifysign":
            console.log('spotifysign');
            spotifyThis(term);
            break;
        case "do_this":
            console.log("do_this");
            doSomething(term);
            break;
        default:break;
    }
}


//case "do_this":
//     fs.readFile("random.txt", "utf8", function err, data) {
//         if (err) {
//             return console.log(err);
//         }
//         console.log(data);
//         var dataArr = data.split(",");
//         operation = dataArr[0];
//         term = dataArr[1];
//         Main()
//     })
//     break
// }
// }


function OMDBmovie(movie) {
    request ("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (err, response, body) {
        if (!err && response.statusCode === 200) {
            let rating = null;

            // console.log(body);
            let data = JSON.parse(body);

      console.log("The Title of the movie is: " + data.Title);
      console.log("Year the movie came out: " + data.Year);
      console.log("Rating of the movie: " + data.imdbRating);    
    }
  })
}

function concertThis (artist) { 
    request ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (err, response, body) {
        if (!err && response.statusCode === 200) {
            let con = JSON.parse(body);
            // console.log(JSON.stringify(body, null, 2))
            for(let i = 0; i < con.length; i++){
                console.log(con[i]);
                console.log("venue:" + con[i] .venue.name)
            }
        }
    })
}
// // }
function spotifyThis (song){
    console.log(song);
    if(!Spotify){
        return null;
    }
    spotify.search({type: 'track' , query: song}, function (err, data ){
        if (err){
            return console.log('error occurred: ' + err);
        }
        var resp = data;
    //     console.log('-----')
    //     console.log("Artist(s): " + data.trackes. item[0].artist[0].name);
    //     console.log('-----')
    //     console.log("Song(s): " + data.trackes. item[0].song);
    //     console.log('-----')
    //    console.log("name(s): " + data.trackes. item[0].name);
    });
}