const express = require('express');
const multer = require('multer');
const articleController = require('../controllers/article');

const router = express.Router();
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './images/articles');
	},
	filename: (req, file, cb) => {
		cb(null, "article" + Date.now() + file.originalname);
	}
})

const uploads = multer({ storage });


// Routes
router.post('/create', articleController.create);
router.get('/get/:latest?', articleController.get);
router.get('/article/:id', articleController.one);
router.delete('/article/:id', articleController.remove);
router.put('/article/:id', articleController.edit);
router.post('/upload-image/:id', [uploads.single("file0")], articleController.upload);
router.get('/image/:file', articleController.image);
router.get('/search/:search', articleController.search);

// Test route
router.get('/anthos', articleController.anthos);

module.exports = router;