const getDay = x => {
	const now = new Date();
	now.setDate(now.getDate() + x);
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const day = days.filter(item => item.includes(now.toString().split(' ')[0]));
	return day[0];
};

const getDays = () => {
	const nextWeek = ['Today'];
	for (let i = 1; i < 8; i++) {
		nextWeek.push(getDay(i));
	}
	return nextWeek;
};

module.exports = getDays;
