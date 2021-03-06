require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var spotify = require("node-spotify-api");
var moment = require("moment");

var command = process.argv(2).slice(2);
var userQ = process
  .argv(3)
  .slice(3)
  .join(" ");

function userChoices(command, userQ) {
  switch (command) {
    case "concert-this":
      concertThis(userQ);
      break;
    case "spotify-this-song":
      spotifySong(userQ);
      break;
    case "movie-this":
      movieThis(userQ);
      break;
    case "do-what-it-says":
      doWhatSays(userQ);
      break;
    default:
      console.log = "Select another command";
  }
}

userChoices(command, userQ);

function concertThis(userQ) {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        userQ +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      console.log("Name of Venue: " + response.eventdata.venue.name);
      console.log(
        "Venue Location: " +
          response.eventdata.venue.city +
          ", " +
          response.eventdata.venue.region
      );
      console.log(
        "Venue: " +
          moment(response.eventdata.datetime, ["MM-DD-YYYY", moment.ISO_8601])
      );
    });
}

function spotifySong(userQ) {
  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: "track", query: userQ }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    } else {
      console.log(data);
    }
  });
}

function movieThis(userQ) {
  if (!userQ) {
    userQ = "Mr+Nobody";
  }

  axios
    .get("http://www.omdbapi.com/?t=" + userQ + "&apikey=trilogy")
    .then(function(response) {
      console.log(
        "Title " +
          response.data.title +
          "\n" +
          "Year Released: " +
          response.data.year +
          "\n" +
          "IMBD Rating: " +
          response.data.imdbRating +
          "\n" +
          "Rotten Tomatoes Rating: " +
          response.data.ratings[1].Value +
          "\n" +
          "Country: " +
          response.data.Country +
          "\n" +
          "Language: " +
          response.data.Language +
          "\n" +
          "Plot: " +
          response.data.Plot +
          "\n" +
          "Actors: " +
          response.data.Actors
      );
    });
}
