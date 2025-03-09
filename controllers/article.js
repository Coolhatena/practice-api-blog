const test = (req, res) => {
	return res.status(200).json({message: "Everything ok on Article controller"});
}

module.exports = {
	test
}