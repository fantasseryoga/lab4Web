var User=require('./user');
var user = new User('Petro', 'Petrenko');
console.log('firstname:' + user.first);
console.log('lastname:' + user.last);
user.fullName();