//import
import React, { useState } from 'react';
//material
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
//
import axios from 'axios';
//image
import icon from '../img/icon.png';
import min from '../img/min.png';
import max from '../img/max.png';
import err from '../img/errors.png';

const useStyles = makeStyles({
	form: {
		textAlign: 'center',
		marginTop: '30px'
	},
	image: {
		margin: '10px auto'
	},
	textField: {
		margin: '10px auto',
		width: 400
	},
	head: {
		textAlign: 'center'
	},
	button: {
		margin: '15px 10px 10px 10px'
	},
	margin: {
		marginLeft: 'auto'
	},
	card: {
		height: 210
	}
});
const MainContent = () => {
	//state
	const [address, setAddress] = useState('');
	const [weather, setWeather] = useState([]);
	const [loading, setLoading] = useState(false);
	const [days, setDays] = useState([]);
	const [errors, setErrors] = useState('');

	const classes = useStyles();
	//changing field

	const onChange = e => {
		setAddress(e.target.value);
	};
	//getting next week weather
	const onSubmit = async e => {
		e.preventDefault();
		setWeather([]);
		setLoading(true);
		try {
			const res = await axios.post('/weather', { address });
			const { sendingDataArray, daysName } = res.data;
			setErrors('');
			setWeather(sendingDataArray);
			setDays(daysName);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setErrors(error.response.data.error);
		}
	};
	return (
		<div className='container'>
			<Grid container className={classes.head}>
				<Grid item xs={12}>
					<img src={icon} alt='Weather icon' className={classes.image} />
					<Typography variant='h5'>Weather App</Typography>
				</Grid>
			</Grid>
			<Grid container className={classes.form}>
				<Grid item xs={12}>
					<form noValidate onSubmit={onSubmit}>
						<TextField
							id='address'
							name='address'
							variant='outlined'
							value={address}
							onChange={onChange}
							label='Search your location'
							helperText='* Search a city to get next week weather.'
							className={classes.textField}
						/>
						<Button size='large' variant='contained' type='submit' color='primary' className={classes.button}>
							Search
						</Button>
					</form>
				</Grid>
			</Grid>
			<Grid container className={classes.form} spacing={1}>
				{weather.length > 0 ? (
					weather.map((item, index) => (
						<Grid item sm xs md xl lg align='center' key={index}>
							<Card className={classes.card}>
								<CardActionArea>
									<CardContent>
										<h4>{days[index]}</h4>
										<img src={require(`../img/${item.icon}.png`)} alt='icon' />
									</CardContent>
								</CardActionArea>
								<CardActions>
									<Typography variant='body2' color='textSecondary' component='p'>
										<img src={min} alt='min' />
									</Typography>
									<Typography variant='body2' color='textSecondary' component='p'>
										{item.temperatureMin}
									</Typography>
									<Typography variant='body2' color='textSecondary' component='p' className={classes.margin}>
										<img src={max} alt='max' />
									</Typography>
									<Typography variant='body2' color='textSecondary' component='p'>
										{item.temperatureMax}
									</Typography>
								</CardActions>
							</Card>
						</Grid>
					))
				) : (
					<Grid item xs={12} align='center'>
						{loading ? (
							<CircularProgress />
						) : errors.length > 0 ? (
							<div>
								<p style={{ color: 'red' }}>
									<strong>{errors}</strong>
								</p>
								<img src={err} alt='error' style={{ marginBottom: '10px' }} />
							</div>
						) : null}
					</Grid>
				)}
			</Grid>
		</div>
	);
};

export default MainContent;
