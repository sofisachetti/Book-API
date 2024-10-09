// Importacion de modulo fs para leer y escribir archivos, y del modulo path para trabajar las rutas de archivos
const fs = require('fs');
const path = require('path');

// Ruta del archivo JSON donde se alamacenan los datos de las editoriales.
const publishersFilePath = path.join(__dirname, '../data/publishers.json');

const publishersModel = {
    // Funcion para leer el archivo json donde estan almacenados las editoriales. Se llama en el controller.
    readPublishers: () => {
        const data = fs.readFileSync(publishersFilePath, 'utf-8');
        return JSON.parse(data);
    },

    // Esta es la funcion que va a permitir sobreescribir el archivo. 
    writePublishers: (publisher) => {
        const jsonData = JSON.stringify(publisher, null, 2);
        fs.writeFileSync(publishersFilePath, jsonData, 'utf-8');
    }
};

module.exports = publishersModel;