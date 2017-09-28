const express = require("express")
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

const apiKey = "f9771552a44499c6cf2323c3809575d8";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var weatherPrev = ['Previously:'];

app.get('/', function (req, res) {
  res.render("index", {weather: null, error: null, weatherPrev});
})


app.post("/", function (req, res) {
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}` +
					`&APPID=${apiKey}` +
					`&units=imperial`;

	request(url, function (err, response, body) {
		if (err) {
			res.render("index", {weather: null, error: "Error, please try again", weatherPrev});
		} else {
			let weather = JSON.parse(body);
			if (weather.main == undefined) {
				res.render("index", {weather: null, error: "Error, please try again", weatherPrev});
			} else {
				let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
				weatherPrev.push(weatherText);
				res.render("index", {weather: weatherText, error: null, weatherPrev});
			}
		}
	})				
})

app.listen(3000, function () {
  console.log("Example app listening on port 3000!")
})	