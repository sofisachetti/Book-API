//Importo el modelo, en donde estarian las funciones para leer y escribir en un archivo JSON
const booksModel = require('../models/booksModel'); 
const responseFormatter = require('../views/responseFormatter');

const booksController = {
    //Funcion para obetener todos los libros que hay en el json
    getBooks: () => {
        const books = booksModel.readBooks();
        return responseFormatter.formatResponse(books);
    },

    //Funcion para agregar un nuevo libro al json.
    addBooks: (newBook) => {
        const books = booksModel.readBooks();
        books.push(newBook);
        booksModel.writeBooks(books);
        return responseFormatter.formatResponse("Libro agregado correctamente.");
    },

    // Funcion para buscar libro por titulo
    findBookTitle: (nombreLibroBuscado) => {
        const books = booksModel.readBooks();
        const libro = books.find(book => book.TITULO === nombreLibroBuscado);
        return responseFormatter.formatResponse(libro);
    },

    // Funcion para buscar libros por genero
    findBookGenre: (genero) => {
        const books = booksModel.readBooks();
        const libros = books.filter(book => book.GENERO === genero);
        return responseFormatter.formatResponse(libros);
    }
};

module.exports = booksController;