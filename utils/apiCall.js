//imports
const fetch = require('node-fetch');
const apiKeys = require('../config/keys');
const getDays = require('./getDays');
//end
//finding location
const geocode = async address => {
	const locationURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}
	.json?access_token=${apiKeys.geocodeApiKey}&limit=1`;
	try {
		const result = await fetch(locationURL);
		const jsonData = await result.json();
		return {
			latitude: jsonData.features[0].center[1],
			longitude: jsonData.features[0].center[0],
			location: jsonData.features[0].place_name
		};
	} catch (error) {
		return { error };
	}
};
//getting week weather prediction
const forecast = async (latitude, longitude, name) => {
	const URL = `https://api.darksky.net/forecast/${apiKeys.weatherApiKey}/${latitude},${longitude}`;
	try {
		const result = await fetch(URL);
		const jsonData = await result.json();

		const sendingDataArray = jsonData.daily.data.map(day => {
			return {
				summary: day.summary,
				icon: day.icon,
				name,
				temperatureMin: Math.round(day.temperatureMin),
				temperatureMax: Math.round(day.temperatureMax)
			};
		});
		const daysName = getDays();

		return {
			daysName,
			sendingDataArray
		};
	} catch (error) {
		return { error };
	}
};

module.exports = {
	geocode,
	forecast
};
