const EventEmitter = require('events');

class Comment extends EventEmitter {
  constructor(dataAccessObject) {
    super();
    this.dataAccessObject = dataAccessObject;
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      message TEXT,
      created DATETIME DEFAULT CURRENT_TIMESTAMP)`;
    return this.dataAccessObject.run(sql);
  }

  deleteComments() {
    const sql = 'DELETE FROM comments';
    return this.dataAccessObject.run(sql).then((deleteResult) => {
      this.getComments().then((comments) => this.emit('update', comments));
      return deleteResult;
    });
  }

  createComment({ name, message }) {
    return this.dataAccessObject
      .run('INSERT INTO comments (name, message) VALUES (?, ?)', [name, message])
      .then((insertResult) => {
        this.getComments().then((comments) => this.emit('update', comments));
        return insertResult;
      });
  }

  getComment(id) {
    return this.dataAccessObject.get('SELECT * FROM comments WHERE id = ?', [id]);
  }

  getComments() {
    return this.dataAccessObject.all('SELECT * FROM comments');
  }
}

module.exports = Comment;
