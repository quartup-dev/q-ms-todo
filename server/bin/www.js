import app from '../app';

const port = normalizePort(process.env.APP_PORT || '4999');
app.set('port', port);

var debug = require('debug')('https')

// Crear un mensaje de depuración

const fs = require('fs');
const https = require('https');
// debug('Iniciando aplicación...');

// Hacer algo en la aplicación
const resultado = 5 + 3;

// Imprimir el resultado
// debug('El resultado es: ' + resultado);
// const port = 4999
// console.log(process.env.APP_PRIVKEY)
let oo = {
    key: fs.readFileSync(process.env.APP_PRIVKEY),
    cert: fs.readFileSync(process.env.APP_FULLCHAIN),
    requestCert: false,
    rejectUnauthorized: false
}

const server = https.createServer(oo, app);


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('corriendo en puerto: ' + port)

// app.listen(4999);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
