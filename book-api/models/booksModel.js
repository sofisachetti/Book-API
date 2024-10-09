// Importacion de modulo fs para leer y escribir archivos, y del modulo path para trabajar las rutas de archivos
const fs = require('fs');
const path = require('path');

// Ruta del archivo JSON donde se alamacenan los datos de los libros.
const booksFilePath = path.join(__dirname, '../data/books.json');

const booksModel = {
    // Funcion para leer el archivo json donde estan almacenados los libros. Se llama en el controller
    readBooks: () => {
        const data = fs.readFileSync(booksFilePath);
        return JSON.parse(data)
    },

    // Esta es la funcion que va a permitir sobreescribir el archivo. 
    writeBooks: (book) => {
        const jsonData =JSON.stringify(book, null, 2);
        fs.writeFileSync(booksFilePath, jsonData, 'utf-8');
    }    
};

module.exports = booksModel;