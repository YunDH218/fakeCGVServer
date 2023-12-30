const userdata = require('./userdata.js');
// userdata.createUser('user1', 'pass1', 'user1@example.com');
// async function f() {
// 	const find = await userdata.findUserByUsername('user1')	
// 	console.log(find)
// }
// f();
// userdata.findUserByUsername('user1').then(result => console.log(result));

userdata.deleteUserByUsername('user0');
userdata.deleteUserByUsername('user1');
userdata.deleteUserByUsername('user2');
userdata.deleteUserByUsername('user3');