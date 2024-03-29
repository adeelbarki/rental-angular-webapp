const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');
const path = require('path');

const rentalRoutes = require('./routes/rentals'),
      userRoutes = require('./routes/users'),
      bookingRoutes = require('./routes/bookings'),
      imageUploadRoutes = require('./routes/image-upload');

mongoose.connect(config.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
//   if(process.env.NODE_ENV !== 'production') {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
//   }
});

mongoose.set('useCreateIndex', true);

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/', imageUploadRoutes);

// if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(appPath));

  app.get('*', function(req, res) {
  res.sendFile(path.resolve(appPath, 'index.html'));
  })
// }



const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log("Running on port 3001")
});
