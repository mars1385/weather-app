//import
import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Navbar = () => {
	return (
		<div>
			<AppBar>
				<Toolbar className='nav-bar'>
					<Typography variant='h6'>Weather App</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
