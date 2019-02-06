const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
//it is place in the backend for security measures. Hiding API key externally 
const app = new Clarifai.App({
 apiKey: '42307a17a53f42b7883c3f4d068d207d'
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with apinp'))
}


const handleImage = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
  	res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}