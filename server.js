const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 8080);

app.use('/*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));

const server = app.listen(app.get('port'), function() {
  console.log('Listening on port ', server.address().port);
});