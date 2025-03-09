const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');

// Routes
router.post('/create', articleController.create);
router.get('/get', articleController.get);

// Test route
router.get('/test', articleController.test);
router.get('/anthos', articleController.anthos);

module.exports = router;