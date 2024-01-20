const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('ERROR🔻');
  console.log(err.name);
  console.log(err.message);
  process.exit(1);
});

const app = require('./app');
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log('DB connection successfull'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('ERROR🔻');
  console.log(err.name);
  console.log(err.message);
  server.close(() => {
    process.exit(1);
  });
});
