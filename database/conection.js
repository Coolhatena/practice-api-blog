const mongoose = require('mongoose');

const connection = async () => {
	try {
		// Configuration parameters that could be needed on moonogoose.connect
		// UseNewUrlParser: true, 
		// useUnifiedTopology: true, 
		// useCreateIndex: true
		await mongoose.connect('mongodb://127.0.0.1:27017/my_blog')

		console.log('Connected to DB: my_blog');

	} catch (error) {
		console.log(error);
		throw new Error('Unable to connect to DB');
	}
}

module.exports = {
	connection
};