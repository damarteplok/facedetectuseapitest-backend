const Clarifai =  require('clarifai');

const app = new Clarifai.App({
  apiKey: 'e92f2695fa8743cc92eaf78e1fd526b8'
 });

const handleApiCall = (req, res) => {
 app.models
 .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
 .then(data => {
 	res.json(data);
 })
 .catch(err => res.status(400).json('unable work wih api'))
}

const handleImage = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('error getting entries'))

}

module.exports = {
	handleImage,
	handleApiCall
}