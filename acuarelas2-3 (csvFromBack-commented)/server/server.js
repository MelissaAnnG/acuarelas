const express = require('express'); //importa el módulo express, que es un framework para construir aplicaciones web y APIs en Node.js
const fs = require('fs'); //importa el módulo fs (file system) de Node.js, que permite trabajar con el sistema de archivos, como leer y escribir archivos
const path = require('path'); //importa el módulo path de Node.js, que proporciona utilidades para trabajar con rutas de archivos y directorios
const Papa = require('papaparse'); //importa el módulo papaparse, que es una biblioteca para analizar (parsear) archivos CSV en JavaScript

const app = express(); //crea una instancia de una aplicación Express
const port = 3000; //define el puerto en el que el servidor escuchará las peticiones, en este caso, el puerto 3000

app.use(express.static('public')); //sirve archivos estáticos (como HTML, CSS, JS) desde el directorio public

app.get('/api/inventory', (req, res) => { //define una ruta GET /api/inventory. Cuando se accede a esta ruta, se ejecuta la función de callback proporcionada
    const csvFilePath = path.join(__dirname, 'inventory.csv'); //define la ruta completa al archivo inventory.csv usando __dirname (que se refiere al directorio actual del módulo) y path.join para asegurar que la ruta sea correcta independientemente del sistema operativo
    fs.readFile(csvFilePath, 'utf8', (err, data) => { //lee el archivo inventory.csv en formato UTF-8. La función de callback maneja el error (err) o el contenido del archivo (data)
        if (err) {
            return res.status(500).send('Error leyendo csv'); //si hay un error al leer el archivo, responde con un estado 500 (error interno del servidor) y un mensaje de error
        }
        const results = Papa.parse(data, { header: true }); //analiza (parsea) el contenido del archivo CSV con papaparse, interpretando la primera línea como los encabezados de las columnas
        const processedData = results.data.map(item => { //mapea cada fila de datos del CSV para procesarlos. La función map aplica una función a cada elemento del array results.data
            const keys = Object.keys(item); //obtiene las claves (nombres de las columnas) del objeto item y selecciona la cuarta columna (índice 3)
            const fourthColumnKey = keys[3]; //obtiene nombre de la cuarta columna 
            const fourthColumnValue = parseFloat(item[fourthColumnKey]); //convierte el valor de la cuarta columna a un número de punto flotante
            if (!isNaN(fourthColumnValue)) { //si el valor de la cuarta columna es un número válido, calcula el precio de venta con un incremento del 20% y lo agrega como una nueva propiedad Precio Venta (20%) en el objeto item. Si no es un número válido, establece el valor de Precio Venta (20%) como "N/A"
                item["Precio Venta (20%)"] = (fourthColumnValue * 1.20).toFixed(2);
            } else {
                item["Precio Venta (20%)"] = "N/A";
            }
            return item; //retorna el objeto item procesado
        });
        res.json(processedData); //responde con los datos procesados en formato JSON
    })
});

app.listen(port, () => {
    console.log(`Servidor funcionando en http://localhost:${port}`); //inicia el servidor y lo pone a escuchar en el puerto definido (port). Cuando el servidor está listo, imprime un mensaje en la consola indicando que está funcionando y en qué URL se puede acceder (http://localhost:3000)
});