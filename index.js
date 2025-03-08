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
app.use(express.json());

// Create routes
app.get('/test', (req, res) => {
	console.log('Endpoint /test executed');
	res.status(200).json({
		colaborators: ["Pedro", "Christian", "Eduardo"],
		createdBy: "Anthos labs"
	})

	// return res.status(200).send(`
	// 		<div>
	// 			<h1>Route /test</h1>
	// 			<p>Anthos labs web tech stack</p>
	// 			<ul>
	// 				<li>Frontend: ReactJs</li>
	// 				<li>Backend: NodeJs</li>
	// 			</ul>
	// 		</div>
	// 	`)
});

app.get("/", (req, res) => {
	res.status(200).send(`
		<div>
			<h1>Anthos labs</h1>
		</div>
	`)
})

// Create server and listen http petitions
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
})