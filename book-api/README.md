# BOOK-API 
Con nuestro equipo desarrollamos una API para gestion de una biblioteca de libros que permite realizar diferentes operaciones.

Creemos que es una herramienta muy util para clientes que desean conocer la biblioteca de una manera sencilla y desde cualquier lugar del mundo.
Con la aplicacion podemos realizar operaciones como conocer los libros que tiene la biblioteca, agregar nuevos libros, buscar libros por su titulo, realizar operaciones como conocer los autores y editoriales que incluyen los libros de la biblioteca o conocer las estadisticas de la misma.

## Tecnologias usadas
- Node.js
- Javascript
- JSON  

## Patron de diseño utilizado
- MVC (Model, View, Controller).

## Requerimientos        
- Node.js
Para poder ejecutar la aplicacion debemos tener instalado Node.js en nuestro equipo.

## Modulos
Los siguientes modulos listados a continuacion son indispensables para el funcionamiento de la aplicacion. Deben ser instalados antes de ejecutarla en la terminal. 
- readline-sync (comando en terminal: `npm install readline-sync`)
- uuid (comando en terminal: `npm install uuid`)
- chalk version utilizada 4.1.2 (comando en terminal: `npm install chalk@4.1.2`)


## Inicio de la aplicacion
Para iniciar la aplicacion, debemos seguir los siguientes pasos:

1. Una vez abierto el VSCode, arrastrar la carpeta de la BOOK-API dentro. Recomendamos abrir 2 terminales, una para ejecutar el servidor y otra para ejecutar el cliente.

2. En una de las terminales abiertas escribimos el siguiente comando para ejecutar el servidor y dar inicio a la aplicacion: `node server.js`

3. Una vez ejecutado el servidor, abrimos otra terminal y escribimos el siguiente comando para ejecutar el cliente: `node client.js`

- Es importante aclarar que nuestra aplicacion permite recibir conexiones de varios clientes a un mismo servidor. El puerto al que debera conectarse cada cliente es el 8080.

4. Primero el servidor nos pedira que seleccionemos el criterio que queremos utilizar para la ejecucion de la aplicacion (BOOKS - AUTHORS - PUBLISHERS - ESTADISTICAS), despues nos pedira que ingresemos el comando que queremos ejecutar.

- FORMATO DE COMANDOS:
Es muy importante procurar escribir los comandos con el formato solicitado para el buen funcionamiento de la aplicacion. En caso de no cumplir con los requisitos de los comandos solicitados, la aplicacion nos dara un mensaje de error que nos indicara el problema y la aplicacion se cerrara y deberas volver a ingresar los comandos de inicio de la aplicacion.

5. Luego de recibir la informacion solicitada, tendremos la posibilidad de realizar una nueva operacion o salir de la aplicacion. En caso de desear realizar otra operacion, podremos visualizar las opciones nuevamente.

## COMANDO BOOKS
Dentro de este comando contamos con cuatro comandos extra que corresponden a funcionalidades diferentes. 
Lista de comandos a continuacion:

### GET BOOKS
Va a mostrar en terminal la lista entera de libros disponibles en la biblioteca, con su respectiva informacion. 

El comando a ingresar es `get books`.

### FIND BOOK BY TITLE
Permite la busqueda de un libro en especifico a traves de su titulo. Para ejecutar esta funcion se debe ingresar el comando seguido del titulo del libro a buscar.

Va a mostrar en consola toda la informacion disponible sobre el libro buscado. En caso de que el libro no se encuntre disponible en la base de datos, se dara aviso que el libro no se encuentra. 

La sintaxis del comando es: `find book by title` + titulo del libro a buscar. 

Ejemplo de comando: `find book by title mujercitas`. 

### GET BOOKS BY GENRE
Permite la búsqueda de libros tomando como parametro el genero. Para ejecutar esta funcion se debe ingresar el comando seguido del genero que desea tomar como parametro.

Esta funcion va a mostrar en consola una lista de libros que 
coincidan con el genero ingresado como parametro. 

La sintaxis del comando a ingresar es: `get books by genre` + genero a buscar.

Ejemplo de comando: `get books by genre ficcion`.

### ADD BOOK 
Permite al usuario agregar un nuevo libro a la biblioteca. Es muy importante para esta funcion tener en cuenta que los nuevos libros se registraran en el sistema sólo si el usuario respeta la sintaxis con el formato de carga de informacion detallado a continuación:
`add book` + `{` + `"titulo":` + `"`titulo del libro`"` + `,` + `"autor":` + `"`autor del libro`"` + `,` + `"genero":` + `"`genero del libro`"` + `,` + `"editorial":` + `"`editorial del libro`"` + `,` + `"anioPublicacion":` + año + `}`

Ejemplo de comando:
`add book {"titulo":"Jumanji", "autor":"Philip K. Dick", "genero":"Ficción", "editorial":"Penguin", "anioPublicacion":1999}`. 

Requerimientos obligatorios que toda la informacion del libro debe cumplir:
1. Todo el libro debe ir entre llaves: `{}`.
2. Cada par clave-valor debe ir entre comillas `" "` y separados entre si por dos puntos `:`. No tiene que haber espacio entre medio. 
3. Asimismo, cada par debe estar separado del siguiente por una coma `,`.
4. El libro ingresado debe contar con los campos completos de titulo, autor, genero, editorial y anioPublicacion.
5. El año de publicacion no debe ir entre comillas. 

Si alguno de estos parametros no es respetado, saldrá un mensaje de error. 


## COMANDO AUTHORS
Dentro de este comando contamos con tres comandos extra que corresponden a funcionalidades diferentes. 

### GET AUTHORS
Va a mostrar en terminal la lista entera de autores ingresados en la base de datos de la biblioteca, con su respectiva informacion. 

El comando a ingresar es `get authors`.

### FIND AUTHORS NACIONALIDAD
Muestra en terminal una lista de los autores que correspondan a la nacionalidad ingresada. Si no se encuntran autores que coincidan con el parametro de busqueda, será indicado en la terminal. 

La sintaxis del comando a ingresar es: `find authors` + nombre del pais.

Ejemplo de comando: `find authors argentina`.

### ADD AUTHOR
Esta funcionalidad es muy similar a ADD BOOKS. Permite al usuario agregar un nuevo autor a la base de datos, pero respetando ciertos parametros.

La sintaxis del comando es la siguiente:
`add author` + `{` + `"nombre":` + `"`nombre del autor`"` + `"edad":` + edad del autor + `"nacionalidad":` + `"`nacionalidad del autor`"`.

Ejemplo de comando: `Add author {"nombre":"George R. R. Martin", "edad":64, "nacionalidad":"Estados Unidos"}`

Requerimientos obligatorios que toda la informacion sobre el autor debe cumplir:
1. Debe ir entre llaves: `{}`.
2. Cada par clave-valor debe ir entre comillas `" "` y separados entre si por dos puntos `:`. No tiene que haber espacio intermedio.
3. Asimismo, cada par debe estar separado del siguiente por una coma `,`.
4. El autor ingresado debe contar con los campos completos de nombre, edad y nacionalidad.
5. La edad del autor no debe ir entre comillas. 

Si alguno de estos parametros no es respetado, saldrá un mensaje de error. 

## COMANDO PUBLISHERS
Dentro de este comando contamos con dos comandos extra que corresponden a funcionalidades diferentes. 

### GET PUBLISHERS
Va a mostrar en terminal la lista entera de editoriales ingresadas en la base de datos de la biblioteca, con su respectiva informacion. 

El comando a ingresar es `get publishers`.

### ADD PUBLISHER
Esta funcionalidad es muy similar a ADD BOOK y ADD AUTHOR. Permite al usuario agregar una nueva editorial a la base de datos, pero respetando ciertos parametros.

La sintaxis del comando es la siguiente:
`add publisher` + `{` + `"nombre":` + `"`nombre de la editorial`"` + `"pais":` + `"`pais de origen`"` + `"librosPublicados":` + cantidad de libros publicados.

Ejemplo de comando: `Add publisher {"nombre":"Penguin", "pais":"Estados Unidos", "LibrosPublicados":100}`

Requerimientos obligatorios que toda la informacion sobre la editorial debe cumplir:
1. Debe ir entre llaves: `{}`.
2. Cada par clave-valor debe ir entre comillas `" "` y separados entre si por dos puntos `:`. No tiene que haber espacio intermedio.
3. Asimismo, cada par debe estar separado del siguiente por una coma `,`.
4. La editorial ingresada debe contar con los campos completos de nombre, pais y librosPublicados.
5. La cantidad de libros no debe ir entre comillas. 

Si alguno de estos parametros no es respetado, saldrá un mensaje de error. 

## COMANDO ESTADISTICAS
Con este comando se mostraran en consola la cantidad de libros que se encuentran almacenados en la biblioteca. Tambien se mostrara una clasificacion de la cantidad de libros que hay disponibles de cada genero. 

Este comando no cuenta con funcionalidades extra, ya que es solo de informacion. 

## Extra
### Comentario de las desarrolladoras
Al principio de este proyecto creiamos imposible poder desarrollar la aplicacion porque estabamos un poco inseguras, pero una vez comenzamos a trabajar en ella, pudimos entender lo que siempre nos dicen: "La practica lo es todo en la programacion". A medida que ibamos avanzando sentimos mas seguridad de lo que estabamos haciendo y comenzamos a entender y relacionar mejor los distintos modulos de nuestra aplicacion.