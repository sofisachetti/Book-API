//Importo el modelo, en donde estarian las funciones para leer y escribir en un archivo JSON
const publishersModel = require('../models/publishersModel');
const responseFormatter = require('../views/responseFormatter'); //Este es para formatear las respuestas del cliente


const publishersController = {

    //Funcion para obtener todas las editoriales
    getPublishers: () => {
        const publishers = publishersModel.readPublishers();
        return responseFormatter.formatResponse(publishers);
    },

    //Funcion para agregar una nueva editorial
    addPublishers: (newPublisher) => {
        const publishers = publishersModel.readPublishers();
        publishers.push(newPublisher);
        publishersModel.writePublishers(publishers);
        return responseFormatter.formatResponse('Editorial agregada con exito.')
    }
};

module.exports = publishersController; 