// Importamos modulos necesarios para crear al cliente, la interfaz de comandos y poder recibir y enviar datos. Modulo 'chalk' para agregar color en la consola.
const net = require('net'); 
const readline = require('readline');
const readlineSync = require('readline-sync');
const chalk = require('chalk');

// Creamos la intefaz de comandos
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Crear una instancia del cliente TCP
const client = new net.Socket();

// Conectar al servidor en el puerto 8080
client.connect(8080, 'localhost', () => {
    console.log("\nConectado al servidor.");
    console.log(chalk.white.bgMagenta("\n       ¡Bienvenido a la API de libros!        \n"));
    opciones();
});

// Manejo de datos recibidos del servidor
client.on('data', (data) => {
    console.log(data.toString());
    sendLine();
});

// Manejo de errores
client.on('error', (err) => {
    console.log(errorColor("\nError al conectar al servidor: "), err.message);
    rl.close();
});

// Manejo del cierre de la conexión
client.on('close', () => {
    console.log("\nConexión cerrada con el servidor.");
});

// Funcion opciones, que va a mostrar el menu de todas las opciones disponibles
function opciones() {
    rl.question(boldWhite("\nElije el criterio que desea usar para realizar las operaciones:\n") + 'BOOKS - AUTHORS - PUBLISHERS - ESTADISTICAS: \n', (criterio) => {

        // Funciones de BOOKS
        if (criterio.toUpperCase() === 'BOOKS') {
            rl.question(boldWhite('\nEscribe un comando: ') + '\n' + '- GET BOOKS'+ '\n' + '- FIND BOOK BY TITLE (ej: Find Book By Title Mujercitas)' + '\n' + '- GET BOOKS BY GENRE (ej: Get Books By Genre Ficcion)' + '\n' + '- ADD BOOK (ej: Add Book {"titulo":"Jumanji", "autor":"Philip K. Dick", "genero":"Ficción", "editorial":"Penguin", "anioPublicacion":1999}): \n', (command)=>{
                client.write(command.toUpperCase());
        });

        } else if (criterio.toUpperCase() === 'AUTHORS') {
            rl.question(boldWhite('\nEscribe un comando: ') + '\n' + '- GET AUTHORS' + '\n' + '- FIND AUTHORS NACIONALIDAD (ej: Find Authors Argentina)' + '\n' + '- ADD AUTHOR (ej: Add author {"nombre":"George R. R. Martin", "edad":64, "nacionalidad": "Estados Unidos"}): \n', (command) => {
                client.write(command.toUpperCase());
            });
        } else if (criterio.toUpperCase() === 'PUBLISHERS') {
            rl.question(boldWhite('\nEscribe un comando: ') + '\n' + '- GET PUBLISHERS' + '\n' + '- ADD PUBLISHER (ej: Add publisher {"nombre":"Penguin", "pais":"Estados Unidos", "librosPublicados":100}): \n', (command) => {
                client.write(command.toUpperCase());
            });
        } else if (criterio.toUpperCase() === 'ESTADISTICAS') {
            client.write(criterio.toUpperCase());
        } else {
            console.log(errorColor("\nOpcion incorrecta. Asegurate de haber escrito correctamente el comando."));
            opciones();
        };
    });
};

// Funcion sendLine, para que el cliente decida si quiere seguir operando dentro del programa o si desea darlo por finalizado. 
function sendLine(){
    rl.question(boldWhite("\nQuiere realizar alguna otra operacion? (SI - NO):\n"), (line) =>{
        if(line.toUpperCase() === "NO"){
            console.log("\nSaliendo de la aplicacion.");
            rl.close();
            client.destroy();
        }else if(line.toUpperCase() === "SI"){
            opciones();
        }
    }); 
};

//Seccion variables chalk
const boldWhite = chalk.bold.white;
const errorColor = chalk.bold.redBright;