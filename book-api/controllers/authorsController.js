//Importo el modelo, en donde estarian las funciones para leer y escribir en un archivo JSON
const authorsModel = require('../models/authorsModel');
const responseFormatter = require('../views/responseFormatter'); //Este es para formatear las respuestas del cliente

const authorsController = {
    //Funcion para listar a todos los autores
    getAuthors: () => { 
        const authors = authorsModel.readAuthors();
        return responseFormatter.formatResponse(authors);
    },

    //Funcion para agregar un nuevo autor a la base de datos.
    addAuthors: (newAuthor) => {
        const authors = authorsModel.readAuthors();
        authors.push(newAuthor);
        authorsModel.writeAuthors(authors);
        return responseFormatter.formatResponse("Autor agregado correctamente."); 
    },

    // Funcion para buscar autores por su nacionalidad
    findAuthors: (nacionalidad) => {
        const authors = authorsModel.readAuthors();
        let nacionalidadAuthors = authors.filter(author => author.NACIONALIDAD === nacionalidad);
        return responseFormatter.formatResponse(nacionalidadAuthors);
    }
};

module.exports = authorsController;