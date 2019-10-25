const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/redSocial')
.then(ok => console.log('db conectada'))
.catch(err => console.log(err));


