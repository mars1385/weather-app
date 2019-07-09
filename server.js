//imports
const express = require('express');
const apiCall = require('./utils/apiCall');
const path = require('path');
//end

const app = express();
app.use(express.json());

//route
app.post('/weather', async (req, res) => {
	try {
		const { address } = req.body;

		if (address === '') {
			return res.status(404).json({ error: 'Please Search for a city!' });
		}
		const data = await apiCall.geocode(address);
		if (data.error) {
			return res.status(404).json({ error: 'Your Search did not match any location . Please Search again!' });
		}
		const weatherData = await apiCall.forecast(data.latitude, data.longitude, data.location);
		if (weatherData.error) {
			return res
				.status(404)
				.json({ error: 'There is some problem with server. Please try after few Minutes!' });
		}
		res.json(weatherData);
	} catch (error) {
		res.status(500).json();
	}
});

//run server
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`server is running on port : ${port}`);
});
