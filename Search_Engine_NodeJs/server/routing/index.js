//Router
const express = require('express'),
  Storage = require('../Storage'),
  Router = express.Router();

Router.get('/records', (req, res) => {
  Storage.getData(req.query.ciudad, req.query.tipo, req.query.minPrice, req.query.maxPrice)
    .then((data) => {
      res.json(data)
    }).catch((error) => {
      res.sendStatus(500).json(error);
    })
});

  Router.get('/cities', (req, res) => {
    let ciudades = [];
    Storage.getData()
      .then((data) => {
        ciudades = getResidenciesData(data, "Ciudad");
        res.json(ciudades);
      }).catch((error) => {
        res.sendStatus(500).json(error);
      })
  });
  
  Router.get('/residencyTypes', (req, res) => {
    let tipos = [];
    Storage.getData()
      .then((data) => {
        tipos = getResidenciesData(data, "Tipo");
        res.json(tipos);
      }).catch((error) => {
        res.sendStatus(500).json(error);
      })
  });

getResidenciesData = (data, property) => {
  let records = [];
  data.forEach(element => {
    if (!records.includes(element[property]))
    records.push(element[property]);
  });
  return records;
}

module.exports = Router;