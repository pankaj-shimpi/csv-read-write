const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { data } = require('./mockData');
const { downloadFile, storeToFile } = require('./storeToFile');

dotenv.config();
const app = express()
app.use(bodyParser.json());
const APP_PORT = process.env.APP_PORT || 3000;
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'test';

mongoose.connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`, (err, dbOptions) => {
  const db = dbOptions.db;
  db.collection('test-data').countDocuments({}, (err, count) => {
    if(err) {
      throw new Error(err);
    } else {
      if(!count) {
        db.collection('test-data').insertMany(data, (err, res) => {
          if(err) {
            throw new Error(err);
          }
        }); 
      }
    }
    return;
  });

  app.post('/search', async (req, res) => {
    const { startDate, endDate } = req.body;
    try {
      const query = { createdAt: { '$gte': startDate, '$lt': endDate }};
      const result = await db.collection('test-data').find(query);
      const resultData = await result.toArray();
      if(resultData.length) {
        storeToFile(resultData);
      }
      if(process.env.NODE_ENV === 'development') {
        res.send({ downloadUrl: `http://${req.hostname}:${APP_PORT}/download` });
      } else {
        res.send({ downloadUrl: `http://${req.hostname}/download` });
      }
      return;
    } catch (error) {
      res.status(500).send('Something went wrong!');
    }
  });
  
  app.get('/search', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
      const query = { createdAt: { '$gte': Number(startDate), '$lt': Number(endDate) }};
      const result = await db.collection('test-data').find(query);
      const resultData = await result.toArray();
      if(resultData.length) {
        storeToFile(resultData);
      }
      if(process.env.NODE_ENV === 'development') {
        res.send({ downloadUrl: `http://${req.hostname}:${APP_PORT}/download` });
      } else {
        res.send({ downloadUrl: `http://${req.hostname}/download` });
      }
      return;
    } catch (error) {
      res.status(500).send('Something went wrong!');
    }
  });
  
  app.get('/download', (req, res) => {
    const csvData = downloadFile();
    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csvData);
  });
  
  app.listen(APP_PORT, () => {
    console.log(`Server is running port ${APP_PORT}`);
  });
});
