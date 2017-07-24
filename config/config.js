module.exports = {
  port: process.env.PORT || 3000,
  db: 'mongodb://localhost/angular-auth',
  secret: process.env.SECRET || 'gosh this is so secret... shhh...'
};
