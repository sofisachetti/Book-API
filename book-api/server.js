// Importamos modulo 'NET' para crear un servidor, 'uuid' para generar un id para cada nuevo libro, publisher y autor, y 'chalk' para generar colores.
const net = require('net'); 
const { v4: uuidv4 } = require('uuid');
const chalk = require('chalk'); 

// Importamos los modulos de controladores
const booksController = require('./controllers/booksController');
const authorsController = require('./controllers/authorsController');
const publishersController = require('./controllers/publishersController');
const estadisticasController = require('./controllers/estadisticasController');

// Creamos un nuevo servidor
const server = net.createServer((socket) => {
    // Mostramos en consola del sevidor el nuevo cliente con sus datos de conexion
    console.log("Nuevo cliente conectado al servidor: " + socket.remoteAddress + " : " + socket.remotePort + "\n");
    
    // Manejamos el evento data con la informacion que vamos a recibir del cliente (comandos)
    socket.on('data', (data) => {
        const command = data.toString().trim();

        // LOGICA PARA EL CRITERIO DE LIBROS

        // Funcion GET BOOKS
        if (command == "GET BOOKS") {  
            const response = booksController.getBooks(); 
            socket.write(answerYes("\nLista de libros de la biblioteca: \n") + boldWhite(response));
            console.log(boldWhite('\nSe envio lista de libros al cliente.'));
        
        // Funcion ADD BOOKS
        } else if (command.startsWith('ADD BOOK')) {
            const bookDataString = command.replace('ADD BOOK ', ''); 

            // Realizamos las validaciones necesarias para que el comando ingrese con el formato correcto
            if (bookDataString.startsWith('{"') && bookDataString.endsWith('}')) {

                const bookData = JSON.parse(bookDataString);
                if (bookData && typeof bookData === 'object') {
                    //Si alguna de las propiedades que tiene el objeto no está, arrojamos el error correspondiente

                    if (!bookData.TITULO || !bookData.AUTOR || !bookData.GENERO || !bookData.EDITORIAL || !bookData.ANIOPUBLICACION) { 
                        socket.write(errorColor('ERROR: No colocaste todos los datos requeridos.'));

                    } else {
                        // En este bloque se maneja la logica para agregar el nuevo libro.
                        const newBook = {ID: uuidv4(), ...bookData};  
                        const response = booksController.addBooks(newBook);
                        console.log(boldWhite("El cliente agrego un nuevo libro a la biblioteca con exito."));
                        socket.write(answerYes(response));
                    }

                } else { 
                    socket.write(errorColor('Los datos ingresados no son validos o el formato de los datos ingresados es incorrecto.')); 
                }

            } else {
                socket.write(errorColor("ERROR: Formato de comando incompleto (recorda poner las llaves y las comillas donde se indica."));
            }

        // Funcion FIND BOOK TITLE
        } else if (command.startsWith('FIND BOOK BY TITLE')) {
            const libroToString = command.replace('FIND BOOK BY TITLE ','');
            const response = booksController.findBookTitle(libroToString);
            
            // Si no se encuentra el libro, arrojamos un mensaje de error.
            if (response === undefined) {
                console.log(boldWhite('No se encontro el libro solicitado.'));
                socket.write(answerYes('No hemos podido encontrar el libro.'));
            } else { // Si se encontró, le mostramos el libro al cliente. Tambien mostramos mensaje en la terminal del server para saber qué funcion se realizó.
            console.log(boldWhite('Se ha encontrado el libro solicitado.'));
            socket.write(answerYes("\nEl libro buscado y encontrado es: ") + boldWhite(response) + "\n");
            }

        // Funcion FIND BOOKS BY GENRE
        } else if (command.startsWith('GET BOOKS BY GENRE')) {
            const libroToString = command.replace('GET BOOKS BY GENRE ', '');
            const response = booksController.findBookGenre(libroToString);

            // Si no se encontro el genero, mandamos un mensaje de error
            if (response === "[]") {
                console.log(boldWhite("No se encontraron libros del genero solicitado."));
                socket.write(errorColor("\nNo se encontraron libros del genero solicitado."));
            } else {
                //Si se encontro, mostramos la lista al cliente
                console.log(boldWhite("\nSe enviaron los libros del genero solicitado."))
                socket.write(answerYes("\nLos libros del genero buscado son: " + boldWhite(response)))
            }

        // Funcion GET AUTHORS
        } else if (command == 'GET AUTHORS') {
            const response = authorsController.getAuthors();
            socket.write(answerYes("\nLista completa de autores: \n") + boldWhite(response));
            console.log(boldWhite("\nSe envio lista de autores al cliente"));
            
        // Funcion ADD AUTHOR
        } else if (command.startsWith('ADD AUTHOR')) { 
            const authorDataString = command.replace('ADD AUTHOR ', '');
            // Validaciones similares a la funcion ADD BOOK
            if (authorDataString.startsWith('{') && authorDataString.endsWith('}')) {
                const authorData = JSON.parse(authorDataString);

                if (authorData && typeof authorData === 'object') {
                    
                    if (!authorData.NOMBRE || !authorData.EDAD || !authorData.NACIONALIDAD) {
                        socket.write(errorColor('ERROR: No colocaste todos los datos requeridos.'));
                    } else {
                        const newAuthor = {ID: uuidv4(), ...authorData};
                        const response = authorsController.addAuthors(newAuthor);
                        console.log(boldWhite("\nEl cliente agrego un nuevo autor a la biblioteca con exito."));
                        socket.write(answerYes(response));
                    }

                } else {
                    socket.write(errorColor('Los datos ingresados no son validos o el formato de los datos ingresados es incorrecto.'));
                }

            } else {
                socket.write(errorColor('ERROR: Formato de comando incompleto (recorda poner las llaves y las comillas donde se indica.'));
            }

        //Funcion FIND AUTHORS
        } else if (command.startsWith('FIND AUTHORS')) {
            const authorDataString = command.replace('FIND AUTHORS ', '');
            const response = authorsController.findAuthors(authorDataString);
            if (response === '[]') {
                console.log(boldWhite("No se encontraron autores por la nacionalidad solicitada."));
                socket.write(errorColor("\nNo se encontraron autores por la nacionalidad solicitada."));
            } else {
                console.log(boldWhite("\nSe enviaron los autores de la nacionalidad solicitados."));
                socket.write(answerYes("\nLos autores de la nacionalidad buscada son: " + boldWhite(response)));
            }

        // Funcion GET PUBLISHERS
        } else if (command == 'GET PUBLISHERS') { 
            const response = publishersController.getPublishers();
            socket.write(answerYes("\nLista completa de editoriales en la biblioteca: \n") + boldWhite(response));
            console.log(boldWhite("Se envio la lista completa de editoriales al cliente."));

        // Funcion ADD PUBLISHER
        } else if (command.startsWith('ADD PUBLISHER')) {
            const publisherDataString = command.replace('ADD PUBLISHER ', '');
            // Misma logica que ADD BOOKS y ADD AUTHOR
            if (publisherDataString.startsWith('{"') && publisherDataString.endsWith('}')) {
                const publisherData = JSON.parse(publisherDataString);

                if (publisherData && typeof publisherData === 'object') {
                    
                    if (!publisherData.NOMBRE || !publisherData.PAIS || !publisherData.LIBROSPUBLICADOS) {
                        socket.write(errorColor('ERROR: No colocaste todos los datos requeridos.'));
                    } else {
                        const newPublisher = {ID: uuidv4(), ...publisherData};
                        const response = publishersController.addPublishers(newPublisher);
                        console.log(boldWhite("El cliente agrego una nueva editorial a la biblioteca con exito."));
                        socket.write(answerYes(response));
                    }

                } else {
                    socket.write(errorColor('Los datos ingresados no son validos o el formato de los datos ingresados es incorrecto.'));
                }

            } else {
                socket.write(errorColor('ERROR: Formato de comando incompleto (recorda poner las llaves y las comillas donde se indica).'));
            }

        // Funcion ESTADISTICAS
        } else if (command === 'ESTADISTICAS') {
            const response = estadisticasController.getBooksNumber();
            const response2 = estadisticasController.getBooksByGenre();
            socket.write(answerYes("\n- Actualmente contamos con ") + boldWhite(response) + answerYes(" libros en la biblioteca.\n") + answerYes("\n- La cantidad de libros de acuerdo a su genero que contiene la libreria son: \n") + boldWhite(response2));
            console.log(boldWhite("\nSe le enviaron las estadisticas solicitadas al cliente."));

        // Manejo de error si el comando no corresponde
        } else {
            socket.write(fullErrorColor('ERROR: Comando no reconocido. Verifica si escribiste el comando correcto y completo.'));
        };
    });

    // Manejo del evento end
    socket.on('close', () => {
        console.log("\nCliente desconectado del servidor.");
        socket.end();
    });

    // Manejo del evento error
    socket.on('error', (err) => {
        console.log('\nEl cliente cerro la conexion con el servidor: ');
        console.log(errorColor(err.message));
        socket.end();
    });
});

server.on('error', (err) => {
    console.log('\nError en el servidor: ' + errorColor(err.message))
});

// Puerto en el que escucha el servidor.
server.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080");
});

//Seccion variables chalk
const boldWhite = chalk.bold.white;
const errorColor = chalk.bold.redBright;
const fullErrorColor = chalk.black.bgRed.bold;
const answerYes = chalk.bold.greenBright;