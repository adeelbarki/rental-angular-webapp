const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');
const AWS = require('aws-sdk');
const rentalRoutes = require('./routes/rentals');

// mongoose.connect(config.DB_URI).then(() => {
//   const fakeDb = new FakeDb();
//   fakeDb.seedDb();
// });


const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: config.region,
  accessKeyId: config.AWSAccessKeyId,
  secretAccessKey: config.AWSSecretKey
})

async function insertDataIntoDatabase() {
    const fakeDb = new FakeDb();
    var params = {
      TableName:config.table,
      Item: {
        rentalId: "234567AUSF",
        title: "Old house in nature",
        city: "Spisska Nova Ves",
        street: "Banicka 1",
        category: "house",
        image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 5,
        shared: true,
        description: "Very nice apartment in center of the city.",
        dailyRate: 23
      }
  }


  let putItem = new Promise((res, req) => {
    dynamoDB.put(params, function(err, data) {
      if (err) {
        console.log("error", err)
        req(err);
      } else {
          console.log("success")
        res("Inserted rental data into dynamodb table")
      }
    })
  })
  const result = await putItem;
  console.log(result);
}

const app = express();

app.use('/api/v1/rentals', rentalRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log("Running on port 3001")
});


insertDataIntoDatabase()
