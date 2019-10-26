const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/redSocialAngular')
.then(ok => console.log('db conectada'))
.catch(err => console.log(err));


