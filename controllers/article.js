const validator = require('validator');
const Article = require('../models/Article');

const test = (req, res) => {
	return res.status(200).json({message: "Everything ok on Article controller"});
}

const anthos = (req, res) => {
	return res.status(200).json({message: "Made with <3 by Anthos Labs"});
}


const create = (req, res) => {
	// Get the body of the request
	const params = req.body;
	// Validate body
	try {
		let validate_title = !validator.isEmpty(params.title) && validator.isLength(params.title, {min: 1, max: undefined});
		let validate_content = !validator.isEmpty(params.content);

		if (!validate_title || !validate_content) {
			throw new Error("Incorrect data");
		}
	} catch (error) {
		return res.status(400).json({status: "error", message: error.message});
	}

	// Create the article object
	const article = new Article(params);

	// Save the article in the database and return a response
	article.save()
		.then((article) => {
			return res.status(200).json({status: "success", message:`Article created`, article});
		})
		.catch((error) => {
			return res.status(400).json({status: "error", message: error.message});
		});
}

module.exports = {
	test,
	anthos,
	create
}