const { connection } = require('./database/connection');
const express = require('express');
const cors = require('cors');

// Call the connection function
connection();

// Create node server
const app = express();
const port = 3900;

// Configure CORS
app.use(cors());

// Convert body into a JSON object
app.use(express.json()); // Get data with content-type: application/json
app.use(express.urlencoded({extended: true})); // Get data with content-type: application/x-www-form-urlencoded

// Load routes
const routesArticle = require('./routes/article');

app.use('/api', routesArticle);

// Create server and listen http petitions
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
})