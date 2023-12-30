var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/userdata');

var userdata = mongoose.connection;
// connection failed
userdata.on('error', () => {console.log('Connection Failed : "/userdata"')});
// connected
userdata.once('open', () => {console.log('Connected : "/userdata"')});
// define user schema
var user = mongoose.Schema({
	username: {type: String, unique: true},
	password: String,
	email: {type: String, unique: true}
});

var User = mongoose.model('Schema', user);

exports.createUser = (username, password, email) => {
	return new User({
		username: username,
		password: password,
		email: email
	})
	.save()
	.then(result => result)
	.catch(error => error);
};

exports.findUserByUsername = username => {
	return User.findOne({ username: username })
	.then(result => result)
	.catch(error => { console.log(error) });
}

exports.deleteUserByUsername = username => {
	User.deleteOne({"username": username})
	.then( () => console.log(username + ' is deleted') )
	.catch( error => console.log(error) );
}