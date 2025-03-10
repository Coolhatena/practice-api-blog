const fs = require('fs');
const path = require('path')
const { validateArticle } = require('../helpers/validate');
const Article = require('../models/Article');

const anthos = (req, res) => {
	return res.status(200).json({message: "Made with <3 by Anthos Labs"});
}

const create = async (req, res) => {
	// Get the body of the request
	const params = req.body;
	// Validate body
	try {
		validateArticle(params);
	} catch (error) {
		return res.status(400).json({status: "error", message: error.message});
	}

	// Create the article object
	const article = new Article(params);
	
	// Save the article in the database and return a response
	try {
		const result = await article.save()
		return res.status(200).json({status: "success", message:`Article created`, result});
	} catch (error) {
		return res.status(400).json({status: "error", message: error.message});
	}
}

const get = async (req, res) => {
	try {
		const is_latest = req.params.latest ? 3 : undefined;
		const articles = await Article.find({}).limit(is_latest).sort({date: -1}).exec();

		if (!articles) {
			return res.status(404).json({status: "error", message: "No articles found"});
		}

		return res.status(200).json({status: "success", is_latest: req.params.latest, count: articles.length ,articles});

	} catch (error) {
		return res.status(400).json({status: "error", message: error.message});
	}
}

const one = async (req, res) => {
	try {
		// Get the article id
		const articleId = req.params.id;

		// Search the article in the database
		let article = await Article.findById(articleId).exec();

		// Return error if no article found
		if (!article) {
			return res.status(404).json({status: "error", message: "Article not found"});
		}

		// Return the article
		return res.status(200).json({status: "success", article});
	} catch(error) {
		return res.status(400).json({status: "error", message: error.message});
	}
}

const edit = async (req, res) => {
	// Get the article id
	const articleId = req.params.id;

	// Get the body of the request
	let params = req.body;

	// Validate data
	try {
		validateArticle(params);
	} catch (error) {
		return res.status(400).json({status: "error", message: error.message});
	}

	// Find and update the article
	try {
		const updatedArticle = await Article.findByIdAndUpdate(articleId, params, {new: true}).exec() // {new: true} returns the updated document instead of the original (pre-update)
		if (!updatedArticle) {
			return res.status(404).json({status: "error", message: "Article not found"});
		}

		return res.status(200).json({status: "success", message: "Article updated", updatedArticle});

	} catch (error) {
		return res.status(400).json({status: "error", message: error.message});
	}

}

const remove = async (req, res) => {
	try {
		// Get the article id
		const articleId = req.params.id;

		// Search the article in the database
		let article = await Article.findByIdAndDelete(articleId).exec();

		// Return error if no article found
		if (!article) {
			return res.status(404).json({status: "error", message: "Article not found"});
		}

		// Return the article
		return res.status(200).json({status: "success", message: "Article deleted"});
	} catch(error) {
		return res.status(400).json({status: "error", message: error.message});
	}
}

const upload = async (req, res) => {
	// Configure multer on routes
	// Get the file from the request on routes

	// Validate file existence
	if (!req.file && !req.files) {
		return res.status(400).json({
			status: 'error',
			message: 'No file attached'
		})
	}

	// Get file name and extension
	const filename = req.file.originalname;
	const extension = filename.split('.')[1];
	console.log(extension)

	// Check if extension matches
	if ( !['jpg', 'png', 'jpeg', 'gif'].includes(extension) ) { // If the extension is not valid
		// Delete file and return response
		fs.unlink(req.file.path, (error) => {});

		return res.status(400).json({
			status: 'error',
			message: 'Invalid file'
		})
	} 

	// Add the file to the 
	let articleId = req.params.id
	try {
		const updatedArticle = await Article.findByIdAndUpdate(articleId, {image: req.file.filename}, {new: true}).exec() // {new: true} returns the updated document instead of the original (pre-update)
		if (!updatedArticle) {
			return res.status(404).json({status: "error", message: "Article not found"});
		}

		return res.status(200).json({status: "success", message: "Article updated", updatedArticle});

	} catch (error) {
		return res.status(400).json({status: "error", message: error.message});
	}
}

const image = (req, res) => {
	const file = req.params.file;
	const filePath = './images/articles/' + file;

	const is_file_exist = fs.existsSync(filePath);
	if ( is_file_exist ) {
		return res.sendFile(path.resolve(filePath));
	} else {
		return res.status(404).json({status: "error", message: "File does not exist"});
	}

}

module.exports = {
	anthos,
	create,
	get,
	one, 
	edit,
	remove,
	upload,
	image,
}