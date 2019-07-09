//import
import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MainContent from './components/MainContent';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#33c9dc',
			main: '#00bcd4',
			dark: '#008394',
			contrastText: '#fff'
		},
		secondary: {
			light: '#ff6333',
			main: '#ff3d00',
			dark: '#b22a00',
			contrastText: '#fff'
		}
	}
});

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<div className='App'>
				<Navbar />
				<div className='container'>
					<MainContent />
				</div>
			</div>
		</MuiThemeProvider>
	);
}

export default App;
