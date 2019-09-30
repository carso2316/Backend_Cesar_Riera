//Storage Module
const fs = require('fs'),
    path = require('path');

module.exports = {
    getData: (ciudad, tipo, minPrice, maxPrice) => {
        let dataPath = __dirname + path.join('/data/data.json');
        return new Promise((resolve, reject) => {
            fs.readFile(dataPath, 'utf8', (err, readData) => {
                if (err) reject(err);

                let residencias = JSON.parse(readData);

                if (ciudad) {
                    residencias = residencias.filter(element => element.Ciudad === ciudad);
                }
                if (tipo) {
                    residencias = residencias.filter(element => element.Tipo === tipo);
                }
                if(minPrice){
                    residencias = residencias.filter(element => Number(element.Precio.replace('$', '').replace(',', '')) >= minPrice);
                }
                if (maxPrice){
                    residencias = residencias.filter(element => Number(element.Precio.replace('$', '').replace(',', '')) <= maxPrice);
                }
                resolve(residencias);
            })
        })
    }
}