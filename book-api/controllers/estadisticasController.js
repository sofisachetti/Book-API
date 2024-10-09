const booksModel = require('../models/booksModel');
const responseFormatter = require('../views/responseFormatter');

// Controller de ESTADISTICAS
const estadisticasController = {

    // Funcion para tener la cantidad de libros que hay en la biblioteca
    getBooksNumber: () => {
        const libros = booksModel.readBooks();
        const librosLength = libros.length;
        return responseFormatter.formatResponse(librosLength);
    },

    // Funcion para obtener la clasificacion de libros por genero
    getBooksByGenre: () => {
        const libros = booksModel.readBooks();
        let generoFiccion = libros.filter(book => book.GENERO === 'FICCION');
        let generoRomance = libros.filter(book => book.GENERO === 'ROMANCE');
        let generoAventura = libros.filter(book => book.GENERO === 'AVENTURA');
        let generoCienciaFiccion = libros.filter(book => book.GENERO === 'CIENCIA FICCION');
        let generoInfantil = libros.filter(book => book.GENERO === 'INFANTIL');
        let generoDrama = libros.filter(book => book.GENERO === 'DRAMA');
        let generoTerror = libros.filter(book => book.GENERO === 'TERROR');
        let generoFantasia = libros.filter(book => book.GENERO === 'FANTASIA');
        let generoHistoria = libros.filter(book => book.GENERO === 'HISTORIA');
        return responseFormatter.formatResponse({
            'Genero Ficcion': generoFiccion.length,
            'Genero Romance': generoRomance.length,
            'Genero Aventura' : generoAventura.length,
            'Genero Ciencia Ficcion' : generoCienciaFiccion.length,
            'Genero Infantil' :generoInfantil.length,
            'Genero Drama' : generoDrama.length,
            'Genero Terror' : generoTerror.length,
            'Genero Fantasia' : generoFantasia.length,
            'Genero Historia' : generoHistoria.length,
        });
    }
};

module.exports = estadisticasController;