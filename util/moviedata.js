const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/moviedata');

const moviedata = mongoose.connection;
// connection failed
moviedata.on('error', () => {console.log('Connection Failed : "/moviedata"')});
// connected
moviedata.once('open', () => {console.log('Connected : "/moviedata"')});
// define movie schema
const movie = mongoose.Schema({
    title: String,
    genre: Array,
    poster: String,
    director: Array,
    stars: Array,
    runtime: String,
    releasedate: Date,
    description: String
});

const Movie = mongoose.model('Schema', movie);

exports.createMovie = (title, genre, poster, director, stars, runtime, releasedate, description) => {
	return new Movie({
		title: title,
		genre: genre,
		poster: poster,
		director: director,
		stars: stars,
		runtime: runtime,
		releasedate: releasedate,
		description: description
	})
	.save()
	.then(result => result)
	.catch(error => error);
};

exports.findMovieByTitle = title => {
	return Movie.findOne({ title: title })
	.then(result => result)
	.catch(error => { console.log(error) });
}

exports.deleteMovieByTitle = title => {
	User.deleteOne({"title": title})
	.then( () => console.log(title + ' is deleted') )
	.catch( error => console.log(error) );
}