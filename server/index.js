const express = require('express');
const bodyParser = require('body-parser');

const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataAccessObject = new DataAccessObject('./database.sqlite3');
const comment = new Comment(dataAccessObject); // this now extends EventEmitter

comment.createTable().catch((error) => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

app.post('/api/createComment', function (request, response) {
  const { body } = request;
  comment.createComment(body).then((result) => {
    response.send(result);
  });
});

app.get('/api/getComment', function (request, response) {
  const { body } = request;
  const { id } = body;
  comment.getComment(id).then((result) => {
    response.send(result);
  });
});

app.get('/api/getComments', function (request, response) {
  comment.getComments().then((result) => {
    response.send(result);
  });
});

app.delete('/api/deleteComments', function (request, response) {
  comment.deleteComments().then((result) => {
    response.send(result);
  });
});

/**
 * Added a `comments/subscribe` endpoint for long-polling, as it will provide
 * a better user experience than standard polling, at the expense of keeping
 * open connections around
 */
app.get('/api/comments/subscribe', function (request, response) {
  /**
   * This is intentionally naive for the sake of simplicity; this endpoint
   * should also time connections out in case they are not properly closed
   */
  comment.once('update', (comments) => {
    response.send(comments);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
  const rootDir = __dirname.replace('/server', '');
  response.sendFile(`${rootDir}/src/index.html`);
});
