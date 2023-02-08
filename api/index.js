import axios from "axios";
import { OPEN_WEATHER_MAP_API_KEY } from "../config/config";

export function getCityWeather({ city = "Dar Es Salaam" }, callback) {
	let config = {
		method: "get",
		maxBodyLength: Infinity,
		url:
			"https://api.openweathermap.org/data/2.5/weather?appid=" +
			OPEN_WEATHER_MAP_API_KEY +
			"&q=" +
			city +
			"&units=metric",
		headers: {},
	};

	axios(config)
		.then((response) => {
			callback(response.data);
		})
		.catch((error) => {
			callback(error);
		});
}
