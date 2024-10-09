// Importacion de modulo fs para leer y escribir archivos, y del modulo path para trabajar las rutas de archivos
const fs = require('fs');
const path = require('path');

// Ruta del archivo JSON donde se alamacenan los datos de autores.
const authorsFilePath = path.join(__dirname, '../data/authors.json');

const authorsModel = {
    // Funcion para leer el archivo json donde estan almacenados los autores.
    readAuthors: () => {
        const data = fs.readFileSync(authorsFilePath, 'utf-8');
        return JSON.parse(data);
    },

    // Esta es la funcion que va a permitir sobreescribir el archivo. 
    writeAuthors: (author) => {
        const jsonData = JSON.stringify(author, null, 2);
        fs.writeFileSync(authorsFilePath, jsonData, 'utf-8');
    }
};

module.exports = authorsModel; 