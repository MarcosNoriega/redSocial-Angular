require('dotenv').config();
const app = require('./config/server');

app.listen(app.get('port'), () => {
    console.log('app en el puerto', app.get('port'));
});